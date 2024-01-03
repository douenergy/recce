import React, { useCallback } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { LineageGraphNode, NodeData } from "./lineage";
import { ValueDiffSummary } from "@/components/check/ValueDiffView";
import { useLocation } from "wouter";
import { createCheckByRun } from "@/lib/api/checks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileDiffResult, submitProfileDiff } from "@/lib/api/profile";
import { ProfileDiffDataGrid } from "./ProfileDiffGrid";
import { cacheKeys } from "@/lib/api/cacheKeys";

interface ProfileDiffProp {
  node: LineageGraphNode;
}

export const ProfileDiffModal = ({ node }: ProfileDiffProp) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setLocation] = useLocation();

  const {
    data: profileResult,
    mutate: runProfile,
    error: error,
    isPending,
  } = useMutation({
    mutationFn: submitProfileDiff,
  });

  const addToChecklist = useCallback(async () => {
    if (!profileResult?.run_id) {
      return;
    }

    const check = await createCheckByRun(profileResult.run_id);
    queryClient.invalidateQueries({ queryKey: cacheKeys.checks() });
    setLocation(`/checks/${check.check_id}`);
  }, [profileResult?.run_id, setLocation, queryClient]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent overflowY="auto" height="75%">
          <ModalHeader>Model Profile Diff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileDiffDataGrid
              isFetching={isPending}
              result={profileResult?.result as ProfileDiffResult}
              error={error}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="blue" onClick={addToChecklist}>
              Add to check
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={() => {
          onOpen();
          runProfile({ model: node.name });
        }}
      >
        Profile Diff
      </Button>
    </>
  );
};
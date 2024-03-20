import { PUBLIC_API_URL } from "../../lib/const";
import {
  LineageGraphNode,
  cleanUpNodes,
  highlightNodes,
  layout,
  selectDownstream,
  selectNode,
  selectNodes,
  selectSingleNode,
  selectUpstream,
  toReactflow,
} from "./lineage";
import {
  Box,
  Flex,
  Icon,
  Text,
  Spinner,
  HStack,
  Button,
  VStack,
  Menu,
  MenuList,
  MenuItem,
  Center,
  SlideFade,
} from "@chakra-ui/react";
import React, { useCallback, useLayoutEffect, useState } from "react";
import ReactFlow, {
  Node,
  useEdgesState,
  useNodesState,
  Controls,
  MiniMap,
  Panel,
  Background,
  ReactFlowProvider,
  ControlButton,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { GraphNode } from "./GraphNode";
import GraphEdge from "./GraphEdge";
import { getIconForChangeStatus } from "./styles";
import { FiCopy } from "react-icons/fi";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import { NodeView } from "./NodeView";

import { useLineageGraphContext } from "@/lib/hooks/LineageGraphContext";

import { AddLineageDiffCheckButton, NodeSelector } from "./NodeSelector";
import { NodeFilter } from "./NodeFilter";
import {
  IGNORE_SCREENSHOT_CLASS,
  copyBlobToClipboard,
  useImageBoardModal,
  useToBlob,
} from "@/lib/hooks/ScreenShot";
import { useClipBoardToast } from "@/lib/hooks/useClipBoardToast";
import { NodeRunView } from "./NodeRunView";

import { union } from "./graph";
import { LineageDiffViewOptions } from "@/lib/api/lineagecheck";
import { ChangeStatusLegend } from "./ChangeStatusLegend";

export interface LineageViewProps {
  viewOptions?: LineageDiffViewOptions;
  interactive?: boolean;
  weight?: number;
  height?: number;

  // to be removed
  viewMode?: "changed_models" | "all";
  filterNodes?: (key: string, node: LineageGraphNode) => boolean;
}

const nodeTypes = {
  customNode: GraphNode,
};
const edgeTypes = {
  customEdge: GraphEdge,
};
const nodeColor = (node: Node) => {
  return node?.data?.changeStatus
    ? getIconForChangeStatus(node?.data?.changeStatus).color
    : ("lightgray" as string);
};

const viewModeTitle = {
  all: "All",
  changed_models: "Changed Models",
};

function _LineageView({ ...props }: LineageViewProps) {
  const reactFlow = useReactFlow();
  const { successToast, failToast } = useClipBoardToast();
  const {
    onOpen: onImgBoardModalOpen,
    setImgBlob,
    ImageBoardModal,
  } = useImageBoardModal();
  const { toImage, ref } = useToBlob({
    imageType: "png",
    shadowEffect: true,
    backgroundColor: "white",
    ignoreElements: (element: Element) => {
      const className = element.className;
      if (
        typeof className === "string" &&
        className.includes(IGNORE_SCREENSHOT_CLASS)
      ) {
        return true;
      }
      return false;
    },
    onSuccess: async (blob) => {
      try {
        await copyBlobToClipboard(blob);
        successToast("Copied the Lineage View as an image to clipboard");
      } catch (error) {
        if ((error as Error).message === "ClipboardItem is not defined") {
          setImgBlob(blob);
          onImgBoardModalOpen();
        } else {
          failToast("Failed to copy image to clipboard", error);
        }
      }
    },
    onError: (error) => {
      console.error("Error taking screenshot", error);
      failToast("Failed to copy image to clipboard", error);
    },
  });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [viewOptions, setViewOptions] = useState<LineageDiffViewOptions>(
    props.viewOptions || {}
  );

  const { lineageGraph, isLoading, error, refetchRunsAggregated } =
    useLineageGraphContext();

  /**
   * View mode
   * - all: show all nodes
   * - changed_models: show only changed models
   */
  const viewMode: "all" | "changed_models" =
    viewOptions.view_mode || props.viewMode || "changed_models";

  /**
   * Select mode: the behavior of clicking on nodes
   * - detail: show node detail view
   * - action: select nodes for action
   * - action_result: show node action result view
   */
  const [selectMode, setSelectMode] = useState<
    "detail" | "action" | "action_result"
  >("detail");

  /**
   * Which control the linage view should be in
   */
  const [controlMode, setControlMode] = useState<
    "normal" | "selector" | "filter"
  >("normal");

  const [detailViewSelected, setDetailViewSelected] =
    useState<LineageGraphNode>();
  const [isDetailViewShown, setIsDetailViewShown] = useState(false);

  const [isContextMenuRendered, setIsContextMenuRendered] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
    selectedNode?: Node;
  }>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!lineageGraph) {
      return;
    }

    const [nodes, edges] = toReactflow(lineageGraph, viewOptions);

    // const [nodes, edges] = applyFilter(lineageGraph, viewOptions);

    layout(nodes, edges);
    setNodes(nodes);
    setEdges(edges);
  }, [setNodes, setEdges, lineageGraph]);

  const onNodeMouseEnter = (event: React.MouseEvent, node: Node) => {
    if (!lineageGraph) {
      return;
    }

    const nodeSet = union(
      selectUpstream(lineageGraph, [node.id]),
      selectDownstream(lineageGraph, [node.id])
    );

    const [newNodes, newEdges] = highlightNodes(
      Array.from(nodeSet),
      nodes,
      edges
    );

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const onNodeMouseLeave = (event: React.MouseEvent, node: Node) => {
    if (!lineageGraph) {
      return;
    }

    const nodeSet = selectDownstream(lineageGraph, lineageGraph.modifiedSet);

    const [newNodes, newEdges] = highlightNodes(
      Array.from(nodeSet),
      nodes,
      edges
    );

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const centerNode = async (node: Node) => {
    if (node.width && node.height) {
      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = reactFlow.getZoom();

      reactFlow.setCenter(x, y, { zoom, duration: 200 });
    }
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    if (props.interactive === false) return;
    closeContextMenu();
    if (selectMode === "detail") {
      setDetailViewSelected(node.data);
      if (!isDetailViewShown) {
        setIsDetailViewShown(true);
        centerNode(node);
      }
      setNodes(selectSingleNode(node.id, nodes));
    } else if (selectMode === "action_result") {
      setDetailViewSelected(node.data);
      if (!isDetailViewShown) {
        setIsDetailViewShown(true);
        centerNode(node);
      }
      setNodes(selectSingleNode(node.id, nodes));
    } else {
      setNodes(selectNode(node.id, nodes));
    }
  };

  const handleActionNodeUpdated = useCallback(
    (node: LineageGraphNode) => {
      setNodes((prevNodes) => {
        const newNodes = prevNodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: node,
            };
          } else {
            return n;
          }
        });
        return newNodes;
      });
    },
    [setNodes]
  );

  const handleViewOptionsChanged = (newViewOptions: LineageDiffViewOptions) => {
    if (!lineageGraph) {
      return;
    }

    const [newNodes, newEdges] = toReactflow(lineageGraph, newViewOptions);
    layout(newNodes, newEdges);
    setNodes(newNodes);
    setEdges(newEdges);
    setViewOptions(newViewOptions);
  };

  if (isLoading) {
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  const selectParentNodes = () => {
    const selectedNode = contextMenuPosition.selectedNode;
    if (
      selectMode !== "action" ||
      selectedNode === undefined ||
      lineageGraph === undefined
    )
      return;

    const selectedNodeId = selectedNode.id;
    const upstream = selectUpstream(lineageGraph, [selectedNodeId]);
    const newNodes = selectNodes([...upstream], nodes);
    setNodes(newNodes);
  };

  const selectChildNodes = () => {
    const selectedNode = contextMenuPosition.selectedNode;
    if (
      selectMode !== "action" ||
      selectedNode === undefined ||
      lineageGraph === undefined
    )
      return;

    const selectedNodeId = selectedNode.id;
    const downstream = selectDownstream(lineageGraph, [selectedNodeId]);
    const newNodes = selectNodes([...downstream], nodes);
    setNodes(newNodes);
  };

  const closeContextMenu = () => {
    setIsContextMenuRendered(false);
    setContextMenuPosition({ x: 0, y: 0 });
  };

  const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
    if (selectMode !== "action") {
      return;
    }
    // Only show context menu when selectMode is action
    // Prevent native context menu from showing
    event.preventDefault();
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
      selectedNode: node,
    });
    setIsContextMenuRendered(true);
  };

  if (error) {
    return <>Fail to load lineage data: {error}</>;
  }

  if (viewMode === "changed_models" && !lineageGraph?.modifiedSet?.length) {
    return (
      <Center h="100%">
        <VStack>
          <>No change detected</>
          <Button
            colorScheme="blue"
            onClick={() => {
              setViewOptions({ ...viewOptions, view_mode: "all" });
            }}
          >
            Show all nodes
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Flex width="100%" height="100%">
      <Box flex="1 0 0px">
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeContextMenu={onNodeContextMenu}
          onClick={closeContextMenu}
          maxZoom={1}
          minZoom={0.1}
          fitView={true}
          nodesDraggable={props.interactive}
          ref={ref}
        >
          <Background color="#ccc" />
          <Controls
            showInteractive={false}
            position="top-right"
            className={IGNORE_SCREENSHOT_CLASS}
          >
            <ControlButton
              title="copy image"
              onClick={() => {
                toImage();
              }}
            >
              <Icon as={FiCopy} />
            </ControlButton>
          </Controls>
          <ImageBoardModal />
          <Panel position="bottom-left">
            <HStack>
              <ChangeStatusLegend />
              {props.interactive && (
                <Box
                  p={2}
                  flex="0 1 160px"
                  fontSize="14px"
                  className={IGNORE_SCREENSHOT_CLASS}
                >
                  <Text color="gray" mb="2px">
                    Actions
                  </Text>
                  <VStack spacing={1} align="baseline">
                    <Button
                      size="xs"
                      variant="outline"
                      backgroundColor="white"
                      isDisabled={controlMode !== "normal"}
                      onClick={() => {
                        const newMode =
                          selectMode === "detail" ? "action" : "detail";
                        setDetailViewSelected(undefined);
                        setIsDetailViewShown(false);
                        const newNodes = cleanUpNodes(
                          nodes,
                          newMode === "action"
                        );
                        setNodes(newNodes);
                        setSelectMode(newMode);
                        setControlMode("selector");
                      }}
                    >
                      Select models
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      backgroundColor="white"
                      isDisabled={controlMode !== "normal"}
                      onClick={() => {
                        setControlMode("filter");
                      }}
                    >
                      Filter nodes
                    </Button>

                    <AddLineageDiffCheckButton
                      isDisabled={controlMode !== "normal"}
                      viewMode={viewMode}
                      nodes={nodes.map((node) => node.data)}
                      onFinish={() => setSelectMode("detail")}
                    />
                  </VStack>
                </Box>
              )}
            </HStack>
          </Panel>
          <Panel position="top-left">
            <Text fontSize="xl" color="grey" opacity={0.5}>
              {nodes.length > 0 ? viewModeTitle[viewMode] : "No nodes"}
            </Text>
          </Panel>
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Panel position="bottom-center" className={IGNORE_SCREENSHOT_CLASS}>
            <SlideFade
              in={controlMode === "selector"}
              unmountOnExit
              style={{ zIndex: 10 }}
            >
              <NodeSelector
                viewMode={viewMode}
                nodes={nodes
                  .map((node) => node.data)
                  .filter((node) => node.isSelected)}
                onClose={() => {
                  setSelectMode("detail");
                  setControlMode("normal");
                  const newNodes = cleanUpNodes(nodes);
                  setDetailViewSelected(undefined);
                  setIsDetailViewShown(false);
                  setNodes(newNodes);
                  refetchRunsAggregated?.();
                }}
                onActionStarted={() => {
                  setSelectMode("action_result");
                }}
                onActionNodeUpdated={handleActionNodeUpdated}
                onActionCompleted={() => {}}
              />
            </SlideFade>
            <SlideFade
              in={controlMode === "filter"}
              unmountOnExit
              style={{ zIndex: 10 }}
            >
              <NodeFilter
                viewOptions={viewOptions}
                onViewOptionsChanged={handleViewOptionsChanged}
                onClose={(fitView: boolean) => {
                  setControlMode("normal");
                  if (fitView) {
                    reactFlow.fitView();
                  }
                }}
              />
            </SlideFade>
          </Panel>
        </ReactFlow>
      </Box>
      {selectMode === "detail" && detailViewSelected && (
        <Box flex="0 0 500px" borderLeft="solid 1px lightgray" height="100%">
          <NodeView
            node={detailViewSelected}
            onCloseNode={() => {
              setDetailViewSelected(undefined);
              setIsDetailViewShown(false);
              setNodes(cleanUpNodes(nodes));
            }}
          />
        </Box>
      )}
      {selectMode === "action_result" && detailViewSelected && (
        <Box flex="0 0 500px" borderLeft="solid 1px lightgray" height="100%">
          <NodeRunView
            node={detailViewSelected}
            onCloseNode={() => {
              setDetailViewSelected(undefined);
              setIsDetailViewShown(false);
            }}
          />
        </Box>
      )}
      {isContextMenuRendered && (
        // Only render context menu when select mode is action
        <Menu isOpen={true} onClose={closeContextMenu}>
          <MenuList
            style={{
              position: "absolute",
              left: `${contextMenuPosition.x}px`,
              top: `${contextMenuPosition.y}px`,
            }}
          >
            <MenuItem icon={<BiArrowFromBottom />} onClick={selectParentNodes}>
              Select parent nodes
            </MenuItem>
            <MenuItem icon={<BiArrowToBottom />} onClick={selectChildNodes}>
              Select child nodes
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}

export default function LineageView({ ...props }: LineageViewProps) {
  // Set default value for interactive
  if (props.interactive === undefined) {
    props.interactive = true;
  }
  if (props.viewMode === undefined) {
    props.viewMode = "changed_models";
  }
  return (
    <ReactFlowProvider>
      <_LineageView {...props} />
    </ReactFlowProvider>
  );
}

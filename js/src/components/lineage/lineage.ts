import { Node, Edge, Position } from "reactflow";
import { getNeighborSet, union } from "./graph";
import { Run } from "@/lib/api/types";
import dagre from "dagre";
import { LineageDiffViewOptions } from "@/lib/api/lineagecheck";
import {
  CatalogMetadata,
  LineageData,
  ManifestMetadata,
  NodeData,
} from "@/lib/api/lineage";
import { Manifest } from "next/dist/lib/metadata/types/manifest-types";

/**
 * THe types for internal data structures.
 */

export interface LineageGraphNode {
  id: string;
  name: string;
  from: "both" | "base" | "current";
  data: {
    base?: NodeData;
    current?: NodeData;
  };
  changeStatus?: "added" | "removed" | "modified";
  resourceType?: string;
  packageName?: string;
  parents: {
    [key: string]: LineageGraphEdge;
  };
  children: {
    [key: string]: LineageGraphEdge;
  };

  isSelected: boolean;
  isHighlighted?: boolean;

  /**
   * The action status for the node which is trigger by action for multiple nodes
   */
  isActionMode?: boolean;
  action?: {
    mode: "per_node" | "multi_nodes";
    status?: "pending" | "running" | "success" | "failure" | "skipped";
    skipReason?: string;
    run?: Run;
  };
}

export interface LineageGraphEdge {
  id: string;
  from: "both" | "base" | "current";
  changeStatus?: "added" | "removed";
  parent: LineageGraphNode;
  child: LineageGraphNode;
  isHighlighted?: boolean;
}

export interface LineageGraph {
  nodes: {
    [key: string]: LineageGraphNode;
  };

  edges: {
    [key: string]: LineageGraphEdge;
  };
  modifiedSet: string[];

  manifestMetadata: {
    base?: ManifestMetadata;
    current?: ManifestMetadata;
  };
  catalogMetadata: {
    base?: CatalogMetadata;
    current?: CatalogMetadata;
  };
}

export function buildLineageGraph(
  base: LineageData,
  current: LineageData
): LineageGraph {
  const nodes: { [key: string]: LineageGraphNode } = {};
  const edges: { [key: string]: LineageGraphEdge } = {};
  const buildNode = (
    key: string,
    from: "base" | "current"
  ): LineageGraphNode => {
    return {
      id: key,
      name: key,
      data: {},
      from,
      parents: {},
      children: {},
      isSelected: false,
    };
  };

  for (const [key, parents] of Object.entries(base.parent_map)) {
    nodes[key] = buildNode(key, "base");
    const nodeData = base.nodes && base.nodes[key];
    if (nodeData) {
      nodes[key].data.base = nodeData;
      nodes[key].name = nodeData?.name;
      nodes[key].resourceType = nodeData?.resource_type;
      nodes[key].packageName = nodeData?.package_name;
    }
  }

  for (const [key, parents] of Object.entries(current.parent_map)) {
    if (nodes[key]) {
      nodes[key].from = "both";
    } else {
      nodes[key] = buildNode(key, "current");
    }
    const nodeData = current.nodes && current.nodes[key];
    if (nodeData) {
      nodes[key].data.current = current.nodes && current.nodes[key];
      nodes[key].name = nodeData?.name;
      nodes[key].resourceType = nodeData?.resource_type;
      nodes[key].packageName = nodeData?.package_name;
    }
  }

  for (const [child, parents] of Object.entries(base.parent_map)) {
    for (const parent of parents) {
      const childNode = nodes[child];
      const parentNode = nodes[parent];
      const id = `${parent}_${child}`;
      edges[id] = {
        id,
        from: "base",
        parent: parentNode,
        child: childNode,
      };
      const edge = edges[id];

      childNode.parents[parent] = edge;
      parentNode.children[child] = edge;
    }
  }

  for (const [child, parents] of Object.entries(current.parent_map)) {
    for (const parent of parents) {
      const childNode = nodes[child];
      const parentNode = nodes[parent];
      const id = `${parent}_${child}`;

      if (edges[id]) {
        edges[id].from = "both";
      } else {
        edges[id] = {
          id,
          from: "current",
          parent: parentNode,
          child: childNode,
        };
      }
      const edge = edges[id];

      childNode.parents[parent] = edge;
      parentNode.children[child] = edge;
    }
  }

  const modifiedSet: string[] = [];
  for (const [key, node] of Object.entries(nodes)) {
    if (node.from === "base") {
      node.changeStatus = "removed";
      modifiedSet.push(node.id);
    } else if (node.from === "current") {
      node.changeStatus = "added";
      modifiedSet.push(node.id);
    } else {
      const checksum1 = node?.data?.base?.checksum?.checksum;
      const checksum2 = node?.data?.current?.checksum?.checksum;

      if (checksum1 && checksum2 && checksum1 !== checksum2) {
        node.changeStatus = "modified";
        modifiedSet.push(node.id);
      }
    }
  }

  for (const [key, edge] of Object.entries(edges)) {
    if (edge.from === "base") {
      edge.changeStatus = "removed";
    } else if (edge.from === "current") {
      edge.changeStatus = "added";
    }
  }

  return {
    nodes,
    edges,
    modifiedSet,
    manifestMetadata: {
      base: base.manifest_metadata || undefined,
      current: current.manifest_metadata || undefined,
    },
    catalogMetadata: {
      base: base.catalog_metadata || undefined,
      current: current.catalog_metadata || undefined,
    },
  };
}

export function selectUpstream(
  lineageGraph: LineageGraph,
  nodeIds: string[],
  degree: number = 1000
) {
  return getNeighborSet(
    nodeIds,
    (key) => {
      if (lineageGraph.nodes[key] === undefined) {
        return [];
      }
      return Object.keys(lineageGraph.nodes[key].parents);
    },
    degree
  );
}

export function selectDownstream(
  lineageGraph: LineageGraph,
  nodeIds: string[],
  degree: number = 1000
) {
  return getNeighborSet(
    nodeIds,
    (key) => {
      if (lineageGraph.nodes[key] === undefined) {
        return [];
      }
      return Object.keys(lineageGraph.nodes[key].children);
    },
    degree
  );
}
export function selectViewOptions(
  lineageGraph: LineageGraph,
  viewOptions: LineageDiffViewOptions
) {
  let lineageNodes = Object.values(lineageGraph.nodes);

  const viewMode = viewOptions.view_mode || "changed_models";

  if (viewMode === "changed_models") {
    const u = selectUpstream(lineageGraph, lineageGraph.modifiedSet, 1);
    const d = selectDownstream(lineageGraph, lineageGraph.modifiedSet);
    const modified = union(u, d);
    lineageNodes = lineageNodes.filter((node) => modified.has(node.id));
  }

  if (viewOptions.node_ids !== undefined) {
    const nodeIds = new Set(viewOptions.node_ids);
    lineageNodes = lineageNodes.filter((node) => nodeIds.has(node.id));
  }

  const packages =
    viewOptions.packages !== undefined
      ? viewOptions.packages
      : lineageGraph.manifestMetadata.current?.project_name
      ? [lineageGraph.manifestMetadata.current.project_name]
      : undefined;
  if (packages !== undefined) {
    lineageNodes = lineageNodes.filter((node) => {
      if (!node.packageName) {
        return false;
      }

      return packages.includes(node.packageName);
    });
  }

  return new Set(lineageNodes.map((node) => node.id));
}

export function toReactflow(
  lineageGraph: LineageGraph,
  viewOptions?: LineageDiffViewOptions
): [Node[], Edge[]] {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function getWeight(from: string) {
    if (from === "base") {
      return 0;
    } else if (from === "current") {
      return 2;
    } else {
      return 1;
    }
  }

  function nodeCompareFn(a: LineageGraphNode, b: LineageGraphNode) {
    const weightA = getWeight(a.from);
    const weightB = getWeight(b.from);

    if (weightA < weightB) {
      return -1;
    } else if (weightA > weightB) {
      return 1;
    }
    return 0;
  }

  function edgeCompareFn(a: LineageGraphEdge, b: LineageGraphEdge) {
    const weightA = getWeight(a.from);
    const weightB = getWeight(b.from);

    if (weightA < weightB) {
      return -1;
    } else if (weightA > weightB) {
      return 1;
    }
    return 0;
  }

  const filterSet = viewOptions
    ? selectViewOptions(lineageGraph, viewOptions)
    : undefined;

  const sortedNodes = Object.values(lineageGraph.nodes).sort(nodeCompareFn);
  for (const node of sortedNodes) {
    if (filterSet && !filterSet.has(node.id)) {
      continue;
    }

    nodes.push({
      id: node.id,
      position: { x: 0, y: 0 },
      data: node,
      type: "customNode",
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    });
  }

  const sortedEdges = Object.values(lineageGraph.edges).sort(edgeCompareFn);
  for (const edge of sortedEdges) {
    if (
      filterSet &&
      (!filterSet.has(edge.parent.id) || !filterSet.has(edge.child.id))
    ) {
      continue;
    }

    edges.push({
      id: edge.id,
      type: "customEdge",
      source: edge.parent.id,
      target: edge.child.id,
      data: edge,
    });
  }

  layout(nodes, edges);

  return highlightChanged(lineageGraph, nodes, edges);
}

export function filterNodes(
  nodes: Node[],
  edges: Edge[],
  nodeIds: Set<string>
): [Node[], Edge[]] {
  const newNodes = nodes.filter((node) => nodeIds.has(node.id));
  const newEdges = edges.filter(
    (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
  );

  return [newNodes, newEdges];
}

export function hideNodes(
  nodes: Node[],
  edges: Edge[],
  nodeIds: Set<string>
): [Node[], Edge[]] {
  const newNodes = nodes.map((node) => {
    return {
      ...node,
      hidden: !nodeIds.has(node.id),
    };
  });

  const newEdges = edges.map((edge) => {
    return {
      ...edge,
      hidden: !nodeIds.has(edge.source) || !nodeIds.has(edge.target),
    };
  });

  layout(newNodes, newEdges);
  return [newNodes, newEdges];
}

export const layout = (nodes: Node[], edges: Edge[], direction = "LR") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = 36;

  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });
};

export function highlightNodes(
  nodesIds: string[],
  nodes: Node<LineageGraphNode>[],
  edges: Edge[]
): [Node<LineageGraphNode>[], Edge[]] {
  const relatedNodes = new Set(nodesIds);
  const relatedEdges = new Set(
    edges
      .filter((edge) => {
        return relatedNodes.has(edge.source) && relatedNodes.has(edge.target);
      })
      .map((edge) => edge.id)
  );

  const newNodes = nodes.map((node) => {
    return {
      ...node,
      data: {
        ...node.data,
        isHighlighted: relatedNodes.has(node.id),
      },
    };
  });
  const newEdges = edges.map((edge) => {
    return {
      ...edge,
      data: {
        ...edge.data,
        isHighlighted: relatedEdges.has(edge.id),
      },
    };
  });

  return [newNodes, newEdges];
}

export function highlightChanged(
  lineageGraph: LineageGraph,
  nodes: Node<LineageGraphNode>[],
  edges: Edge[]
) {
  const modifiedDownstream = selectDownstream(
    lineageGraph,
    lineageGraph.modifiedSet
  );

  return highlightNodes(Array.from(modifiedDownstream), nodes, edges);
}

export function selectSingleNode(
  nodeId: string,
  nodes: Node<LineageGraphNode>[]
) {
  const newNodes = nodes.map((n) => {
    const isMatch = n.id === nodeId;
    return {
      ...n,
      data: {
        ...n.data,
        isSelected: isMatch,
      },
    };
  });
  return newNodes;
}

export function selectNode(nodeId: string, nodes: Node<LineageGraphNode>[]) {
  const newNodes = nodes.map((n) => {
    const isMatch = n.id === nodeId;
    return {
      ...n,
      data: {
        ...n.data,
        isSelected: n.data.isSelected !== isMatch,
      },
    };
  });
  return newNodes;
}

export function selectNodes(
  nodeIds: string[],
  nodes: Node<LineageGraphNode>[]
) {
  const newNodes = nodes.map((n) => {
    const isMatch = nodeIds.includes(n.id);
    return {
      ...n,
      data: {
        ...n.data,
        isSelected: n.data.isSelected || isMatch,
      },
    };
  });
  return newNodes;
}

export function cleanUpNodes(
  nodes: Node<LineageGraphNode>[],
  isActionMode?: boolean
) {
  const newNodes = nodes.map((n) => {
    return {
      ...n,
      data: {
        ...n.data,
        isSelected: false,
        isActionMode,
        action: undefined,
      },
    };
  });
  return newNodes;
}

export function getSelectedNodes(nodes: Node<LineageGraphNode>[]) {
  const selectedNodes = nodes.filter((n) => n.data.isSelected);
  return selectedNodes;
}

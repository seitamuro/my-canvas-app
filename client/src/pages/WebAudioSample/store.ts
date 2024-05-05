import type { Connection, Edge, EdgeChange, Node } from "reactflow";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
} from "reactflow";
import { create } from "zustand";

export type Store = {
  nodes: Node<any>[];
  edges: Edge<any>[];
  onNodeChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Edge | Connection) => void;
  updateNode: (id: string, data: any) => void;
  isRunning: boolean;
  toggleAudio: () => void;
};

export const useStore = create((set: any, get: any) => ({
  nodes: [
    {
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
      type: "osc",
    },
    { id: "b", data: { label: "gain" }, position: { x: 50, y: 50 } },
    {
      id: "c",
      data: { label: "output" },
      position: { x: -50, y: 100 },
      type: "out",
    },
  ],
  edges: [],
  onNodeChange(changes: NodeChange[]) {
    set({ nodes: applyNodeChanges(changes, get().nodes as Node<any>[]) });
  },
  onEdgesChange(changes: EdgeChange[]) {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect(params: Edge | Connection) {
    set({ edges: addEdge(params, get().edges) });
  },
  updateNode(id: string, data: any) {
    set({
      nodes: get().nodes.map((node: Node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
  isRunning: false,
  toggleAudio() {
    set({ isRunning: !get().isRunning });
  },
}));


import ReactFlow, { Background, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";

import { Osc } from "./nodes/Osc";
import type { Store } from "./store";
import { useStore } from "./store";

const nodeTypes = {
  osc: Osc
}

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodeChange: store.onNodeChange,
  onEdgesChange: store.onEdgesChange,
  onConnect: store.onConnect,
})

//import "./index.css";

export const WebAudioSample = () => {
  const store = useStore(selector, shallow)

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={store.nodes}
          nodeTypes={nodeTypes}
          edges={store.edges}
          onNodesChange={store.onNodeChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.onConnect}
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
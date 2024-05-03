import { useCallback, useState } from "react"
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, Node, NodeChange } from "reactflow"

import "reactflow/dist/style.css"

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: "input" },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
]
const initialEdges = [{ id: "e1-2", source: "1", target: "2", label: "1 to 2", type: "step" }]


export const ReactFlowSample = () => {
  const [nodes, setNodes] = useState<Node<any>[]>(initialNodes)
  const [edges, setEdges] = useState<Edge<any>[]>(initialEdges)

  const onNodeChange = useCallback((changes: NodeChange[]) => setNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)), [])

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [])

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodeChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
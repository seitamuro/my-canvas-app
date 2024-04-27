import { useState } from "react"

const CanvasItem = () => {
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragStartPosition({ x: e.clientX, y: e.clientY })
  }

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const positionDiff = { x: dragStartPosition.x - e.clientX, y: dragStartPosition.y - e.clientY }
    const newPosition = { x: position.x - positionDiff.x, y: position.y - positionDiff.y }
    setPosition(newPosition)
    console.log(newPosition)
  }

  return (
    <div
      draggable={true}
      onMouseDown={e => console.log("mouse down:", e)}
      onMouseUp={e => console.log("mouse up:", e)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}>
      <h1>Item</h1>
    </div>
  )
}

export const SampleCanvas = () => {
  return (
    <div>
      <h1>Canvas</h1>
      <CanvasItem />
    </div>
  )
}
import React, { useState } from "react"

type CanvasProps = {
  children?: React.ReactNode
}

const Item = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMove, setIsMove] = useState(false)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMove(true)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMove) return

    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY
    })
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMove(false)
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
  }


  return <div
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
    }}>
    Item
  </div>
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <div>
      This is Canvas.
      {children}
    </div>
  )

}
export const MouseClickCanvasSample = () => {
  return (
    <Canvas >
      <Item />
    </Canvas>
  )
}
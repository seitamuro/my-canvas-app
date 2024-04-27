import React, { useEffect, useState } from "react"

const ItemContextMenu: React.FC = () => {
  return (
    <div>
      This is ItemContextMenu.
    </div>
  )
}

type ItemProps = {
  x?: number,
  y?: number
  children?: React.ReactNode
}

const Item: React.FC<ItemProps> = ({ x = 0, y = 0, children }) => {
  const [prevClientPosition, setPrevClientPosition] = useState({ x, y })
  const [position, setPosition] = useState({ x, y })
  const [isMove, setIsMove] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMove(true)
    setPrevClientPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      setIsMove(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      if (!isMove) return
      const newPosition = {
        x: position.x + e.clientX - prevClientPosition.x,
        y: position.y + e.clientY - prevClientPosition.y
      }
      setPrevClientPosition({ x: e.clientX, y: e.clientY })
      setPosition(newPosition)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      setIsMove(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMove, position])

  return <div
    onMouseDown={onMouseDown}
    onContextMenu={(e) => { e.preventDefault(); setShowContextMenu(true) }}
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      backgroundColor: 'lightblue',
      margin: 0,
      padding: 0,
    }}>
    {children}
    {showContextMenu && <ItemContextMenu />}
  </div>
}

type CanvasProps = {
  children?: React.ReactNode
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <div>
      This is Canvas.
      {children}
    </div>
  )
}

type ItemData = {
  x: number,
  y: number,
  text: string
}

export const MouseClickCanvasSample = () => {
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 20 })
  const [items, setItems] = useState<ItemData[]>([])

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const item: ItemData = {
      x: itemPosition.x,
      y: itemPosition.y + 30,
      text: `Item${items.length + 1}`
    }
    setItemPosition({ x: item.x, y: item.y })
    setItems(prev => [...prev, item])
  }

  return (
    <Canvas >
      <button onClick={onClick}>Add Item</button>
      {items.map((item, index) => (<Item key={index} x={item.x} y={item.y}>{item.text}</Item>))}
    </Canvas>
  )
}
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";

const TextAreaAutoSize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

type ItemContextMenuProps = {
  menuX?: number;
  menuY?: number;
  children?: React.ReactNode;
}

const ContextMenu: React.FC<ItemContextMenuProps> = ({ menuX = 0, menuY = 0, children }) => {
  return (
    <div style={{
      position: 'absolute',
      left: menuX,
      top: menuY,
      backgroundColor: 'lightgreen',
    }}>
      {children}
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
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [backgroundColor, setBackgroundColor] = useState('lightblue')

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMove(true)
    setPrevClientPosition({ x: e.clientX, y: e.clientY })
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
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

    const handleWindowClick = (e: MouseEvent) => {
      setShowContextMenu(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('click', handleWindowClick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleWindowClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMove, position])

  return <>
    <div
      onMouseDown={onMouseDown}
      onContextMenu={(e) => { e.preventDefault(); setShowContextMenu(true) }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: backgroundColor,
        margin: 0,
        padding: 0,
      }}>
      {children}
    </div>
    {showContextMenu && <ContextMenu menuX={contextMenuPosition.x} menuY={contextMenuPosition.y}>
      <button onClick={() => setBackgroundColor("crimson")}>Red</button>
      <button onClick={() => setBackgroundColor("springgreen")}>Green</button>
      <button onClick={() => setBackgroundColor("lightblue")}>Blue</button>
    </ContextMenu>}
  </>
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
      {items.map((item, index) => (<Item key={index} x={item.x} y={item.y}>
        <p>{item.text}</p>
        <TextAreaAutoSize />
      </Item>))}
    </Canvas>
  )
}
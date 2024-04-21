import React, { createContext, useContext, useEffect, useState } from "react";

type DroppableItem = {
  id: string,
  content: string
}

type DropZoneData = {
  id: string,
  item: DroppableItem
}

interface DnDContextType {
  draggedData: DroppableItem | null;
  setDraggedData: React.Dispatch<React.SetStateAction<DroppableItem | null>>
  dropZoneData: DropZoneData[]
  setDropZoneData: React.Dispatch<React.SetStateAction<DropZoneData[]>>
}

const defaultDnDContext: DnDContextType = {
  draggedData: null,
  setDraggedData: () => { },
  dropZoneData: [],
  setDropZoneData: () => { }
}

const DnDContext = createContext<DnDContextType>(defaultDnDContext)
const useDnDContext = () => useContext(DnDContext)

interface DnDProviderProps {
  children: React.ReactNode
}

const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [draggedData, setDraggedData] = useState<DroppableItem | null>(null)
  const [dropZoneData, setDropZoneData] = useState<DropZoneData[]>([])

  return (
    <DnDContext.Provider value={{ draggedData, setDraggedData, dropZoneData, setDropZoneData }}>
      {children}
    </DnDContext.Provider>
  )
}

type DraggableItemProps = {
  id: string,
  content: string,
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, content }) => {
  const { setDraggedData } = useDnDContext()
  const onDragStartHandler = (e: React.DragEvent) => {
    setDraggedData({ id, content })
  }
  return <div
    id={id}
    onDragStart={onDragStartHandler}
    draggable={true}
  >
    {content}
  </div>
}

interface DropZoneProps {
  id: string,
  initialItems?: DroppableItem[]
  style?: React.CSSProperties
}

const addInitialItems = (id: string, prev: DropZoneData[], initialItems: DroppableItem[]): DropZoneData[] => {
  const concatData = [...prev, ...initialItems.map(item => ({ id: id, item: item }))]
  const uniqueData = Array.from(new Set(concatData.map(data => data.item.id))).map(id => { return concatData.find(data => data.item.id === id) })
  const newData = uniqueData.filter(data => data !== undefined) as DropZoneData[]

  return newData
}

const DropZone: React.FC<DropZoneProps> = ({ id, initialItems = [], style = {} }) => {
  const { draggedData, dropZoneData, setDropZoneData } = useDnDContext()

  useEffect(() => {
    setDropZoneData(prev => addInitialItems(id, prev, initialItems))
  }, [])

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDropHandler = (e: React.DragEvent) => {
    if (!draggedData) return
    setDropZoneData(prev => prev.map(dropZoneData => dropZoneData.item.id === draggedData.id ? { id: id, item: draggedData } : dropZoneData))
  }

  return (
    <div
      style={style}
      onDragOver={onDragOverHandler}
      onDrop={onDropHandler}
    >
      <p>Drop Zone</p>
      {dropZoneData.filter(zoneData => zoneData.id === id).map((zoneData, index) => (
        <DraggableItem key={index} id={zoneData.item.id} content={zoneData.item.content} />
      ))}
    </div>
  )
}

export const ReactOnDragSample = () => {
  const initialItems: DroppableItem[] = [
    { id: "item-1", content: "Drag me around!" },
    { id: "item-1", content: "Drag me around!" },
    { id: "item-1", content: "Drag me around!" },
    { id: "item-2", content: "Drag me around!" },
    { id: "item-3", content: "Drag me around!" },
    { id: "item-3", content: "Drag me around!" },
    { id: "item-1", content: "Drag me around!" },
    { id: "item-1", content: "Drag me around!" },
  ]

  return (
    <>
      <DnDProvider>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <DropZone id="dropzone-1" initialItems={initialItems} style={{ width: "50%", minHeight: "100vh", backgroundColor: "silver" }} />
          <DropZone id="dropzone-2" style={{ width: "50%", minHeight: "100vh", backgroundColor: "silver" }} />
        </div>
      </DnDProvider>
    </>
  )
}
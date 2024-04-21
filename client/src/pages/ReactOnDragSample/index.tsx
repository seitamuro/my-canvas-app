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
    console.log("onDragStartHandler", e)
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

interface DraggableItemContainerProps {
  id: string,
  initialItems?: DroppableItem[]
}

const DraggableItemContainer: React.FC<DraggableItemContainerProps> = ({ id, initialItems = [] }) => {
  const { draggedData, dropZoneData, setDropZoneData } = useDnDContext()

  useEffect(() => {
    setDropZoneData(prev => [...prev, ...initialItems.map(item => ({ id, item: item }))])
  }, [])

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDropHandler = (e: React.DragEvent) => {
    console.log("onDropHandler", e)
    console.log(draggedData)
    console.log(id)
    if (!draggedData) return
    setDropZoneData(prev => prev.map(dropZoneData => dropZoneData.item.id === draggedData.id ? { id: id, item: draggedData } : dropZoneData))
    console.log(dropZoneData)
  }

  return (
    <div
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
  return (
    <>
      <DnDProvider>
        <DraggableItemContainer id="dropzone-1" initialItems={[{ id: "item-1", content: "Drag me around!" }]} />
        <DraggableItemContainer id="dropzone-2" />
      </DnDProvider>
    </>
  )
}
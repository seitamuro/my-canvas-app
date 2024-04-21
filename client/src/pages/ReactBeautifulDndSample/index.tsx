import { closestCorners, DndContext, DragEndEvent, DragOverEvent, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import "./styles.css"

type CardType = {
  id: string,
  title: string
}

const Card: React.FC<CardType> = ({ id, title }: { id: string, title: string }) => {
  const { attributes, listeners, setNodeRef, transform, data } = useSortable({
    id: id
  })

  if (transform) {
    console.log("x")
    transform.x = 100
  }

  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id}>
        <p>{title}</p>
      </div>
    </div>
  )
}

type ColumnType = {
  id: string,
  title: string,
  cards: CardType[]
}

const Column: React.FC<ColumnType> = ({ id, title, cards }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id: id })

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          background: "rgba(245, 247, 249, 1.00)",
          marginRight: "10px",
        }}
      >
        <p style={{
          padding: "5px 20px",
          textAlign: "left",
          fontWeight: "500",
          color: "#575757"
        }}>{title}</p>
        {cards.map((card: CardType) => (
          <Card key={card.id} id={card.id} title={card.title} />
        ))}
      </div>
    </SortableContext>
  )
}

export const ReactBeautifulDndSample = () => {
  const data: ColumnType[] = [
    { id: "column-1", title: "Column 1", cards: [{ id: "card-1-1", title: "Card 1-1" }, { id: "card-1-2", title: "Card 1-2" }] },
    { id: "column-2", title: "Column 2", cards: [{ id: "card-2-1", title: "Card 2-1" }, { id: "card-2-2", title: "Card 2-2" }] },
  ]
  const [columns, setColumns] = useState<ColumnType[]>(data)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null
    }

    if (columns.some(c => c.id === unique)) {
      return columns.find(c => c.id === unique) ?? null;
    }
    const id = String(unique)
    const itemWithColumnId = columns.flatMap(c => {
      const columnId = c.id;
      return c.cards.map(i => ({ itemId: i.id, columnId: columnId }))
    })
    const columnId = itemWithColumnId.find(i => i.itemId === id)?.columnId;
    return columns.find(c => c.id === columnId) ?? null;
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex(i => i.id === activeId);
      const overIndex = overItems.findIndex(i => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      return prevState.map(c => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter(i => i.id !== activeId);
          return c
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length)
          ]
          return c;
        } else {
          return c
        }
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex(i => i.id === activeId);
    const overIndex = overColumn.cards.findIndex(i => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map(c => {
          if (c.id === activeColumn.id) {
            c.cards = arrayMove(activeColumn.cards, activeIndex, overIndex)
            return c
          } else {
            return c
          }
        })
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="App" style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
        {columns.map((column: ColumnType) => (
          <Column key={column.id} id={column.id} title={column.title} cards={column.cards} />
        ))}
      </div>
    </DndContext>
  )
}
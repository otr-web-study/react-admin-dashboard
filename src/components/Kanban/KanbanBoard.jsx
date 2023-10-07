import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ columns: initialColumns, items, keyField }) => {
  const [tasks, setTasks] = useState({});
  const [columnIds, setColumnIds] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [columns, setColumns] = useState(initialColumns);

  const onDragStart = (evt) => {
    if (evt.active.data.current?.type === 'column') {
      setActiveColumn(evt.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (evt) => {
    const { active, over } = evt;

    if (!over) return;

    const activeColId = active.id;
    const overColId = over.id;

    if (activeColId === overColId) return;

    setColumns((columns) =>
      arrayMove(
        columns,
        columns.findIndex((c) => c.keyField === activeColId),
        columns.findIndex((c) => c.keyField === overColId),
      ),
    );
  };

  useLayoutEffect(() => {
    setTasks(
      initialColumns.reduce((acc, col) => {
        const colTasks = items.filter((i) => i[keyField] === col.keyField);
        acc[col.keyField] = colTasks || [];

        return acc;
      }, {}),
    );
  }, [initialColumns, items, keyField]);

  useLayoutEffect(() => {
    setColumnIds(columns.map((c) => c.keyField));
  }, [columns]);

  const content = columns
    ? columns.map((col) => (
        <KanbanColumn key={col.keyField} column={col} tasks={tasks[col.keyField]} />
      ))
    : null;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 justify-stretch">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <SortableContext items={columnIds}>{content}</SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn column={activeColumn} tasks={tasks[activeColumn.keyField]} />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;

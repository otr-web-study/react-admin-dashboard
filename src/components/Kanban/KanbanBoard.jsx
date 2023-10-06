import { useState, useLayoutEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ columns, items, keyField }) => {
  const [tasks, setTasks] = useState({});
  const [columnIds, setColumnIds] = useState([]);

  useLayoutEffect(() => {
    setTasks(
      columns.reduce((acc, col) => {
        const colTasks = items.filter((i) => i[keyField] === col.keyField);
        acc[col.keyField] = colTasks || [];

        return acc;
      }, {}),
    );
  }, [columns, items, keyField]);

  useLayoutEffect(() => {
    setColumnIds(columns.map((c) => c.keyField));
  }, [columns]);

  const content = columns.map((col) => (
    <KanbanColumn key={col.keyField} column={col} tasks={tasks[col.keyField]} />
  ));

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 justify-stretch">
      <DndContext>
        <SortableContext items={columnIds}>{content}</SortableContext>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;

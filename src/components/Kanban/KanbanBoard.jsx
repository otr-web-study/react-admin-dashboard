import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanTask from './KanbanTask';

const KanbanBoard = ({ columns: initialColumns, items, keyField }) => {
  const [tasks, setTasks] = useState(items);
  const [columnIds, setColumnIds] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [columns, setColumns] = useState(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
  );

  const onDragStart = (evt) => {
    if (evt.active.data.current?.type === 'column') {
      setActiveColumn(evt.active.data.current.column);
      return;
    }

    setActiveTask(evt.active.data.current.task);
  };

  const onDragEnd = (evt) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = evt;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const isActiveColumn = active.data.current?.type === 'column';

    if (activeId === overId) return;

    if (isActiveColumn) {
      setColumns((columns) =>
        arrayMove(
          columns,
          columns.findIndex((c) => c.keyField === activeId),
          columns.findIndex((c) => c.keyField === overId),
        ),
      );
    } else {
      setTasks((tasks) =>
        arrayMove(
          tasks,
          tasks.findIndex((t) => t.Id === activeId),
          tasks.findIndex((t) => t.Id === overId),
        ),
      );
    }
  };

  const onDragOver = (evt) => {
    const { active, over } = evt;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';

    if (!isActiveTask) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.Id === activeId);

      if (isOverTask) {
        const overIndex = tasks.findIndex((t) => t.Id === overId);

        tasks[activeIndex][keyField] = tasks[overIndex][keyField];

        return arrayMove(tasks, activeIndex, overIndex);
      }

      tasks[activeIndex][keyField] = overId;

      const lastIndex = tasks.findIndex(
        (t) => t.Id === tasks.findLast((t) => t[keyField] === overId)?.Id ?? activeId,
      );

      return arrayMove(tasks, activeIndex, lastIndex);
    });
  };

  const toggleColumnExpand = (keyField) => {
    setColumns(
      columns.map((c) => (c.keyField === keyField ? { ...c, isExpanded: !c.isExpanded } : c)),
    );
  };

  useLayoutEffect(() => {
    setColumnIds(columns.map((c) => c.keyField));
  }, [columns]);

  const content = columns
    ? columns.map((col) => (
        <KanbanColumn
          key={col.keyField}
          column={col}
          tasks={tasks.filter((t) => t[keyField] === col.keyField)}
          onExpand={() => toggleColumnExpand(col.keyField)}
        />
      ))
    : null;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 justify-stretch">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={columnIds}>{content}</SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                tasks={tasks.filter((t) => t[keyField] === activeColumn.keyField)}
              />
            )}
            {activeTask && <KanbanTask task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;

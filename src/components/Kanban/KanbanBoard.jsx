import { createPortal } from 'react-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanTask from './KanbanTask';
import { useKanbanBoard } from './useKanbanBoard';

const KanbanBoard = ({ columns: initialColumns, items, keyField }) => {
  const {
    tasks,
    columns,
    columnIds,
    activeColumn,
    activeTask,
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver,
    toggleColumnExpand,
  } = useKanbanBoard(initialColumns, items, keyField);

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

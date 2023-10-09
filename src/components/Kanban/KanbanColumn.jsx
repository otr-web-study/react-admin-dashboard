import { useMemo } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import KanbanTask from './KanbanTask';

const KanbanColumn = ({ column, tasks, onExpand }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.keyField,
    data: {
      type: 'column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    style['opacity'] = 0.4;
  }

  const content = tasks ? tasks.map((t) => <KanbanTask key={t.Id} task={t} />) : null;

  const tasksIds = useMemo(() => (tasks ? tasks.map((t) => t.Id) : []), [tasks]);

  return (
    <div
      data-expanded={column.isExpanded ?? true}
      ref={setNodeRef}
      style={style}
      className="flex-1 overflow-x-hidden min-w-[150px] bg-light-gray rounded min-h-[500px] pb-3 flex flex-col max-w-[350px] shadow-md data-[expanded='false']:flex-none data-[expanded='false']:w-12 data-[expanded='false']:min-w-[50px]"
    >
      <div
        data-expanded={column.isExpanded ?? true}
        className="font-medium p-3 flex items-center gap-3 justify-between data-[expanded='false']:flex-col-reverse"
        {...attributes}
        {...listeners}
      >
        <h3
          data-expanded={column.isExpanded ?? true}
          className="data-[expanded='false']:-rotate-[90deg] data-[expanded='false']:h-full"
        >
          {column.headerText}
          <span className="font-normal ml-1">{`(${tasks && tasks.length})`}</span>
        </h3>
        <button onClick={onExpand}>
          {(column.isExpanded ?? true) && <MdOutlineKeyboardArrowLeft className="w-5 h-5" />}
          {!(column.isExpanded ?? true) && <MdOutlineKeyboardArrowRight className="w-5 h-5" />}
        </button>
      </div>
      <div
        data-expanded={column.isExpanded ?? true}
        className="my-4 flex flex-col gap-3 mx-3 data-[expanded='false']:opacity-0"
      >
        <SortableContext items={tasksIds}>{content}</SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;

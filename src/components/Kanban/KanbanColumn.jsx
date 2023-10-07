import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import KanbanTask from './KanbanTask';

const KanbanColumn = ({ column, tasks }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-1 min-w-[150px] bg-light-gray rounded min-h-[500px] pb-3 flex flex-col max-w-[350px] shadow-md"
    >
      <h3 className="font-medium p-3" {...attributes} {...listeners}>
        {column.headerText}
        <span className="font-normal ml-1">{`(${tasks && tasks.length})`}</span>
      </h3>
      <div className="my-4 flex flex-col gap-3 mx-3">{content}</div>
    </div>
  );
};

export default KanbanColumn;

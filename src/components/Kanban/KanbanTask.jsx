import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const KanbanTask = ({ task }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.Id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    style['opacity'] = 0.6;
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-secondary-dark-bg dark:text-gray-200 p-2 rounded border-l-4"
      style={{ ...style, borderLeftColor: task.Color }}
    >
      <h4 className="font-semibold">{task.Title}</h4>
      <p className="mt-2 text-sm">{task.Summary}</p>
    </div>
  );
};

export default KanbanTask;

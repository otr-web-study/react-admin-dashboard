import { useSortable } from '@dnd-kit/sortable';
import KanbanTask from './KanbanTask';

const KanbanColumn = ({ column, tasks }) => {
  const content = tasks ? tasks.map((t) => <KanbanTask key={t.Id} task={t} />) : null;
  return (
    <div className="flex-1 min-w-[150px] bg-light-gray rounded p-3 min-h-[500px] flex flex-col max-w-[350px]">
      <h3 className="font-medium">
        {column.headerText}
        <span className="font-normal ml-1">{`(${tasks && tasks.length})`}</span>
      </h3>
      <div className="my-4 flex flex-col gap-3">{content}</div>
    </div>
  );
};

export default KanbanColumn;

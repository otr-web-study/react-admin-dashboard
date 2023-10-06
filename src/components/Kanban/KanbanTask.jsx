const KanbanTask = ({ task }) => {
  return (
    <div className="bg-white p-2 rounded border-l-4" style={{ borderLeftColor: task.Color }}>
      <h4 className="font-semibold">{task.Title}</h4>
      <p className="mt-2 text-sm">{task.Summary}</p>
    </div>
  );
};

export default KanbanTask;

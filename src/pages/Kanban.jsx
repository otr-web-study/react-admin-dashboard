import { Header, KanbanBoard } from '../components';
import { kanbanData, kanbanGrid } from '../data/dummy';

const Kanban = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
      <KanbanBoard items={kanbanData} columns={kanbanGrid} keyField="Status" />
    </div>
  );
};

export default Kanban;

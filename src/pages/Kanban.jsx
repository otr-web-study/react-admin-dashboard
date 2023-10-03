import { Header } from '../components';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { KanbanTasks } from '../components';

const Kanban = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
      <KanbanTasks tasks={kanbanData} columns={kanbanGrid} />
    </div>
  );
};

export default Kanban;

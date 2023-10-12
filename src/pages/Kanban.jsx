import { Header, KanbanBoard, PageContainer } from '../components';
import { kanbanData, kanbanGrid } from '../data/dummy';

const Kanban = () => {
  return (
    <PageContainer>
      <Header category="App" title="Kanban" />
      <KanbanBoard items={kanbanData} columns={kanbanGrid} keyField="Status" />
    </PageContainer>
  );
};

export default Kanban;

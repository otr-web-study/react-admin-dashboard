import { Header, LineChart, PageContainer } from '../../components';

const Line = () => {
  return (
    <PageContainer>
      <Header category="Chart" title="Inflation Rate" />
      <div className="w-full">
        <LineChart />
      </div>
    </PageContainer>
  );
};

export default Line;

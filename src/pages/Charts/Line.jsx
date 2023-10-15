import { ChartsHeader, LineChart, PageContainer } from '../../components';

const Line = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Line" title="Inflation Rate" />
      <LineChart />
    </PageContainer>
  );
};

export default Line;

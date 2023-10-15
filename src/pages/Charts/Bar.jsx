import { ChartsHeader, BarChart, PageContainer } from '../../components';

const Bar = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
      <BarChart />
    </PageContainer>
  );
};

export default Bar;

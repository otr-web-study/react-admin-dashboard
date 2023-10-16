import { ChartsHeader, Pie as PieChart, PageContainer } from '../../components';

const Pie = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Pie" title="Project Cost Breakdown" />
      <PieChart />
    </PageContainer>
  );
};

export default Pie;

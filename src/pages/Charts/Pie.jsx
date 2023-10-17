import { ChartsHeader, Pie as PieChart, PageContainer } from '../../components';
import { pieChartData } from '../../data/dummy';

const Pie = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Pie" title="Project Cost Breakdown" />
      <PieChart short={false} data={pieChartData} />
    </PageContainer>
  );
};

export default Pie;

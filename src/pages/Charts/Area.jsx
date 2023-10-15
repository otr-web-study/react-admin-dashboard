import { ChartsHeader, AreaChart, PageContainer } from '../../components';

const Area = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <AreaChart />
    </PageContainer>
  );
};

export default Area;

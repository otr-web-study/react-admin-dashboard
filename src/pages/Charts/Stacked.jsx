import { ChartsHeader, Stacked as StackedChart, PageContainer } from '../../components';

const Stacked = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Stacked" title="Revenue Breakdown" />
      <StackedChart height={500} short={false} />
    </PageContainer>
  );
};

export default Stacked;

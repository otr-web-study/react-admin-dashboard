import { ChartsHeader, FinancialChart, PageContainer } from '../../components';

const Financial = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Financial" title="AAPLE Historical" />
      <FinancialChart />
    </PageContainer>
  );
};

export default Financial;

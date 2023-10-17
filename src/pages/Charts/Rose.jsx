import { ChartsHeader, RoseChart, PageContainer } from '../../components';

const Rose = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Rose" title="Food Comparison Chart" />
      <RoseChart />
    </PageContainer>
  );
};

export default Rose;

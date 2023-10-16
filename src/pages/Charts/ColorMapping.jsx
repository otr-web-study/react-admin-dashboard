import { ChartsHeader, ColorMappingChart, PageContainer } from '../../components';

const ColorMapping = () => {
  return (
    <PageContainer>
      <ChartsHeader category="Color Mapping" title="USA CLIMATE - WEATHER BY MONTH" />
      <ColorMappingChart />
    </PageContainer>
  );
};

export default ColorMapping;

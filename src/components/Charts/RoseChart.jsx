import { Rose } from '@ant-design/plots';
import { PyramidData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const RoseChart = () => {
  const { currentMode } = useStateContext();

  const config = {
    data: PyramidData,
    xField: 'x',
    yField: 'y',
    seriesField: 'x',
    radius: 0.9,
    legend: { position: 'top' },
    height: 500,
    label: { formatter: () => '' },
    tooltip: { formatter: (datum) => ({ name: 'Calory', value: `${datum.y} cal` }) },
    theme: getChartsTheme(currentMode),
  };
  return <Rose {...config} />;
};

export default RoseChart;

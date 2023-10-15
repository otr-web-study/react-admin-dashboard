import { Area } from '@ant-design/plots';
import { preparedAreaChartData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const AreaChart = () => {
  const { currentMode } = useStateContext();

  const config = {
    data: preparedAreaChartData,
    xField: 'year',
    yField: 'percentage',
    seriesField: 'name',
    theme: getChartsTheme(currentMode),
  };

  return <Area {...config} />;
};

export default AreaChart;

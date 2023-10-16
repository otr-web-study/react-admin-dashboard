import { Line } from '@ant-design/plots';
import { preparedLineChartData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const config = {
    data: preparedLineChartData,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
    height: 500,
    color: ['#03C9D7', '#7352FF', '#FB9678'],
    theme: getChartsTheme(currentMode),
  };

  return <Line {...config} />;
};

export default LineChart;

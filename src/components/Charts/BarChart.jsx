import { Column } from '@ant-design/plots';
import { preparedBarChartData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const BarChart = () => {
  const { currentMode } = useStateContext();

  const config = {
    data: preparedBarChartData,
    isGroup: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
    dodgePadding: 2,
    intervalPadding: 60,
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    theme: getChartsTheme(currentMode),
  };

  return <Column {...config} />;
};

export default BarChart;

import { Pie as PiePlot } from '@ant-design/plots';
import { pieChartData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const Pie = () => {
  const { currentMode } = useStateContext();

  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: 'y',
    colorField: 'x',
    radius: 1,
    innerRadius: 0.3,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    height: 500,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: false,
    },
    legend: {
      layout: 'horizontal',
      position: 'top',
    },
    theme: getChartsTheme(currentMode),
  };
  return <PiePlot {...config} />;
};

export default Pie;

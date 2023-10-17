import { Pie as PiePlot } from '@ant-design/plots';
import { getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const Pie = ({ data, short = true }) => {
  const { currentMode } = useStateContext();

  const config = {
    appendPadding: 10,
    data: data,
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

  if (short) {
    config.legend = false;
    config.height = 160;
    config.innerRadius = 0.4;
    config.label.style.fontSize = 11;
    config.label.offset = '-50%';
  }

  return <PiePlot {...config} />;
};

export default Pie;

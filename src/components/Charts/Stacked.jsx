import { Column } from '@ant-design/plots';
import { stackedCustomSeries } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const Stacked = ({ width, height, theme }) => {
  const { currentColor } = useStateContext();
  const data = stackedCustomSeries.reduce((acc, ser) => {
    acc.push(...ser.dataSource.map((item) => ({ ...item, type: ser.name })));
    return acc;
  }, []);

  const config = {
    width,
    height,
    data,
    xField: 'x',
    yField: 'y',
    seriesField: 'type',
    isStack: true,
    legend: false,
    xAxis: { line: { style: { lineWidth: 0 } } },
    yAxis: {
      grid: {
        line: null,
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle, element) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
    color: ({ type }) => (type === 'Expense' ? currentColor.color : currentColor.secondColor),
    columnStyle: ({ type }) => ({ radius: type === 'Budget' ? [8, 8, 0, 0] : [0, 0, 0, 0] }),
    theme,
  };

  return <Column {...config} />;
};

export default Stacked;

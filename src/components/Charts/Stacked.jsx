import { Column } from '@ant-design/plots';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy';

const Stacked = ({ width, height }) => {
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
    color: ({ type }) => {
      if (type === 'Expense') {
        return '#03c9d7';
      }
      return '#FB9678';
    },
  };

  return <Column {...config} />;
};

export default Stacked;

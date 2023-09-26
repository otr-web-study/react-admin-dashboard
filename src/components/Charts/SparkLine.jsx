import { Line } from '@ant-design/plots';

const SparkLine = ({ height, width, data, color }) => {
  const config = {
    data,
    xField: 'x',
    yField: 'yval',
    smooth: true,
    width,
    height,
    color,
    xAxis: {
      tickCount: 0,
    },
    yAxis: { tickCount: 0 },
    tooltip: {
      formatter: (datum) => ({ name: 'Data', value: datum.yval }),
    },
  };
  return <Line {...config}></Line>;
};

export default SparkLine;

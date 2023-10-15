import { Line } from '@ant-design/plots';

const SparkLine = ({ height, width, data, color, theme }) => {
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
      line: { style: { lineWidth: 0 } },
    },
    yAxis: { tickCount: 0 },
    tooltip: {
      formatter: (datum) => ({ name: 'Data', value: datum.yval }),
    },
    theme,
  };
  return <Line {...config}></Line>;
};

export default SparkLine;

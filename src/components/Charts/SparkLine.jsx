import { Line } from '@ant-design/plots';
import { SparklineAreaData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const SparkLine = ({ height, width, color }) => {
  const { currentMode } = useStateContext();
  const config = {
    data: SparklineAreaData,
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
    theme: getChartsTheme(currentMode),
  };
  return <Line {...config}></Line>;
};

export default SparkLine;

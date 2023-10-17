import { Column } from '@ant-design/plots';
import { SparklineAreaData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const ColumnChart = ({ height, width, color }) => {
  const { currentMode } = useStateContext();
  const config = {
    data: SparklineAreaData,
    xField: 'x',
    yField: 'yval',
    width,
    height,
    color,
    columnWidthRatio: 0.8,
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

  return <Column {...config} />;
};

export default ColumnChart;

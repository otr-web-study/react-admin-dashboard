import { Column } from '@ant-design/plots';
import { colorMappingData, getColorColorMapping, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const ColorMappingChart = () => {
  const { currentMode } = useStateContext();
  const config = {
    data: colorMappingData[0],
    xField: 'x',
    yField: 'y',
    label: {
      position: 'middle',
      style: {
        fill: 'black',
        opacity: 0.6,
      },
    },
    height: 500,
    colorField: 'x',
    color: getColorColorMapping,
    meta: {
      y: { alias: '&#8451;' },
    },
    theme: getChartsTheme(currentMode),
  };
  return <Column {...config} />;
};

export default ColorMappingChart;

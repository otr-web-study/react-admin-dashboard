import { Column } from '@ant-design/plots';
import {
  colorMappingData,
  rangeColorMapping,
  getColorColorMapping,
  getChartsTheme,
} from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const ColorMappingChart = () => {
  const { currentMode } = useStateContext();
  const config = {
    data: colorMappingData[0],
    xField: 'x',
    yField: 'y',
    height: 500,
    color: getColorColorMapping,
    tooltip: { formatter: (datum) => ({ name: 'Temperature', value: `${datum.y} &#8451;` }) },
    yAxis: {
      title: { text: 'Temperature' },
    },
    theme: getChartsTheme(currentMode),
  };

  const legendContent = rangeColorMapping.map((item) => (
    <span key={item.label} className="flex items-center">
      <span
        style={{ backgroundColor: item.colors[0] }}
        className="inline-block w-3 h-3 mr-1"
      ></span>
      {item.label}
    </span>
  ));

  return (
    <>
      <Column {...config} />
      <p className="w-full mt-1 flex gap-3 text-14 justify-center">{legendContent}</p>
    </>
  );
};

export default ColorMappingChart;

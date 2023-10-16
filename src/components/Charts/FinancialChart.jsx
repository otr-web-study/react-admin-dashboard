import { Stock } from '@ant-design/plots';
import { financialChartData, getChartsTheme } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const FinancialChart = () => {
  const { currentMode } = useStateContext();
  const theme = getChartsTheme(currentMode);
  const config = {
    data: financialChartData,
    appendPadding: [0, 10, 0, 0],
    xField: 'x',
    yField: ['open', 'close', 'high', 'low'],
    slider: {},
    height: 500,
    theme: {
      ...theme,
      components: {
        ...theme.components,
        slider: {
          common: { textStyle: { opacity: 0 } },
        },
      },
    },
  };

  return <Stock {...config} />;
};

export default FinancialChart;

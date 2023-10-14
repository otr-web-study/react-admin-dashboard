import { Line } from '@ant-design/plots';
import { lineCustomSeries, LinePrimaryYAxis, LinePrimaryXAxis } from '../../data/dummy';

const data = lineCustomSeries.reduce((acc, item) => {
  acc.push(
    ...item.dataSource.reduce((ac, i) => {
      ac.push({
        Date: i.x,
        Infl: i.y,
        name: item.name,
      });

      return ac;
    }, []),
  );

  return acc;
}, []);

const LineChart = () => {
  console.log(data);
  const config = {
    data,
    xField: 'Date',
    yField: 'Infl',
    seriesField: 'name',
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line config={config} />;
};

export default LineChart;

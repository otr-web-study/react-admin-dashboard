import { BsCurrencyDollar } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { Stacked, Button, Pie, SparkLine } from '../components';
import { earningData, SparklineAreaData, ecomPieChartData, getChartsTheme } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const ECommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const theme = getChartsTheme(currentMode);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.37</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue updates</p>
            <div className="flex items-center gap-4">
              <p
                className="flex items-center gap-2 hover:drop-shadow-xl"
                style={{ color: currentColor.color }}
              >
                <span>
                  <GoDotFill />
                </span>
                <span>Expense</span>
              </p>
              <p
                className="flex items-center gap-2 hover:drop-shadow-xl"
                style={{ color: currentColor.secondColor }}
              >
                <span>
                  <GoDotFill />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color dark:border-dark-color m-4 mt-0 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className="text-3xl font-semibold">$48,362</span>
                </p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine
                  height={80}
                  width={250}
                  data={SparklineAreaData}
                  color={currentColor.color}
                  theme={theme}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor.color}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked width={320} height={360} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;

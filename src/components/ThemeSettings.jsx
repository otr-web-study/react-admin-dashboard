import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { Tooltip, Drawer } from 'antd';
import { themeColors } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const ThemeSettings = ({ open, onClose }) => {
  const { setColor, setMode, currentMode, currentColor } = useStateContext();

  return (
    <Drawer open={open} onClose={onClose} closable={false} title={null} width={400}>
      <div className="flex justify-between items-center py-10 md:py-4 ml-4 dark:text-gray-200">
        <p className="font-semibold text-xl">Settings</p>
        <button
          type="button"
          onClick={onClose}
          className="text-2xl p-3 rounded-full text-gray-400 dark:text-gray-300 hover:drop-shadow-xl hover:bg-light-gray dark:hover:bg-main-dark-bg transition-all duration-300"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex-col flex border-t-1 border-color py-4 ml-4 dark:text-gray-200 dark:border-dark-color">
        <p className="font-semibold text-lg">Theme options</p>
        <div className="mt-4">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            className="cursor-pointer"
            checked={currentMode === 'Light'}
            onChange={setMode}
          />
          <label htmlFor="light" className="ml-2 text-md cursor-pointer">
            Light
          </label>
        </div>
        <div className="mt-4">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            className="cursor-pointer"
            checked={currentMode === 'Dark'}
            onChange={setMode}
          />
          <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
            Dark
          </label>
        </div>
      </div>
      <div className="flex-col flex border-t-1 border-color py-4 ml-4 dark:text-gray-200 dark:border-dark-color">
        <p className="font-semibold text-lg">Theme Colors</p>
        <div className="flex gap-5 mt-2 items-center">
          {themeColors.map((item, idx) => (
            <Tooltip
              key={idx}
              title={item.name}
              placement="top"
              color="#555555"
              overlayClassName="!z-max"
            >
              <button
                type="button"
                className="h-10 w-10 rounded-full"
                style={{ backgroundColor: item.color }}
                onClick={() => setColor(item)}
              >
                <BsCheck
                  className={`ml-2 text-2xl text-white ${
                    item.color.toLowerCase() === currentColor.color.toLowerCase()
                      ? 'block'
                      : 'hidden'
                  }`}
                />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default ThemeSettings;

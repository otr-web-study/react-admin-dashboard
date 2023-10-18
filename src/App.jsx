import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Tooltip } from 'antd';
import './App.css';
import { Navbar, Sidebar, ThemeSettings } from './components';
import {
  ECommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Rose,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  ColorPicker,
  Editor,
  Line,
} from './pages';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, screenSize } =
    useStateContext();

  return (
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-[1000]">
          <Tooltip title="Settings" placement="top" color="#555555">
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl text-white rounded-full"
              style={{ backgroundColor: currentColor.color }}
              onClick={() => setThemeSettings(true)}
            >
              <FiSettings />
            </button>
          </Tooltip>
        </div>
        <div
          data-active={activeMenu}
          className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-[10001] data-[active='false']:-translate-x-full transition-all duration-300"
        >
          <Sidebar />
        </div>
        <div
          data-menu-screen={activeMenu && screenSize <= 900}
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-[calc(100%-18rem)] data-[menu-screen='true']:w-full ${
            activeMenu ? '900:ml-72' : 'flex-2'
          } `}
        >
          <div className="fixed 900:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            <ThemeSettings open={themeSettings} onClose={() => setThemeSettings(false)} />
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<ECommerce />} />
              <Route path="/ecommerce" element={<ECommerce />} />
              {/* Orders */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              {/* Apps */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              {/* Charts */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/rose" element={<Rose />} />
              <Route path="/stacked" element={<Stacked />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

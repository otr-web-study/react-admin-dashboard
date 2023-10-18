import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) setActiveMenu(false);
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 transition-colors duration-300';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 hover:bg-light-gray dark:hover:bg-main-dark-bg m-2 transition-colors duration-300';

  return (
    <div className="ml-3 h-screen overflow-auto pb-10 md:hover:overflow-auto md:overflow-hidden">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          onClick={handleCloseSidebar}
          className="items-center flex gap-3 ml-3 mt-4 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <SiShopware />
          <span>Shoppy</span>
        </Link>
        <Tooltip title="Menu" placement="bottom" color="#555555">
          <button
            type="button"
            onClick={() => setActiveMenu((prev) => !prev)}
            className="text-2xl p-3 mt-4 rounded-full text-gray-400 dark:text-gray-300 hover:drop-shadow-xl hover:bg-light-gray dark:hover:bg-main-dark-bg transition-all duration-300 900:hidden"
          >
            <MdOutlineCancel />
          </button>
        </Tooltip>
      </div>
      <div className="mt-10">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
            {item.links.map((link) => (
              <NavLink
                key={`/${link.name}`}
                to={link.name}
                onClick={handleCloseSidebar}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => (isActive ? { backgroundColor: currentColor.color } : {})}
              >
                {link.icon}
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

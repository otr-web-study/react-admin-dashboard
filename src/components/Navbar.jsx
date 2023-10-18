import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Tooltip, Popover } from 'antd';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom" color="#555555">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray dark:hover:dark:bg-secondary-dark-bg transition-colors duration-300"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      ></span>
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor: { color, secondColor },
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="relative flex justify-between p-2 md:mx-6">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prev) => !prev)}
        color={color}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color={color}
          icon={<FiShoppingCart />}
        />
        <Popover
          trigger="click"
          open={isClicked.chat}
          onOpenChange={() => handleClick('chat')}
          content={<Chat onClose={() => handleClick('chat')} />}
        >
          <NavButton
            title="Chat"
            dotColor={color}
            customFunc={() => handleClick('chat')}
            color={color}
            icon={<BsChatLeft />}
          />
        </Popover>
        <Popover
          trigger="click"
          placement="bottomRight"
          open={isClicked.notification}
          onOpenChange={() => handleClick('notification')}
          content={<Notification onClose={() => handleClick('notification')} />}
        >
          <NavButton
            title="Notifications"
            dotColor={secondColor}
            customFunc={() => handleClick('notification')}
            color={color}
            icon={<RiNotification3Line />}
          />
        </Popover>
        <Popover
          trigger="click"
          placement="bottomRight"
          open={isClicked.userProfile}
          onOpenChange={() => handleClick('userProfile')}
          content={<UserProfile onClose={() => handleClick('userProfile')} />}
        >
          <Tooltip title="Profile" placement="bottom" color="#555555">
            <button
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray dark:hover:bg-secondary-dark-bg rounded-lg transition-colors duration-300"
              // onClick={() => handleClick('userProfile')}
            >
              <img src={avatar} alt="avatar" className="rounded-full h-8 w-8" />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">Michael</span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </button>
          </Tooltip>
        </Popover>

        <Cart open={isClicked.cart} onClose={() => handleClick('cart')} />
      </div>
    </div>
  );
};

export default Navbar;

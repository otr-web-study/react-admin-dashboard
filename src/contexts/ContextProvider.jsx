import { createContext, useContext, useState, useEffect } from 'react';
import { themeColors } from '../data/dummy';
import { applyStyle } from '../utils/rootStyle';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState();
  const [currentColor, setCurrentColor] = useState(() =>
    localStorage.getItem('colorMode')
      ? JSON.parse(localStorage.getItem('colorMode'))
      : themeColors[0],
  );
  const [currentMode, setCurrentMode] = useState(
    () => localStorage.getItem('themeMode') || 'Light',
  );
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);

    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (colorMode) => {
    setCurrentColor(colorMode);

    localStorage.setItem('colorMode', JSON.stringify(colorMode));
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  useEffect(() => {
    applyStyle('--accent', currentColor.color);
    applyStyle('--accentSecondary', currentColor.secondColor);
  }, [currentColor]);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        screenSize,
        setScreenSize,
        handleClick,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

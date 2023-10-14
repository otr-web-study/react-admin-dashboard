import { ConfigProvider, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { useStateContext } from '../contexts/ContextProvider';

const AntdConfigProvider = ({ children }) => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: currentColor.color.toLowerCase(),
          colorLink: currentColor.color.toLowerCase(),
          colorBgBase: currentMode === 'Light' ? '#fff' : '#20232A',
          colorBgContainer: currentMode === 'Light' ? '#fff' : '#33373E',
          colorTextBase: currentMode === 'Light' ? '#000' : '#E5E7EB',
          colorBgElevated: currentMode === 'Light' ? '#fff' : '#33373E',
        },
        algorithm: currentMode === 'Light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;

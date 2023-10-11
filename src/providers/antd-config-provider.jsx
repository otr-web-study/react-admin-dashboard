import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { useStateContext } from '../contexts/ContextProvider';

const AntdConfigProvider = ({ children }) => {
  const { currentColor } = useStateContext();

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: currentColor.toLowerCase(), colorLink: '#03c9d7' } }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;

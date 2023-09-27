import { ConfigProvider } from 'antd';

const AntdConfigProvider = ({ children }) => {
  return <ConfigProvider theme={{ token: { colorPrimary: '#03c9d7' } }}>{children}</ConfigProvider>;
};

export default AntdConfigProvider;

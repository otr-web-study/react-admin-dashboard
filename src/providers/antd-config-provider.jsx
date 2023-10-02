import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

const AntdConfigProvider = ({ children }) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#03c9d7', colorLink: '#03c9d7' } }}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;

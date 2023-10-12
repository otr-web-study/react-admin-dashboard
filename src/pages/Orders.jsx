import { Table } from 'antd';
import { ordersData, ordersGrid } from '../data/dummy';
import { Header, PageContainer } from '../components';

const Orders = () => {
  return (
    <PageContainer>
      <Header category="Page" title="Orders" />
      <Table
        columns={ordersGrid}
        dataSource={ordersData}
        rowKey="OrderID"
        pagination={{ position: ['', 'bottomLeft'] }}
        scroll={{ x: 900 }}
      />
    </PageContainer>
  );
};

export default Orders;

import { Table } from 'antd';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Customers = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{ position: ['', 'bottomLeft'] }}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default Customers;

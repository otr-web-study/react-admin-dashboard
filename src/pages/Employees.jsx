import { useMemo } from 'react';
import { Table } from 'antd';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { useColumnSearchProps } from '../hooks/useColumnSearchProps';
import { getKeyedData } from '../utils/getKeyedData';

const searchableCollumns = [
  { title: 'Employee', dataIndex: 'Name' },
  { title: 'Designation', dataIndex: 'Title' },
];

const Employees = () => {
  const { setColumnSearchProps } = useColumnSearchProps();
  const data = useMemo(() => getKeyedData(employeesData), []);

  const columns = useMemo(() => setColumnSearchProps(employeesGrid, searchableCollumns), []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
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

export default Employees;

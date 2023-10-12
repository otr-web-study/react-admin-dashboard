import { useMemo } from 'react';
import { Table } from 'antd';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header, PageContainer } from '../components';
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
    <PageContainer>
      <Header category="Page" title="Employees" />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{ position: ['', 'bottomLeft'] }}
        scroll={{ x: 900 }}
      />
    </PageContainer>
  );
};

export default Employees;

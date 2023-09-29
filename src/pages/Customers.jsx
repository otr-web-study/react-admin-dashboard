import { useState } from 'react';
import { Form, Table } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { useColumnEditableProps } from '../hooks/useColumnEditableProps';

const numericalColumns = ['Weeks'];

const Customers = () => {
  const [data, setData] = useState(customersData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { columns, EditableCell, form, cancel } = useColumnEditableProps(
    customersGrid,
    numericalColumns,
    data,
    setData,
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleDelete = () => {
    setData(data.filter((row) => !selectedRowKeys.includes(row.CustomerID)));
    setSelectedRowKeys([]);
  };

  return (
    <div className="flex flex-col m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <button
        className="flex items-center gap-2 p-2 text-gray-600 self-start transition-colors duration-300 hover:text-accent disabled:text-gray-400"
        disabled={!hasSelected}
        onClick={handleDelete}
      >
        <RiDeleteBinLine />
        Delete
      </button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          rowKey="CustomerID"
          pagination={{ position: ['', 'bottomLeft'], onChange: cancel }}
          scroll={{ x: 900 }}
        />
      </Form>
    </div>
  );
};

export default Customers;

import { useState } from 'react';
import { Form, Input, InputNumber, Table, Typography } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Customers = () => {
  const [data, setData] = useState(customersData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

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

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.CustomerID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.CustomerID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.CustomerID);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    ...customersGrid,
    {
      title: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="[not(disabled)]:">
            <Typography.Link
              onClick={() => save(record.CustomerID)}
              style={{ marginRight: 8 }}
              rootClassName="!text-accent hover:!text-accent-dark"
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel} rootClassName="!text-accent hover:!text-accent-dark">
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            data-disabled={editingKey !== ''}
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            rootClassName="data-[disabled='false']:!text-accent data-[disabled='false']:hover:!text-accent-dark"
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'Weeks' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
          columns={mergedColumns}
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

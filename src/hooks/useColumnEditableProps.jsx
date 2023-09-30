import { useState } from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';

export const useColumnEditableProps = (initialColumns, numericColumns, data, setData) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  if (!numericColumns) numericColumns = [];

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

  const extColumns = [
    ...initialColumns,
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
              rootClassName="!text-gray-600 hover:!text-accent"
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel} rootClassName="!text-gray-600 hover:!text-accent">
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            data-disabled={editingKey !== ''}
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            rootClassName="data-[disabled='false']:!text-gray-600 data-[disabled='false']:hover:!text-accent"
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const columns = extColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: numericColumns.includes(col.dataIndex) ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return { columns, EditableCell, form, cancel };
};

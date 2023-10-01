import { Form, Input } from 'antd';

const NewCalendarEventForm = ({ form }) => {
  return (
    <Form form={form}>
      <Form.Item name="Subject" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="Location" label="Location">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default NewCalendarEventForm;

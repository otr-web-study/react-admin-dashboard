import { Form, Input, TimePicker, DatePicker, ColorPicker } from 'antd';
import dayjs from 'dayjs';

const rules = [{ required: true }];
const timeFormat = 'HH:mm';

const NewCalendarEventForm = ({ form, type, day }) => {
  return (
    <Form form={form} labelCol={{ span: 4 }}>
      <Form.Item name="Subject" label="Title" rules={rules}>
        <Input />
      </Form.Item>
      <Form.Item name="Location" label="Location" rules={rules}>
        <Input />
      </Form.Item>
      {type === 'year' && (
        <Form.Item
          name="DayStart"
          label="Event date"
          rules={rules}
          initialValue={day.startOf('day')}
        >
          <DatePicker allowClear={false} />
        </Form.Item>
      )}
      <Form.Item
        name="StartTime"
        label="From"
        colon={true}
        rules={rules}
        initialValue={dayjs().startOf('h')}
      >
        <TimePicker format={timeFormat} allowClear={false} />
      </Form.Item>
      <Form.Item
        name="EndTime"
        label="To"
        rules={rules}
        initialValue={dayjs().add(1, 'h').startOf('h')}
      >
        <TimePicker format={timeFormat} allowClear={false} />
      </Form.Item>
      <Form.Item name="CategoryColor" label="Color" rules={rules} initialValue="#03c9d7">
        <ColorPicker />
      </Form.Item>
    </Form>
  );
};

export default NewCalendarEventForm;

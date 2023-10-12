import { useState } from 'react';
import { Badge, Calendar as AntCalendar, Popover, Modal } from 'antd';
import dayjs from 'dayjs';
import { CiEdit } from 'react-icons/ci';
import { CalendarEventCard, NewCalendarEventForm, Header, PageContainer } from '../components';
import { scheduleData } from '../data/dummy';
import { useForm } from 'antd/es/form/Form';

const Calendar = () => {
  const [data, setData] = useState(scheduleData);
  const [selectedDate, setSelectedDate] = useState(dayjs().endOf('month'));
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [calendarMode, setCalendarMode] = useState('month');
  const [form] = useForm();

  const getListData = (value, type) => {
    const filterFunc = ({ StartTime }) =>
      type === 'date'
        ? new Date(StartTime).getDate() === value.date() &&
          value.month() === new Date(Date.now()).getMonth()
        : new Date(StartTime).getMonth() === value.month();

    return data.filter(filterFunc);
  };

  const handleDeleteEvent = (eventId) => setData(data.filter((item) => item.Id !== eventId));

  const handleAddNewEvent = () => {
    form.validateFields().then((values) => {
      const day = values.DayStart ? values.DayStart : dayjs().startOf('day');
      setData([
        ...data,
        {
          Id: crypto.randomUUID(),
          Subject: values.Subject,
          Location: values.Location,
          CategoryColor: values.CategoryColor.toHexString(),
          StartTime: day
            .add(values.StartTime.hour(), 'hour')
            .add(values.StartTime.minute(), 'minute')
            .toISOString(),
          EndTime: day
            .add(values.EndTime.hour(), 'hour')
            .add(values.EndTime.minute(), 'minute')
            .toISOString(),
        },
      ]);
      form.resetFields();
      setNewEventOpen(false);
    });
  };

  const cellRender = (current, info) => {
    if (!['date', 'month'].includes(info.type)) return info.originNode;

    const listData = getListData(current, info.type);
    return (
      <Popover
        content={() => (
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-accent transition-colors duration-300"
            onClick={() => setNewEventOpen(true)}
          >
            <CiEdit />
            Add event
          </button>
        )}
        placement="bottom"
        open={current.format() === selectedDate.format() && !newEventOpen}
      >
        <div className="relative h-full grid grid-cols-1">
          <ul className="events">
            {listData.map((item) => (
              <li key={item.Id}>
                <Popover
                  content={<CalendarEventCard event={item} onDelete={handleDeleteEvent} />}
                  trigger="hover"
                >
                  <Badge color={item.CategoryColor} text={item.Subject} />
                </Popover>
              </li>
            ))}
          </ul>
        </div>
      </Popover>
    );
  };

  const handleSelect = (value) => setSelectedDate(value);

  return (
    <PageContainer>
      <Header category="App" title="Calendar" />
      <AntCalendar
        cellRender={cellRender}
        onSelect={handleSelect}
        onPanelChange={(_, mode) => setCalendarMode(mode)}
        mode={calendarMode}
      />
      <Modal
        title="Add new event"
        open={newEventOpen}
        onCancel={() => setNewEventOpen(false)}
        onOk={handleAddNewEvent}
        centered
        okText="Save"
      >
        <NewCalendarEventForm form={form} type={calendarMode} day={selectedDate} />
      </Modal>
    </PageContainer>
  );
};

export default Calendar;

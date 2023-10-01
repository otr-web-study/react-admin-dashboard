import { useState } from 'react';
import { Badge, Calendar as AntCalendar, Popover, Modal } from 'antd';
import dayjs from 'dayjs';
import { CiEdit } from 'react-icons/ci';
import { CalendarEventCard, NewCalendarEventForm, Header } from '../components';
import { scheduleData } from '../data/dummy';
import { useForm } from 'antd/es/form/Form';

const Calendar = () => {
  const [data, setData] = useState(scheduleData);
  const [selectedDate, setSelectedDate] = useState(dayjs().endOf('month'));
  const [newEventOpen, setNewEventOpen] = useState(false);
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

  const handleAddNewEvent = () => {};

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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <AntCalendar cellRender={cellRender} onSelect={handleSelect} />
      <Modal
        title="Add new event"
        open={newEventOpen}
        onCancel={() => setNewEventOpen(false)}
        centered
        okButtonProps={{ className: 'bg-accent' }}
        okText="Save"
      >
        <NewCalendarEventForm form={form} />
      </Modal>
    </div>
  );
};

export default Calendar;

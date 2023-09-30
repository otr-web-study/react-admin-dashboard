import { useState } from 'react';
import { Badge, Calendar as AntCalendar, Popover } from 'antd';
import dayjs from 'dayjs';
import { Header } from '../components';
import { CalendarEventCard } from '../components';
import { scheduleData } from '../data/dummy';

const Calendar = () => {
  const [data, setData] = useState(scheduleData);
  const [selectedDate, setSelectedDate] = useState(dayjs().endOf('month'));

  const getListData = (value, type) => {
    const filterFunc = ({ StartTime }) =>
      type === 'date'
        ? new Date(StartTime).getDate() === value.date() &&
          value.month() === new Date(Date.now()).getMonth()
        : new Date(StartTime).getMonth() === value.month();

    return data.filter(filterFunc);
  };

  const handleDeleteEvent = (eventId) => setData(data.filter((item) => item.Id !== eventId));

  const cellRender = (current, info) => {
    if (!['date', 'month'].includes(info.type)) return info.originNode;

    const listData = getListData(current, info.type);
    return (
      <div className="relative">
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
        <button className="absolute top-0 left-0">add</button>
      </div>
    );
  };

  const handleSelect = (value) => setSelectedDate(value);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <AntCalendar cellRender={cellRender} onSelect={handleSelect} />
    </div>
  );
};

export default Calendar;

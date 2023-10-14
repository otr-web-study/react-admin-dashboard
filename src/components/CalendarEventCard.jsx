import { Typography } from 'antd';
import { formatTime } from '../utils/format';
import { RiDeleteBinLine } from 'react-icons/ri';

const CalendarEventCard = ({ event, onDelete }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3
        className="font-bold border-b-2 w-[max-content]"
        style={{ borderBottomColor: event.CategoryColor }}
      >
        {event.Subject}
      </h3>
      <p>
        <span className="font-bold mr-1">Location:</span>
        <span>{event.Location}</span>
      </p>
      <p>
        <span className="font-bold mr-1">From:</span>
        <span>{formatTime(new Date(event.StartTime))}</span>
        <span className="font-bold mx-1">to:</span>
        <span>{formatTime(new Date(event.EndTime))}</span>
      </p>
      <Typography.Link
        onClick={() => onDelete(event.Id)}
        rootClassName="!text-gray-600 hover:!text-accent dark:!text-gray-300 dark:hover:!text-accent !self-center !flex !items-center !gap-1"
      >
        <RiDeleteBinLine />
        Delete
      </Typography.Link>
    </div>
  );
};

export default CalendarEventCard;

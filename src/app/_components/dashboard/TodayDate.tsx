'use client';

import dayjs from 'dayjs';

const TodayDate = () => {
  return <div className="text-gray-400">{dayjs().format('dddd, MMM D, YYYY')}</div>;
};

export default TodayDate;

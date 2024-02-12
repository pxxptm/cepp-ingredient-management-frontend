import React, { useState } from 'react';
import './Clock.css';

const Clock = () => {
  let time = new Date().toLocaleTimeString();
  var [CurrentTime, setCurrentTime] = useState(time);

  let date = new Date();
  let day_of_week = date.getDay();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  const Day_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const Month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
    CurrentTime = CurrentTime.toString();
  };

  setInterval(updateTime, 1000);

  return (
    <div id="clock">
      {CurrentTime} , {Day_of_week[day_of_week]} {day} {Month[month]} {year}
    </div>
  );
};

export default Clock;

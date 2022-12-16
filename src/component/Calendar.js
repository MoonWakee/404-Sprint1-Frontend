import React, { useState } from "react";
import "devextreme/dist/css/dx.light.css";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import authHeader from "../utils/authHeader";

let schedules = [
  // {
  //   text: 'Website Re-Design Plan',
  //   startDate: new Date('2022-11-13T16:30:00.000Z'),
  //   endDate: new Date('2022-11-13T18:30:00.000Z'),
  // }, {
  //   text: 'Book Flights to San Fran for Sales Trip',
  //   startDate: new Date('2022-11-15T19:00:00.000Z'),
  //   endDate: new Date('2022-11-15T20:00:00.000Z'),
  //   allDay: true,
  // }
];

const addSchedule = async (
  schedule_name,
  start_time,
  end_time,
  description,
  all_day,
  recurrence_rule,
  meta_data
) => {
  try {
    let res = await fetch("http://127.0.0.1:5000/api/schedule/", {
      method: "POST",
      headers: {
        ...authHeader(),
        Accept: "application/json",
      },
      body: JSON.stringify({
        schedule_name: schedule_name,
        start_time: start_time,
        end_time: end_time,
        description: description,
        all_day: all_day,
        recurrence_rule: recurrence_rule,
        meta_data: meta_data
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchSchedule = async () => {
  // navigate("/AddSchedulePage", { replace: true });
  try {
    let res = await fetch("http://127.0.0.1:5000/api/schedule/", {
      method: "GET",
      headers: {
        ...authHeader(),
        Accept: "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const getData = async () => {
}

const onAppointmentAdding = (e) => {
  console.log(e)
  var words = JSON.stringify(e.appointmentData.startDate);
  var meta_data = words + ';'
  var date = words.substring(1, 11);
  var time = words.substring(12, 20);
  const start_time = date + " " + time;

  words = JSON.stringify(e.appointmentData.endDate);
  meta_data = meta_data + words
  date = words.substring(1, 11);
  time = words.substring(12, 20);
  const end_time = date + " " + time;

  var description = JSON.stringify(e.appointmentData.description);
  description = description.substring(1, description.length - 1);
  var schedule_name = JSON.stringify(e.appointmentData.text);
  schedule_name = schedule_name.substring(1, schedule_name.length - 1);
  var all_day = e.appointmentData.allDay
  var recurrence_rule = JSON.stringify(e.appointmentData.recurrenceRule)
  recurrence_rule = recurrence_rule.substring(1, recurrence_rule.length -1)
  console.log(meta_data)
  addSchedule(schedule_name, start_time, end_time, description, all_day, recurrence_rule, meta_data)
};

const onAppointmentUpdating = (e) => {
  fetchSchedule();
  //console.log(e)
  // var words = JSON.stringify(e.appointmentData.startDate)
  // var date = words.substring(1, 11)
  // var time = words.substring(12, 20)
  // const start_time = date + ' ' + time

  // words = JSON.stringify(e.appointmentData.endDate)
  // date = words.substring(1, 11)
  // time = words.substring(12, 20)
  // const end_time = date + ' ' + time

  // const description = JSON.stringify(e.appointmentData.description)
  // const schedule_name = JSON.stringify(e.appointmentData.text)

  //addSchedule(schedule_name, start_time, end_time, description)
};

class Calendar extends React.Component {
  render() {
    return (
      <div className="Calendar">
        <Scheduler
          defaultCurrentView="week"
          height={870}
          startDayHour={9}
          dataSource={getData}
          onAppointmentAdding={onAppointmentAdding}
          onAppointmentUpdating={onAppointmentUpdating}
        ></Scheduler>
      </div>
    );
  }
}

export default Calendar;

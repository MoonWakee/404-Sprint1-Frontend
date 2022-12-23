import React, { useState } from "react";
import "devextreme/dist/css/dx.light.css";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import authHeader from "../utils/authHeader";

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
    //console.log(err);
  }
};
const fetchSchedule = async () => {
  try {
    let res = await fetch("http://127.0.0.1:5000/api/schedule/", {
      method: "GET",
      headers: {
        ...authHeader(),
        Accept: "application/json",
      },
    });
    let data = await res.json();
    //console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getData = () => {
  var promise = fetchSchedule().then(function(res) {
    console.log(res)
    var schedules = []
    res.forEach(el => {
      var times = el.meta_data.split(';')
      var startTime = times[0]
      var endTime = times[1]
      
      schedules.push({
        text: el.schedule_name,
        description: el.description,
        startTime: startTime,
        endTime: endTime,
        recurrenceRule: el.recurrence_rule,
        allDay: el.all_day
      })
    });
    console.log(schedules)
    return schedules
  })
  return promise
}


const onAppointmentAdding = (e) => {
  //console.log(e)
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
  if (description == undefined) description = null;
  else description = description.substring(1, description.length - 1);
  var schedule_name = JSON.stringify(e.appointmentData.text);
  if (schedule_name == undefined) return 
  else schedule_name = schedule_name.substring(1, schedule_name.length - 1);
  var all_day = e.appointmentData.allDay
  var recurrence_rule = JSON.stringify(e.appointmentData.recurrenceRule)
  if (recurrence_rule == undefined) recurrence_rule = null;
  else recurrence_rule = recurrence_rule.substring(1, recurrence_rule.length -1)
  //console.log(schedule_name, start_time, end_time, description, all_day, recurrence_rule, meta_data)
  addSchedule(schedule_name, start_time, end_time, description, all_day, recurrence_rule, meta_data)
};

const onAppointmentUpdating = (e) => {
  //fetchSchedule();
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

  constructor() {
    super();
    this.state = { isLoading: true, schedules: false };
  }

  componentDidMount() {
    getData().then(response => {
      this.setState({schedules: response})
      this.setState({ isLoading: false });
    });
  }
  
  render() {
    const { isLoading, schedules } = this.state;
    console.log(schedules)
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    return (
      <div className="Calendar">
        <Scheduler
          defaultCurrentView="week"
          height={870}
          startDayHour={9}
          dataSource={schedules}
          onAppointmentAdding={onAppointmentAdding}
          onAppointmentUpdating={onAppointmentUpdating}
        ></Scheduler>
      </div>
    );
  }
}

export default Calendar;

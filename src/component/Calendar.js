import React, { useState } from 'react' 
import 'devextreme/dist/css/dx.light.css';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import authHeader from '../utils/authHeader';

let data = [
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
]

const addSchedule = async (schedule_name, start_time, end_time, description) => {
  // navigate("/AddSchedulePage", { replace: true });

  try {
    let res = await fetch("http://127.0.0.1:5000/api/schedule/", {
      method: "POST",
      headers: {
        ...authHeader(), 
        Accept: 'application/json',
    },
      body: JSON.stringify({
        schedule_name: schedule_name,
        start_time: start_time,
        end_time: end_time,
        description: description
     }),
    });
  } catch (err) {
    console.log(err);
  }
};

const onAppointmentAdding = (e) => {
  var words = JSON.stringify(e.appointmentData.startDate)
  var date = words.substring(1, 11)
  var time = words.substring(12, 20)
  const start_time = date + ' ' + time

  words = JSON.stringify(e.appointmentData.endDate)
  date = words.substring(1, 11)
  time = words.substring(12, 20)
  const end_time = date + ' ' + time

  const description = JSON.stringify(e.appointmentData.description)
  const schedule_name = JSON.stringify(e.appointmentData.text)
  
  addSchedule(schedule_name, start_time, end_time, description)
};

class Calendar extends React.Component {
    render() {
      return (
        <div className='Calendar'>
        <Scheduler
          defaultCurrentView="week"
          height={870}
          startDayHour={9}
          dataSource = {data}
          onAppointmentAdding={onAppointmentAdding}
          onAppointmentUpdating={onAppointmentAdding}
          >
        </Scheduler>
        </div>
      );
    }
  }

  export default Calendar
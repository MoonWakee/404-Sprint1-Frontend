import React, { useState } from 'react' 
import 'devextreme/dist/css/dx.light.css';
import Scheduler, {Resource} from 'devextreme-react/scheduler';

let data = [
    {
      text: 'I',
      startDate: new Date('2022-11-13T16:30:00.000Z'),
      endDate: new Date('2022-11-13T18:30:00.000Z'),
    }, {
      text: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date('2022-11-15T19:00:00.000Z'),
      endDate: new Date('2022-11-15T20:00:00.000Z'),
      allDay: true,
    }
]

class Calendar extends React.Component {
    render() {
      return (
        <div className='Calendar'>
        <Scheduler
          defaultCurrentView="week"
          height={870}
          startDayHour={9}
          dataSource = {data}
          >
        </Scheduler>
        </div>
      );
    }
  }

  export default Calendar
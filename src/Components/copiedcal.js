// import React, { useState } from 'react' 
// import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   WeekView,
//   Appointments,
//   AppointmentForm,
//   AppointmentTooltip,
//   AllDayPanel,
// } from '@devexpress/dx-react-scheduler-material-ui';import '../Cal.css';


// export default class Calendar extends React.PureComponent{
    
//     constructor(props) {
//         super(props);
//         this.state = {
//           data: {'name': 'harry'}
//         };
    
//         this.commitChanges = this.commitChanges.bind(this);
//       }
    
//       commitChanges({ added, changed, deleted }) {
//         this.setState((state) => {
//           let { data } = state;
//           if (added) {
//             const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
//             data = [...data, { id: startingAddedId, ...added }];
//           }
//           if (changed) {
//             data = data.map(appointment => (
//               changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
//           }
//           if (deleted !== undefined) {
//             data = data.filter(appointment => appointment.id !== deleted);
//           }
//           return { data };
//         });
//       }
    
//       render() {
//         const { currentDate, data } = this.state;
    
//         return (
//             <Scheduler
//             //   data={data}
//             height={860}
//             >
//               <ViewState
//               />
//               <EditingState
//                 onCommitChanges={this.commitChanges}
//               />
//               <IntegratedEditing />
//               <WeekView
//                 startDayHour={9}
//                 endDayHour={23}
//               />
//               <Appointments />
//               <AppointmentTooltip
//                 showOpenButton
//                 showDeleteButton
//               />
//               <AppointmentForm />
//               <AllDayPanel />

//             </Scheduler>
//         );
//       }
// }

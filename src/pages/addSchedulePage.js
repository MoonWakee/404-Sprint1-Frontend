import React from "react";
import Button from "../component/button";
import ScheduleForm from "../component/scheduleForm";


class AddSchedulePage extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <ScheduleForm name = "Mon" />
                    <ScheduleForm name = "Tue" />
                    <ScheduleForm name = "Wed" />
                    <ScheduleForm name = "Thu" />
                    <ScheduleForm name = "Fri" />
                    <ScheduleForm name = "Sat" />
                    <ScheduleForm name = "Sun" />
                </div>
                <div>
                    <Button buttonLabel = "Save"/>
                </div>
            </div>
        )
    }
}

export default AddSchedulePage
import Button from "./button"
import { useState } from "react"

const Schedule = () => {
    return (
        <div> 
            <form>
                <div>
                    <label>
                        Title
                    </label>
                    <input 
                        className="input" 
                        type="text"
                        name = "type"
                        />
                    <div>
                        Time
                    </div>
                    <label>
                        Start Time
                    </label>
                    <input 
                        type = "time"
                    />
                    <label>
                        End Time
                    </label>
                    <input 
                        type = "time"
                    />
                </div>
            </form>
        </div>
        
    )
}

const AddScheduleButton = () => {
    const handleClick = () => {
        return (
            <div>
                <Schedule/>
                <AddScheduleButton/>    
            </div>
        );
    }
    return (
        <Button buttonLabel = "add" />   
    )
}



const ScheduleForm = (props) => {
    const [scheduleList, setScheduleList] = useState([{ schedule: ""}]);


    return (
        <div>
            <div>
                {props.name}
            </div>
        </div>
    )
}
export default ScheduleForm
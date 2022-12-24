import logo from "./logo.svg";
import "./App.css";
import { Page } from "./chrome/Page";
import Sidebar from "./component/Sidebar";
import Calendar from "./component/Calendar";
import { useState, useEffect } from "react";
import authHeader from "./utils/authHeader";

const CalendarForm = () => {
  const [groupSchedule, setGroupSchedule] = useState([]);
  const [group, setGroup] = useState();

  const selectGroup = async (group) => {
    setGroup(group);
  };

  useEffect(() => {
    const fetchGroupSchedule = async () => {
      try {
        console.log({ group });
        const headers = {
          ...authHeader(),
          Accept: "application/json",
        };
        let res = await fetch(
          "https://8getlh855i.execute-api.us-west-2.amazonaws.com/api/schedule/group/" + group.group_id,
          {
            method: "GET",
            headers: headers,
          }
        );
        res = await res.json();
        processGroupSchedule(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroupSchedule();
  }, [group]);

  const processGroupSchedule = (res) => {
    let schedules = [];
    res.forEach((el, index) => {
      let startTime = new Date(el.start_time);
      let endTime = new Date(el.end_time);

      schedules.push({
        text: el.schedule_name,
        description: el?.description,
        startDate: startTime,
        endDate: endTime,
        rRule: el?.recurrence_rule === 0 ? undefined : el.recurrence_rule,
        allDay: el.all_day,
        id: el.uuid,
        color: "red[500]",
      });
    });
    setGroupSchedule(schedules);
  };

  return (
    <div className="App">
      <div className="flex">
        <Sidebar selectGroup={selectGroup} />
        <div className="grid place-items-center h-screen">
          <Calendar groupSchedule={groupSchedule} />
        </div>
      </div>
    </div>
  );
};

export const CalendarPage = () => (
  <Page title="Calendar" maxWidth="xl">
    <CalendarForm />
  </Page>
);

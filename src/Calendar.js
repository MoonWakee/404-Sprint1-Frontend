import logo from "./logo.svg";
import "./App.css";
import { Page } from "./chrome/Page";
import Sidebar from "./component/Sidebar";
import Calendar from "./component/Calendar";

const CalendarForm = () => {
  return (
    <div className="App">
      <div className="flex">
        <Sidebar />
        <div className="grid place-items-center h-screen">
          <Calendar />
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

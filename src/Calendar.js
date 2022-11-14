import logo from './logo.svg';
import './App.css';
import { Page } from './chrome/Page';
import Sidebar from './component/Sidebar';
import Calendar from './component/Calendar';

const CalendarForm = () => {
    
    return <div className="App">
      <div className='container'>
        <Sidebar />
        <Calendar />
      </div>
    </div>;
}

export const CalendarPage = () => (
    <Page title="Calendar" maxWidth="xl">
      <CalendarForm />
    </Page>
  );
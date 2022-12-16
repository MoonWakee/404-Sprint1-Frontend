import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import logo from './logo.svg';
import './App.css';
import SignUpForm from './signup';
import AddSchedulePage from './pages/addSchedulePage';
import { AddGroupPage } from './addGroup';
import {BrowserRouter as Router, Routes , Route, useParams} from 'react-router-dom';
import {LoginPage} from './login';
import {SignUpPage} from './signup';
import {CalendarPage} from './Calendar';
import ListGroupPage from './pages/listGroup';
import GroupPage from './pages/groupPage';


function App() {
  return(
    <Router>
        <Routes>
          <Route path = "/" element = {<LoginPage/>} />
          <Route path = "/calendar" element = {<CalendarPage/>} />
          <Route path = "/signup" element = {<SignUpPage/>} />
          <Route path="/AddSchedulePage" element = {<AddSchedulePage /> } />
          <Route path="/addGroup" element = {< AddGroupPage /> } />
          <Route path="/group/:id" element = {< GroupPage/> } />
          <Route path="/listGroup" element = { <ListGroupPage/> } />
        </Routes>
    </Router>
  );
}

export default App;

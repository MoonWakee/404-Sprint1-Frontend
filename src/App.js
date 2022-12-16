import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import logo from './logo.svg';
import './App.css';
import SignUpForm from './signup';
import AddSchedulePage from './pages/addSchedulePage';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import {LoginPage} from './login';
import {SignUpPage} from './signup';
import {CalendarPage} from './Calendar';


function App() {
  return(
    <Router>
        <Routes>
          <Route path = "/" element = {<LoginPage/>} />
          <Route path = "/calendar" element = {<CalendarPage/>} />
          <Route path = "/login" element = {<SignUpPage/>} />
          <Route path="/AddSchedulePage" element = {<AddSchedulePage /> } />
        </Routes>
    </Router>
  );
}

export default App;

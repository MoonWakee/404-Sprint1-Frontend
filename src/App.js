import './App.css';
import SignUpForm from './signup';
import AddSchedulePage from './pages/addSchedulePage';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import CreateGroup from './pages/Groups/addGroup';
import LoginForm from './pages/login';


function App() {
  return(
    <Router>
        <Routes>
          <Route path = "/" element = {<LoginForm/>} />
          <Route path = "/Signup" element = {<SignUpForm/>} />
          <Route path="/AddSchedulePage" element = {<AddSchedulePage /> } />
          <Route path= "/CreateGroup" element = {<CreateGroup/>}/>
        </Routes>
    </Router>
  );
}

export default App;

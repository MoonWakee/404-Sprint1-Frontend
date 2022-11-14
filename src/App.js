import logo from './logo.svg';
import './App.css';
import SignUpForm from './signup';
import AddSchedulePage from './pages/addSchedulePage';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import CreateGroup from './pages/addGroup';


function App() {
  return(
    <Router>
        <Routes>
          <Route path = "/" element = {<SignUpForm/>} />
          <Route path = "/Login" element = {<LoginForm/>} />
          <Route path="/AddSchedulePage" element = {<AddSchedulePage /> } />
          <Route path= "/CreateGroup" element = {<CreateGroup/>}/>
        </Routes>
    </Router>
  );
}

export default App;

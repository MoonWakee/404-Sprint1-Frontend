import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Calendar from './Components/Calendar';

function App() {
    
    return <div className="App">
      <div className='container'>
        <Sidebar />
        <Calendar />
      </div>
    </div>;
}

export default App;

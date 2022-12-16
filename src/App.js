import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import logo from "./logo.svg";
import "./App.css";
import SignUpForm from "./signup";
import AddSchedulePage from "./pages/addSchedulePage";
import { ListGroupPage } from "./pages/listGroup";
import { AddGroupPage } from "./addGroup";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { SignUpPage } from "./signup";
import { CalendarPage } from "./Calendar";
import { EditGroupPage } from "./pages/editGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/AddSchedulePage" element={<AddSchedulePage />} />
        <Route path="/AddGroupPage" element={<AddGroupPage />} />
        <Route path="/listGroup" element={<ListGroupPage />} />
        <Route path="/group/:groupid" element={<EditGroupPage />} />
      </Routes>
    </Router>
  );
}

export default App;

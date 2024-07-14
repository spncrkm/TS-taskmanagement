import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AuthGuard from "./components/AuthGuard";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={<AuthGuard component={Dashboard} />}
          />
          <Route path="/add-task" element={<AuthGuard component={AddTask} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

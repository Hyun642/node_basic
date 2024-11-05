import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LangdingPage from "./components/views/LandingPage/LangdingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">
              <LangdingPage />
            </Link>
          </li>
          <li>
            <Link to="/loginPage">loginPage</Link>
          </li>
          <li>
            <Link to="/RegisterPage">RegisterPage</Link>
          </li>
        </ul>
        <hr />
        <Routes>
          <Route path="/" element={<LangdingPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/RegisterPage" element={<RegisterPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

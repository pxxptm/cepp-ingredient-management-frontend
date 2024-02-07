import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "./page/HomePage.js";
import LoginPage from './page/LoginPage.js';
import UserRegisterPage from './page/UserRegisterPage.js';
import FeaturePage from "./page/FeaturePage.js";


function App() {
  <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/feature" element={<FeaturePage/>}/>
          <Route path="/user-register" element={<UserRegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
}

export default App;

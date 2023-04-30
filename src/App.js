import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { languages } from "./components/Home";

import "./App.css";
import TheNav from "./components/Navbar";
import TheFooter from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TheNav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* Add more routes as needed */}
        </Routes>
        <TheFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

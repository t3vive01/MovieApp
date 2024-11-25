import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { About, Contact, Home } from "./components/pages";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

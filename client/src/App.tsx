import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Showtimes, Contact, Home } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showtimes" element={<Showtimes/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes> 
    </div>
  );
}

export default App;
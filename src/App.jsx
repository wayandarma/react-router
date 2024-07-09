// IMPROTANT IMPORT
import "./App.css";
import { Route, Routes } from "react-router-dom";

// COMPONENT
import Home from "./components/home";
import AboutUs from "./components/about";
import Users from "./components/users";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/user" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

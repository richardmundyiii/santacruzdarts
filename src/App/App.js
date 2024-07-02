import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

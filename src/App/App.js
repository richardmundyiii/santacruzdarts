import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../components/Footer/Footer";
import AdminPage from "../pages/AdminPage/AdminPage";
import "./App.css";

function App() {
  const location = useLocation();

  function handleRenderNav() {
    return !location.pathname.includes("/admin");
  }

  return (
    <div className="App">
      {handleRenderNav() && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {handleRenderNav() && <Footer />}
    </div>
  );
}

export default App;

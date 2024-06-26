import { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Header";
import { Dashboard } from "./pages/Dashboard";
import { Contact } from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardForm } from "./components/DashboardForm";
import "./styles/styles.css"; 
import Login from "./pages/Login";
import { toast } from "react-toastify";
import Footer from "./components/Footer";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Optionally, you can add a toast notification for logout success
    toast.success("Logged out successfully");
  };
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout}/>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
          />
         {isLoggedIn && isAdmin && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<DashboardForm />} />
              <Route path="/update/:id" element={<DashboardForm />} />
            </>
          )}
          
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;

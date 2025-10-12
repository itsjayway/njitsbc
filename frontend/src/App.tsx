import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Pages/Landing";
import ClipApproval from "./components/Pages/ClipApproval";
import Spots from "./components/Pages/Spots";
import About from "./components/Pages/About/About";
import Navbar from "./components/Pages/components/Navbar";
import Footer from "./components/Pages/components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/approval" element={<ClipApproval />} />
            <Route path="/about" element={<About />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;

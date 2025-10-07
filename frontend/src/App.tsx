import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import Landing from "./Landing";
import ClipApproval from "./components/Clip/ClipApproval";

function App() {
  const isAuthenticated = useIsAuthenticated();
  console.log("User is authenticated:", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/approval" element={<ClipApproval />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

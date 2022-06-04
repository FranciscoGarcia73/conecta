import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";

export const AppRouters = () => {
  const [token, setToken] = useState("");
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/*" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </div>
  );
};

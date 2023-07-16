import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="workouts" element={<Workouts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

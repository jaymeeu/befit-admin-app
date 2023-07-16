import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

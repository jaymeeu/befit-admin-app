import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import { Amplify, Auth, DataStore, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import Login from "./pages/Login";
import { User } from "./models";

Amplify.configure(awsconfig);

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(null);

  const checkuser = async () => {
    await Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(async (currentUser) => {
        if (currentUser?.attributes?.sub) {
          try {
            const users = await DataStore.query(User, (user) =>
              user.sub.eq(currentUser?.attributes?.sub)
            );
            if (users[0]?.sub && users[0]?.isAdmin) {
              setisLoggedIn(true);
            } else {
              setisLoggedIn(false);
            }
          } catch (error) {
            setisLoggedIn(false);
          }
        }
      })
      .catch(() => {
        setisLoggedIn(false);
      });
  };

  useEffect(() => {
    checkuser();

    // Auth.signOut()
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="" element={<Navigate to="users" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;

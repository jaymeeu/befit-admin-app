import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import { Amplify, Auth, DataStore, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import { User } from "./models";
import {
  Authenticator,
  Image,
  Text,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from './assets/logo.png'
Amplify.configure(awsconfig);

const App = () => {


  const [user, setuser] = useState('')

  const checkuser = async (data) => {
    if (data?.attributes?.sub) {
      try {
        const users = await DataStore.query(User, (user) =>
          user.sub.eq(data?.attributes?.sub)
        );
        if (users[0]?.sub && users[0]?.isAdmin) {
          setuser(users[0])

        } else {
          showNotAdminToast();
          await Auth.signOut();
        }
      } catch (error) {
        showNotAdminToast();
          await Auth.signOut();
      }
    }
  };

  const showNotAdminToast = () => {
    toast.error("Unauthorized, only admin user can have access!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "light",
    });
  };

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          checkuser(data);
          break;
        case "signOut":
          console.log("signed out");
          break;
        case "customOAuthState":
          console.log("dont know");
      }
    });

    return unsubscribe;
  }, []);

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View
          textAlign="center"
          marginTop={tokens.space.xxl}
          padding={tokens.space.large}
        >
          <Image
          style={{width:120}}
            alt="Befit logo"
            src={logo}
          />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  };

  return (
    <BrowserRouter>
      
        {/* {isLoggedIn ? ( */}
        <Authenticator hideSignUp={true} components={components}>
          <Layout user={user}>
            <Routes>
              <Route path="" element={<Navigate to="users" replace />} />
              <Route path="users" element={<Users />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
          </Layout>
        </Authenticator>
     

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;

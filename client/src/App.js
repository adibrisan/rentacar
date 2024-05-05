import React from "react";
import { Spin } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import usePersistUser from "./hooks/usePersistUser";
import useUserStore from "./store/useUserStore";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CredentialsPage from "./pages/LoginPage/CredentialsPage";
import TestFeature from "./pages/TestFeature/TestFeature";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  const { isLoadingUserData } = useUserStore();
  // console.log(isLoadingUserData);
  usePersistUser();
  return (
    <Router>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/signin" element={<CredentialsPage />} />
          <Route path="/test" element={<TestFeature />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

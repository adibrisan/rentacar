import React from "react";
import { Alert } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import usePersistUser from "./hooks/usePersistUser";
import useUserStore from "./store/useUserStore";
import useErrorHandlingStore from "./store/useErrorHandlingStore";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CredentialsPage from "./pages/CredentialsPage/CredentialsPage";
import TestFeature from "./pages/TestFeature/TestFeature";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import { TOAST_CONFIG } from "./utils/appConstants";
import styles from "./App.module.css";

function App() {
  const { isLoadingUserData } = useUserStore();
  const { isError, setIsError } = useErrorHandlingStore();
  // console.log(isLoadingUserData);
  usePersistUser();
  return (
    <Router>
      {isError.isError && (
        <Alert
          description={`${isError.errorMessage}`}
          banner
          closable
          type="error"
          message="Error"
          showIcon
          onClose={() => setIsError({ isError: false, errorMessage: "" })}
          className={styles.errorBanner}
        />
      )}
      <Toaster toastOptions={TOAST_CONFIG} />
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/signin" element={<CredentialsPage />} />
          <Route path="/signup" element={<CredentialsPage />} />
          <Route path="/forgot-password" element={<CredentialsPage />} />
          <Route path="/test" element={<TestFeature />} />
          <Route path="/car-details/:carId" />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;

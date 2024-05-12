import React from "react";
import { Alert, Spin } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import usePersistUser from "./hooks/usePersistUser";
import useUserStore from "./store/useUserStore";
import useErrorHandlingStore from "./store/useErrorHandlingStore";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import CredentialsPage from "./pages/CredentialsPage/CredentialsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CartPage from "./pages/CartPage/CartPage";
import NotFound from "./pages/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import { TOAST_CONFIG } from "./utils/appConstants";
import toast from "react-hot-toast";
import styles from "./App.module.css";

function App() {
  const { isLoadingUserData, currentUser } = useUserStore();
  const { isError, setIsError } = useErrorHandlingStore();
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
          <Route
            path="/profile"
            element={
              !currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Spin spinning={isLoadingUserData}>
                  <ProfilePage />
                </Spin>
              )
            }
          />
          <Route path="/car-details/:carId" element={<CarDetailsPage />} />

          <Route
            path="/cart"
            element={
              !currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Spin spinning={isLoadingUserData}>
                  <CartPage />
                </Spin>
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;

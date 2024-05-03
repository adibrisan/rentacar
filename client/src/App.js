import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestFeature from "./pages/TestFeature/TestFeature";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/test" element={<TestFeature />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

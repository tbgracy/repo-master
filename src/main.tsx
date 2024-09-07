import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./screens/App";
import { Layout } from "./screens/Layout";
import { LandingPage } from "./screens/LandingPage";

import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/app" element={<App />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

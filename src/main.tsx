import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./screens/App";
import { Layout } from "./screens/Layout";
import { LandingPage } from "./screens/LandingPage";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/app" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

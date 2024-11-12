import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

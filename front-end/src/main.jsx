import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js"
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter "/COOL">
      <App />
      </BrowserRouter>
    </ThemeProvider > 
  </StrictMode>
);

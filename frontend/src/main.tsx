import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import {Toaster} from "react-hot-toast";

axios.defaults.baseURL ="http://localhost:5000/api/v1";
axios.defaults.withCredentials = true; // Enable sending cookies with requests

const theme = createTheme({
  typography: {
    fontFamily: "Merienda, sans-serif",
    allVariants: {
      color: "#333",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center"/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
    
  </StrictMode>
);

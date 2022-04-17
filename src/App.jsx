import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Button, Container, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CreatePage from "./components/CreatePage";
import ImportPage from "./components/ImportPage";
import WalletProvider from "./context/WalletContext";
import HomePage from "./components/HomePage";
import SendPage from "./components/SendPage";

function App() {
  return (
    <div
      className="df fdc"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/create" element={<CreatePage />}></Route>
            <Route path="/import" element={<ImportPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/send" element={<SendPage />}></Route>
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </div>
  );
}

export default App;

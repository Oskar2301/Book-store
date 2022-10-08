import React from "react";
import "./firebase";

//styles
import "./App.scss";

//components
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { FullBook } from "./components/Fullbook";
import { LoginPage } from "./pages/Auntification/Login";
import { RegisterPage } from "./pages/Auntification/Register";
import { Profile } from "./pages/Profile";
import { NotFound } from "./components/notFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<FullBook />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

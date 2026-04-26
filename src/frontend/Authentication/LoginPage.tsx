import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function loginPage() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <main className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex justify-center items-center">
        {register ? (
          <RegistrationForm setRegister={setRegister} />
        ) : (
          <LoginForm setRegister={setRegister} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default loginPage;

import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function loginPage() {
  const [register, setRegister] = useState(false);
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

import { useState } from "react";
import LoginForm from "../components/page-components/LoginForm";
import SignupOtp from "../components/page-components/SignupOtp";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleForms = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-2 flex justify-center items-center h-[40rem] ">
      {isOpen ? (
        <LoginForm toggleForms={toggleForms} isOpen={isOpen} />
      ) : (
        <SignupOtp toggleForms={toggleForms} isOpen={isOpen} />
      )}
    </div>
  );
};

export default Login;

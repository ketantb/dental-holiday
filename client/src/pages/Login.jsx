import LoginForm from "../components/page-components/LoginForm";
import OtpPopup from "../components/page-components/OtpPopup";

const Login = ({ toggleForms, isOpen }) => {
  return (
    <div className="border-2">
      {isOpen ? (
        <LoginForm toggleForms={toggleForms} isOpen={isOpen} />
      ) : (
        <OtpPopup toggleForms={toggleForms} isOpen={isOpen} />
      )}
    </div>
  );
};

export default Login;

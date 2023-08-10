import LoginForm from "../components/page-components/LoginForm";

const Login = ({ togglePopup, isOpen }) => {
  return <LoginForm togglePopup={togglePopup} isOpen={isOpen} />;
};

export default Login;

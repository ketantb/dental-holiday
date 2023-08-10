import Navbar from "../components/app-components/Navbar";
import Footer from "../components/app-components/Footer";
import { Outlet } from "react-router-dom";

const Main = ({ togglePopup, isOpen }) => {
  return (
    <div>
      <Navbar togglePopup={togglePopup} isOpen={isOpen} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;

import { useState } from "react";
import Navbar from "../components/app-components/Navbar";
import Footer from "../components/app-components/Footer";
import { Outlet } from "react-router-dom";

const Main = ({ togglePopup, isOpen }) => {
  const [auth, setAuth] = useState(null);

  return (
    <div>
      <Navbar
        togglePopup={togglePopup}
        isOpen={isOpen}
        auth={auth}
        setAuth={setAuth}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;

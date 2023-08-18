import { useState } from "react";
import Navbar from "../components/app-components/Navbar";
import Footer from "../components/app-components/Footer";
import { Outlet } from "react-router-dom";

const Main = ({ toggleForms, isOpen }) => {
  const [auth, setAuth] = useState(null);

  return (
    <div>
      <Navbar
        toggleForms={toggleForms}
        isOpen={isOpen}
        auth={auth}
        setAuth={setAuth}
      />
      <div style={{ backgroundColor: "#fdf1f6" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

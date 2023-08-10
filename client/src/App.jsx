import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccountDetails from "./pages/AccountDetails";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Main togglePopup={togglePopup} isOpen={isOpen} />}>
          <Route path="/" element={<Home />}></Route>
          {/* <Route
            path="/account-login"
            element={<Login togglePopup={togglePopup} />}
          ></Route> */}
          {/* <Route
            path="/account-details-form"
            element={<AccountDetails />}
          ></Route> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

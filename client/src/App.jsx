import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccountDetails from "./pages/AccountDetails";
import HospitalList from "./pages/HospitalsList";
import HotelsList from "./pages/HotelsList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleForms = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Main toggleForms={toggleForms} isOpen={isOpen} />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/account-login"
            element={<Login toggleForms={toggleForms} />}
          ></Route>
          <Route
            path="/account-details-form"
            element={<AccountDetails />}
          ></Route>
          <Route
            path="/hospitals-list/:city/:state"
            element={<HospitalList />}
          ></Route>
          <Route
            path="/hotels-list/:city/:state"
            element={<HotelsList />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

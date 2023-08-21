import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccountDetails from "./pages/AccountDetails";
import HospitalList from "./pages/HospitalsList";
import HotelsList from "./pages/HotelsList";
import Activity from "./pages/Activity";
import ConfirmPackageDetails from "./pages/ConfirmPackageDetails";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/account" element={<Login />}></Route>
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
          <Route
            path="/select-activity/:city/:state"
            element={<Activity />}
          ></Route>
          <Route
            path="/package-details"
            element={<ConfirmPackageDetails />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

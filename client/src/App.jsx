import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./layout/Main";
import Home from "./pages/Home";
import AccountDetails from "./pages/AccountDetails";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/account-details" element={<AccountDetails />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

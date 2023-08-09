import { useState } from "react";
import SetupPassword from "../components/page-components/SetupPassword";
import DetailsFrom from "../components/page-components/DetailsForm";

const AccountDetails = () => {
  const [passwordBox, setPasswordBox] = useState(true);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {passwordBox ? (
        <SetupPassword />
      ) : (
        <DetailsFrom setPasswordBox={setPasswordBox} />
      )}
    </div>
  );
};

export default AccountDetails;

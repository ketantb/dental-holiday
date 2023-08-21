import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PackageDetails from "../components/page-components/PackageDetails";

const ConfirmaccountData = () => {
  const navigate = useNavigate();
  const [editStatus, setEditStatus] = useState(false);
  const accountData = useSelector((state) => state.account_details);

  useEffect(() => {
    if (!accountData.length) {
      navigate("/account-details-form");
    }
  }, [accountData]);

  if (!accountData.length) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <PackageDetails
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        accountData={accountData}
      />
    </div>
  );
};
export default ConfirmaccountData;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HospitalsList = () => {
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.get_account_details);
  useEffect(() => {
    if (!accountData) {
      navigate("/account-details-form");
    }
  }, [accountData]);

  console.log("data details", accountData);
  if (!accountData) {
    return <div>Redirecting...</div>;
  }
  return (
    <div>
      <h1>
        Search hospitals in
        <span> {accountData.travelDetails.city}</span>,
        <span> {accountData.travelDetails.state}</span>
      </h1>
      <button
        className="border-2 bg-blue-300 p-3 rounded-md"
        onClick={() => navigate("/hotels-list")}
      >
        Check Hotels
      </button>
    </div>
  );
};

export default HospitalsList;

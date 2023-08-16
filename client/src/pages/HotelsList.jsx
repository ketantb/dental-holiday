import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HospitalsList = () => {
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.account_details);
  console.log("data details", accountData);

  useEffect(() => {
    if (!accountData) {
      navigate("/account-details-form");
    }
  }, [accountData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!accountData) {
    return <div>Redirecting...</div>;
  }
  return (
    <div>
      <h1>
        Search hotels to stay in
        <span> {accountData.travelDetails.city}</span>,
        <span> {accountData.travelDetails.state}</span>
      </h1>
      <button
        className="border-2 bg-blue-300 p-3 rounded-md"
        onClick={() => navigate("/select-activity")}
      >
        Next
      </button>
    </div>
  );
};

export default HospitalsList;

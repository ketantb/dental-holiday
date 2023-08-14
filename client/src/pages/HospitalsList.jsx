import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const HospitalsList = () => {
  const { city, state } = useParams();
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.get_account_details);
  useEffect(() => {
    if (!accountData) {
      navigate("/account-details-form");
    }
  }, [accountData]);

  // if page is refreshed or account data=null redirect to form to fill details again
  if (!accountData) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>
        Search hospitals in
        <span> {city}</span>,<span> {state}</span>
      </h1>
      <button
        className="border-2 bg-blue-300 p-3 rounded-md"
        onClick={() => {
          navigate(`/hotels-list/${city}/${state}`);
        }}
      >
        Check Hotels
      </button>
    </div>
  );
};

export default HospitalsList;

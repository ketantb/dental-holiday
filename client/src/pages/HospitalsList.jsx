import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Import the FaTimes icon from FaIcons set

import { doctors } from "../data/doctors";
import { addHospital } from "../store/slices/accountDetailsSlice";
import HospitalDoctorCard from "../components/page-components/HospitalDoctorCard";

const HospitalsList = () => {
  const { city, state } = useParams();
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.account_details);
  console.log("package details", accountData);

  useEffect(() => {
    if (!accountData.length) {
      navigate("/account-details-form");
    }
  }, [accountData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // add doctor and hospital details on book appoitment click
  const [oppoitmentClick, setOppoitmentClick] = useState(false);
  const [hospital, setHospital] = useState({});

  // handle proceed
  const dispatch = useDispatch();
  const handleProceed = () => {
    const hospitalData = {
      hospital: hospital,
    };
    dispatch(addHospital(hospitalData));
    navigate(`/hotels-list/${city}/${state}`);
  };

  // if page is refreshed or account data is null redirect to the form to fill details again
  if (!accountData.length) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="p-4">
      <p className="text-gray-400 text-sm">
        Do not refresh page or do not go back
      </p>
      {oppoitmentClick && (
        <div className="fixed bottom-10 right-10 bg-white border-[1px] border-blue-900  shadow-2xl rounded-sm w-[20rem] p-3 text-black pb-3">
          <p className="flex justify-between border-b-[0.5px] pb-2">
            <span>Your Hospital</span>
            <FaTimes
              onClick={() => {
                setOppoitmentClick(false);
                setHospital({});
              }}
            />
          </p>
          <p className="pt-2">
            <span className="font-bold">Hospital : </span>
            {hospital.hospital}
          </p>
          <p className="pt-2">
            <span className="font-bold">Doctor: </span>
            {hospital.name}
          </p>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleProceed}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      <h1 className="mt-2 text-lg">
        Search hospitals in
        <span> {city}</span>,<span> {state}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-5">
        {doctors.map((data, i) => {
          return (
            <HospitalDoctorCard
              key={i}
              index={i}
              data={data}
              doctors={doctors}
              setOppoitmentClick={setOppoitmentClick}
              oppoitmentClick={oppoitmentClick}
              setHospital={setHospital}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HospitalsList;

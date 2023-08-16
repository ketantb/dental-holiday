import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { indianStates } from "../../data/states&cities";
import { treatments } from "../../data/treatments";

import axios from "../../axios";
import { toast } from "react-hot-toast";
import { getAccountDetails } from "../../store/slices/accountDetailsSlice";

function DetailsForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  const [numPatients, setNumPatients] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const token = localStorage.getItem("token");

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedCity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      travelDetails: {
        state: selectedState,
        city: selectedCity,
      },
      treatmentDetails: {
        numTravelers: numTravelers,
        numPatients: numPatients,
        treatmentType: treatmentType,
        treatmentDate: treatmentDate,
      },
    };
    try {
      toast.loading("Searching for hospitals");
      // const resp = await axios.post("/account-form-details", data, {
      //   headers: {
      //     authorization: token,
      //   },
      // });
      toast.dismiss();
      navigate(`/hospitals-list/${selectedCity}/${selectedState}`);
      dispatch(getAccountDetails(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="w-full p-10 flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Travel and Treatment Information
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State:
            </label>
            <select
              id="state"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City:
            </label>
            <select
              id="city"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 disabled:cursor-not-allowed"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {selectedState &&
                indianStates
                  .find((state) => state.name === selectedState)
                  ?.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="numTravelers"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Travelers:
            </label>
            <input
              type="number"
              id="numTravelers"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="numPatients"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Patients:
            </label>
            <input
              type="number"
              id="numPatients"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={numPatients}
              onChange={(e) => setNumPatients(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="treatmentType"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Treatment:
            </label>
            <select
              id="treatmentType"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
            >
              <option value="">Select Treatment Type</option>
              {treatments.map((treatment, i) => {
                return (
                  <option value={treatment.title} key={i + 1}>
                    {treatment.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="treatmentData"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              id="treatmentDate"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={treatmentDate}
              onChange={(e) => setTreatmentDate(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={
                selectedCity === "" ||
                selectedState === "" ||
                numTravelers == "" ||
                numPatients === "" ||
                treatmentType === "" ||
                treatmentDate === ""
              }
              className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 disabled:cursor-not-allowed"
            >
              Search Hospitals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DetailsForm;

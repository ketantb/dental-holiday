import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

import { indianStates } from "../../data/states&cities";
import { treatments } from "../../data/treatments";

import Tooltip from "@mui/material/Tooltip";

const PackageDetails = ({ editStatus, setEditStatus, accountData }) => {
  console.log(accountData);

  const [formData, setFormData] = useState({
    numTravelers: accountData[0]?.treatmentDetails.numTravelers,
    numPatients: accountData[0]?.treatmentDetails.numPatients,
    treatmentType: accountData[0]?.treatmentDetails.treatmentType,
    treatmentDate: accountData[0]?.treatmentDetails.treatmentDate,
    doctorName: accountData[1]?.hospital.name,
    hospitalName: accountData[1]?.hospital.hospital,
    hotelName: accountData[2]?.hotel.name,
    hotelAddr: accountData[2]?.hotel.address,
  });

  //set state and city details in form inputs
  const [selectedState, setSelectedState] = useState(
    accountData[0]?.travelDetails.state
  );
  const [selectedCity, setSelectedCity] = useState(
    accountData[0]?.travelDetails.city
  );
  const [cities, setCities] = useState([]);
  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
  };
  useEffect(() => {
    const stateData = indianStates.find(
      (state) => state.name === selectedState
    );
    setCities(stateData?.cities);
  }, [handleStateChange]);

  // handle inputs
  const handleInputs = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //set activities
  const activityArr = accountData[3].activities;

  // handle confirm
  const handleConfirm = () => {
    const data = {
      ...formData,
      city: selectedCity,
      state: selectedState,
    };
    console.log(data);
  };

  return (
    <div className="p-2 pb-10 md:w-[80%] m-auto">
      <div className="flex justify-between p-4">
        <h1>PACKAGE DETAILS</h1>
        <Tooltip title="Edit">
          <button>
            <MdOutlineModeEdit />
          </button>
        </Tooltip>
      </div>

      <div className="mt-5 bg-white px-2 rounded-md space-y-2 py-6 md:grid grid-cols-2 ">
        {/* col1 */}
        {/* travel details */}
        <div className="space-y-10 border-r-[1px] px-5">
          <div>
            <h1 className="font-bold">TRAVEL DETAILS</h1>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
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
                  City
                </label>
                <select
                  id="city"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 disabled:cursor-not-allowed"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  // disabled={!selectedState}
                >
                  <option value="">Select City</option>
                  {cities.map((city, i) => (
                    <option key={i} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* treament details */}
          <div className="space-y-2">
            <h1 className="font-bold">TREATMENT DETAILS</h1>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                numTravelers
              </label>
              <input
                type="text"
                name="numTravelers"
                value={formData.numTravelers}
                onChange={handleInputs}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                numPatients
              </label>
              <input
                type="text"
                name="numPatients"
                value={formData.numPatients}
                onChange={handleInputs}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
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
                name="treatmentType"
                value={formData.treatmentType}
                onChange={handleInputs}
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
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                treatmentDate
              </label>
              <input
                type="date"
                name="treatmentDate"
                value={formData.treatmentDate}
                onChange={handleInputs}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
          </div>
        </div>
        {/* col2 */}
        <div className="space-y-10  px-5">
          {/* hospital details */}
          <div>
            <h1 className="font-bold">HOSPITAL DETAILS</h1>
            <div className="space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  hospitalName
                </label>
                <input
                  type="text"
                  value={formData.hospitalName}
                  disabled
                  className="disabled:cursor-not-allowed  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  doctorName
                </label>
                <input
                  type="text"
                  value={formData.doctorName}
                  disabled
                  className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
            </div>
          </div>

          {/* hotel details */}
          <div>
            <h1 className="font-bold">HOTEL DETAILS</h1>
            <div className="space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  hotelName
                </label>
                <input
                  type="text"
                  value={formData.hotelName}
                  disabled
                  className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  hotelAddr
                </label>
                <input
                  type="text"
                  value={formData.hotelAddr}
                  disabled
                  className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
            </div>
          </div>

          {/* activity details */}
          <div>
            <h1 className="font-bold">ACTIVITY DETAILS</h1>
            <div className="border-2 mt-5">
              <table className="w-full ">
                <thead className="border-b-[1px] bg-slate-400">
                  <tr>
                    <th className="px-2 py-2 text-left border-r-[1px]">
                      City name
                    </th>
                    <th className="px-2 py-2 text-left">Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {activityArr?.map((objData, i) => {
                    return (
                      <tr key={i} className="border-b-[1px]">
                        <td className="py-6 pl-3">{objData.cityName}</td>
                        <td className="border-l-[1px]">
                          {objData.activities.map((ele, j) => {
                            return (
                              <li key={j} className="pl-3">
                                {ele}
                              </li>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleConfirm}
          className="bg-blue-200 rounded-md w-full md:w-1/2 m-auto mt-2 h-[2rem] cursor-pointer"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;

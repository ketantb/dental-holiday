import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { FaTimes } from "react-icons/fa"; // Import the FaTimes icon from FaIcons set
import { toast } from "react-hot-toast";
import { addActivity } from "../../store/slices/accountDetailsSlice";

const SelectActivityCard = ({ state, indianStates }) => {
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.account_details);
  console.log("package details", accountData);

  useEffect(() => {
    if (!accountData.length) {
      navigate("/account-details-form");
    }
  }, [accountData]);
  const citiesData = indianStates.find((findState) => {
    if (findState.name === state) {
      return findState;
    }
  });
  const cities = citiesData.cities;

  // handle add activity
  const [activityData, setActivityData] = useState([]);
  const [added, setAdded] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddActivity = (i, j) => {
    setOpenPopup(true);
    const selectedCity = cities[i].name;
    const selectedActivity = cities[i].activities[j];
    const existingCityIndex = activityData.findIndex(
      (obj) => obj.cityName === selectedCity
    );
    if (existingCityIndex !== -1) {
      // City exists, push the new activity to its activities array
      activityData[existingCityIndex].activities.push(selectedActivity);
      setAdded(true);
    } else {
      // City doesn't exist, create a new object
      const newCityObj = {
        cityName: selectedCity,
        activities: [selectedActivity],
      };

      activityData.push(newCityObj);
    }
    console.log(activityData);
  };

  //handle proceed
  const dispatch = useDispatch();
  const handleProceed = () => {
    const activityObj = { activities: activityData };
    dispatch(addActivity(activityObj));
    navigate("/package-details");
  };

  return (
    <div className="shadow-lg p-4 bg-white rounded-2xl mt-5">
      {openPopup && (
        <div className="fixed bottom-10 right-10 bg-white border-[1px] border-blue-900  shadow-2xl rounded-sm w-[20rem] p-3 text-black pb-3">
          <p className="flex justify-between border-b-[0.5px] pb-2">
            <span>Your Activities</span>
            <FaTimes
              onClick={() => {
                setOpenPopup(false);
              }}
            />
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
      <div className="flex flex-col gap-8">
        {cities.map((city, i) => {
          return (
            <section key={i} className="">
              <h1 className="flex gap-2">
                <IoMdArrowDropright className="mt-2 text-gray-400 text-md" />
                <span className="text-xl">{city.name}</span>
              </h1>
              <section className="flex flex-col gap-2 mt-3">
                {city?.activities.map((activity, j) => {
                  return (
                    <p
                      onClick={() => handleAddActivity(i, j)}
                      key={j}
                      className="flex justify-between gap-5 rounded-md w-[70%] border-[1px] p-2"
                    >
                      <span>{activity}</span>
                      <AiOutlinePlus className="mt-1" />
                    </p>
                  );
                })}
              </section>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default SelectActivityCard;

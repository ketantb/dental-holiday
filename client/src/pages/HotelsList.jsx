import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Import the FaTimes icon from FaIcons set

import { hotels } from "../data/hotels";
import { addHotel } from "../store/slices/accountDetailsSlice";
import HotelCard from "../components/page-components/HotelCard";

const HotelsList = () => {
  const { city, state } = useParams();
  const navigate = useNavigate();
  const accountData = useSelector((state) => state.account_details);
  console.log("accountData", accountData);

  // useEffect(() => {
  //   if (!accountData.length) {
  //     navigate("/account-details-form");
  //   }
  // }, [accountData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // add doctor and hotel details on book appoitment click
  const [bookNowClick, setBookNowClick] = useState(false);
  const [hotel, setHotel] = useState({});

  // handle proceed
  const dispatch = useDispatch();
  const handleProceed = () => {
    const hotelData = {
      hotel: hotel,
    };
    dispatch(addHotel(hotelData));
    navigate(`/hotels-list/${city}/${state}`);
  };

  // if page is refreshed or account data is null redirect to the form to fill details again
  // if (!accountData) {
  //   return <div>Redirecting...</div>;
  // }

  return (
    <div className="p-4">
      {bookNowClick && (
        <div className="fixed bottom-10 right-10 bg-white border-[1px] border-blue-900  shadow-2xl rounded-sm w-[20rem] h-auto p-3 text-black pb-3">
          <p className="flex justify-between border-b-[0.5px] pb-2">
            <span>Your Hotel</span>
            <FaTimes
              onClick={() => {
                setBookNowClick(false);
                setHotel({});
              }}
            />
          </p>
          <p className="pt-2">
            <span className="font-bold">Hotel : </span>
            {hotel.name}
          </p>
          <p className="pt-2">
            <span className="font-bold">Address: </span>
            {hotel.address}
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

      <h1>
        Search hotels in
        <span> {city}</span>,<span> {state}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-5">
        {hotels.map((data, i) => {
          return (
            <HotelCard
              key={i}
              index={i}
              data={data}
              hotels={hotels}
              hotel={hotel}
              setHotel={setHotel}
              setBookNowClick={setBookNowClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HotelsList;

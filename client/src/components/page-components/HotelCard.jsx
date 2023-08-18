import { MdLocationPin } from "react-icons/md";

const HotelCard = ({
  index,
  data,
  hotels,
  hotel,
  setHotel,
  setBookNowClick,
}) => {
  const handleProceed = () => {
    hotels.find((data, i) => {
      if (index === i) {
        console.log(data, i, index);
        setHotel(data);
        setBookNowClick(true);
      }
    });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={data.image}
        alt="loading..."
      />
      <div className="px-2 py-4">
        <div className="font-bold text-xl mb-2">{data.name}</div>
        <p className="text-gray-700 text-base flex">
          <MdLocationPin className="mt-1 text-gray-500 mr-2" />
          <span> {data.address}</span>
        </p>
        <div className="mt-4 flex justify-between ">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Book Rooms
            </label>
            <select className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="flex justify-end items-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleProceed(index)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

import { MdLocationPin } from "react-icons/md";

const HotelCard = () => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        class="w-full h-48 object-cover"
        src="https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU="
        alt="Hotel Image"
      />
      <div class="px-2 py-4">
        <div class="font-bold text-xl mb-2">Lusruco Hotel</div>
        <p class="text-gray-700 text-base flex">
          <MdLocationPin className="mt-1 text-gray-500 mr-2" />
          <span> 123 Main Street, City</span>
        </p>
        <div class="mt-4 flex justify-between ">
          <div>
            <label class="block text-sm font-medium text-gray-400">
              Book Rooms
            </label>
            <select class="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="flex justify-end items-end">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

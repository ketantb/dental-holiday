import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import TopDrawer from "./TopDrawer";
import OtpPopup from "../page-components/OtpPopup";

const Navbar = ({ togglePopup, isOpen }) => {
  const navigate = useNavigate();
  // responsive top drawer
  const [topDrawer, setTopDrawer] = useState(false);

  return (
    <div className="px-6 pt-0 grid grid-cols-2 lg:grid lg:grid-cols-12   ">
      <div className="lg:col-span-3 lg:border-r-2  lg:flex lg:justify-center lg:text-xl lg:px-3 py-4">
        DENTAL HOLIDAY
      </div>
      <div className="hidden lg:col-span-9 text-md h-full lg:flex justify-end gap-2 border-2  ">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
            togglePopup();
          }}
        >
          Login
        </button>
      </div>

      {/* responsive top drawer */}
      <div className="flex justify-end items-center pr-10 lg:hidden ">
        {!topDrawer ? (
          <GiHamburgerMenu
            className="cursor-pointer hover:text-blue-500"
            onClick={() => setTopDrawer(!topDrawer)}
          />
        ) : (
          <IoMdClose
            className="cursor-pointer hover:text-blue-500"
            onClick={() => setTopDrawer(!topDrawer)}
          />
        )}
      </div>
      {topDrawer ? (
        <div>
          <TopDrawer
            topDrawer={topDrawer}
            setTopDrawer={setTopDrawer}
            togglePopup={togglePopup}
          />
        </div>
      ) : null}

      {/* otp popup */}
      {isOpen && <OtpPopup togglePopup={togglePopup} />}
    </div>
  );
};
export default Navbar;

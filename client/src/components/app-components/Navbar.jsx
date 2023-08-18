import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { ImMobile } from "react-icons/im";
import { toast } from "react-hot-toast";
import { navbarMenu } from "../../data/navbar";

import TopDrawer from "./TopDrawer";

const Navbar = ({ togglePopup, isOpen, auth, setAuth }) => {
  const navigate = useNavigate();
  // responsive top drawer
  const [topDrawer, setTopDrawer] = useState(false);

  // set token =>auth
  const token = localStorage.getItem("token");
  useEffect(() => {
    setAuth(token);
  }, [token]);

  return (
    <div className="px-6 pt-0 grid grid-cols-2 lg:grid lg:grid-cols-12   ">
      <div className="lg:col-span-9 lg:flex gap-[3rem] lg:text-xl lg:px-3 py-4 ">
        <h1>DENTAL HOLIDAY</h1>
        <div className="hidden lg:flex gap-10 text-sm  px-1 ">
          {navbarMenu.map((menu, i) => {
            return (
              <button
                key={i + 1}
                onClick={() => {
                  navigate(`${menu.pageLink}`);
                }}
              >
                {menu.title === "Contact" ? null : menu.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="hidden lg:col-span-3 text-md h-full lg:flex justify-center gap-10 items-center  ">
        <div className="flex">
          <ImMobile className="text-3xl  mt-1 text-gray-500" />
          <p className="flex flex-col text-sm  ml-2">
            <span>CONTACT</span>
            <span>+789456123</span>
          </p>
        </div>
        {auth ? (
          <button
            className="cursor-pointer border-[1px] border-blue-400 text-blue-400 w-[5rem] h-[3rem] rounded-md"
            onClick={() => {
              navigate("/");
              localStorage.clear();
              toast.success("Logged out successfully");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="cursor-pointer border-[1px] border-blue-400 text-blue-400 w-[7rem] h-[2.5rem] rounded-md"
            onClick={() => {
              navigate("/account");
            }}
          >
            Login
          </button>
        )}
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
          <TopDrawer topDrawer={topDrawer} setTopDrawer={setTopDrawer} />
        </div>
      ) : null}
    </div>
  );
};
export default Navbar;

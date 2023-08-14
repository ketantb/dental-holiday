import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { navbarMenu } from "../../data/navbar";

const TopDrawer = ({ topDrawer, setTopDrawer, togglePopup }) => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute left-0 top-10 px-5  bg-white w-full h-auto z-50"
      style={{
        boxShadow:
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(255, 255, 255, 0.3) 5px 30px 70px 20px",
      }}
    >
      <ul className="">
        {navbarMenu.map((menu, i) => {
          return (
            <li
              key={i + 1}
              className="leading-[3rem] border-b-[1px]  text-sm capitalize hover:text-green-600"
              onClick={() => {
                navigate(`${menu.pageLink}`);
                setTopDrawer(false);
              }}
            >
              {menu.title}
            </li>
          );
        })}
        <li
          className="leading-[3rem] border-b-[1px]  text-sm capitalize hover:text-green-600"
          onClick={() => {
            navigate("/account-login");
            setTopDrawer(false);
          }}
        >
          Login-Signup
        </li>
      </ul>
    </div>
  );
};

export default TopDrawer;

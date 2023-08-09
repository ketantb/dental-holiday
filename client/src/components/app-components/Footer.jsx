import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { navbarMenu } from "../../data/navbar";
import { treatments } from "../../data/treatments";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className=" bg-black text-white p-4 lg:px-[3rem] lg:py-[3rem] grid  grid-cols-1 lg:grid-cols-4 gap-10 mt-6 ">
      <div className="w-full ">
        <h3 className="text-xl font-bold mb-5">About Us</h3>
        <p className="w-[90%]">
          The dental team at Dental Holiday have performed over 70,000
          procedures since they first opened their doors and these have included
          teeth veneers, small design in a week as well as dental implants.
        </p>
      </div>
      <div className="w-full lg:flex flex-col  items-center">
        <h3 className="text-xl font-bold mb-5">Quick Links</h3>
        <ul>
          {navbarMenu.map((menu, i) => {
            return (
              <li
                className="flex cursor-pointer hover:text-green-600  w-max"
                key={i + 1}
              >
                <IoIosArrowForward className="mt-1 mr-2 " />
                {menu.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full  lg:pl-12">
        <h3 className="text-xl font-bold mb-5">Treatment</h3>
        <ul>
          {treatments.map((treatment, i) => {
            return (
              <li className="flex" key={i + 1}>
                <IoIosArrowForward className="mt-1 mr-2" />
                {treatment.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full ">
        <h3 className="text-xl font-bold mb-5">Get In Touch</h3>
        <p>
          Yıldız, Yıldız Cd. 34353
          <br />
          Beşiktaş İstanbul Turkey
        </p>
        <p>
          United Kingdom Icon
          <br />
          UK Number: 020 7183 8026
          <br />
          Turkey Number: 905546757194
          <br />
          Email: info@dentalholiday.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import {
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";

const ChckOutActivityCard = ({ indianStates }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState("");

  // handle open
  const handleOpen = (statename, i) => {
    console.log(statename, i);
    indianStates.find((obj) => {
      if (obj.name === statename) {
        setOpen(!open);
        setIndex(i);
      }
    });
  };

  return (
    <div className=" grid md:grid-cols-2">
      {indianStates.map((data, i) => {
        return (
          <section key={i} className="p-2 relative">
            <h1
              className="font-bold text-lg flex cursor-pointer "
              onClick={() => handleOpen(data.name, i)}
            >
              <span>{data.name}</span>

              {open && index === i ? (
                <IoMdArrowDropup className="mt-1" />
              ) : (
                <IoMdArrowDropdown className="mt-1" />
              )}
            </h1>
            <div className="absolute bg-white shadow-2xl z-20">
              {open &&
                index === i &&
                data.cities.map((obj, j) => {
                  return (
                    <div key={j} className="mt-4 ">
                      <h3 className="flex  gap-3">
                        <IoMdArrowDropright className="mt-1 text-gray-600 text-xs" />
                        <span className="text-lg">{obj.name}</span>
                      </h3>
                      <ul className="pl-7">
                        {obj.activities?.map((ele, k) => {
                          return (
                            <li key={k} className="text-sm list-disc">
                              {ele}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ChckOutActivityCard;

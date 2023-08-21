import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { indianStates } from "../data/states&cities";
import SelectActivityCard from "../components/page-components/SelectActivityCard";
import ChckOutActivityCard from "../components/page-components/ChckOutActivityCard";

const Activity = () => {
  const { city, state } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="p-4">
      {/* selected city and states */}
      <div className="flex justify-end">
        <button
          className="p-3 px-7 bg-blue-400 text-black rounded-md"
          onClick={() => navigate("/package-details")}
        >
          Next
        </button>
      </div>

      <div className="border-2 mt-2 grid grid-cols-1 md:grid-cols-5 md:gap-[5rem]">
        <section className="col-span-2">
          <h1 className="mt-2 text-lg font-bold ">
            Things To Do In <span> {state}</span>
          </h1>
          <div>
            <SelectActivityCard state={state} indianStates={indianStates} />
          </div>
        </section>
        <section className="col-span-3  md:mt-0">
          <h1 className="mt-2 ">Checkout activity in other states</h1>
          <div>
            <ChckOutActivityCard indianStates={indianStates} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Activity;

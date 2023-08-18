import { FiMapPin, FiBriefcase } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";

const HospitalDoctorCard = ({
  index,
  data,
  doctors,
  oppoitmentClick,
  setOppoitmentClick,
  setHospital,
}) => {
  const handleBookAppoitment = (index) => {
    doctors.find((data, i) => {
      if (index === i) {
        setHospital(data);
        setOppoitmentClick(true);
      }
    });
  };

  return (
    <div className=" border-2  max-w-md bg-white flex flex-col justify-between gap-4">
      <section className="grid grid-rows-1 grid-cols-5 border-b-[1px] pb-4 p-4 ">
        <div className="col-span-2 h-[8rem]  ">
          <img
            src={data.image}
            alt="loading..."
            className="w-full h-full rounded-[50%] shadow-xl border-[1px] border-blue-50"
          />
        </div>
        <div className="pl-5 col-span-3 flex flex-col justify-center items-start gap-3">
          <h5 className="text-lg font-bold">{data.name}</h5>
          <h5 className="flex gap-2 text-gray-600">
            <FiMapPin className="mt-1" />
            <span>{data.hospital}</span>
          </h5>
        </div>
      </section>
      <section className="w-full break-words px-4 flex flex-col justify-start items-start gap-2 min-h-[7rem] max-h-auto">
        <div className="grid grid-cols-10 text-sm text-gray-600 gap-2">
          <FiBriefcase className="col-span-1" />
          <span className="col-span-9 ">{data.experience} years exp</span>
        </div>
        <div className="grid grid-cols-10  text-gray-600 gap-2 ">
          <GiGraduateCap className="col-span-1" />
          <span className="col-span-9 text-xs ">{data.qualifications}</span>
        </div>
      </section>
      <section className=" bg-blue-50 p-2">
        <h6 className="text-gray-400">Available days</h6>
        <div className="flex flex-wrap gap-3 mt-1 text-sm">
          {data?.openDays?.map((day, i) => {
            return <p key={i + 1}>{day}</p>;
          })}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="text-white  text-sm bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              handleBookAppoitment(index);
            }}
          >
            BOOK APPOITMENT
          </button>
        </div>
      </section>
    </div>
  );
};

export default HospitalDoctorCard;

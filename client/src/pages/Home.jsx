import banner from "../assets/banner.png";

const Home = () => {
  return (
    <div className="bg-white  h-[33rem]  w-full relative ">
      <img src={banner} alt="loading..." className="w-full h-full  " />
      <div className="absolute top-[30%] left-[10%] ">
        <h1 className="text-3xl font-bold">BOOK N MEET A DOCTOR !</h1>
        <p className="text-xl mt-5 ">
          Discover the best doctors,clinics & hospitals nearest to you
        </p>
      </div>
    </div>
  );
};

export default Home;

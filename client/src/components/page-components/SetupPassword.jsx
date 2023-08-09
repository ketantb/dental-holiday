import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetupPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
  };

  // show hide password toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Set up password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label>Enter Password</label>
          <div className="border-2 w-full rounded py-1 mt-2">
            <input
              type={showPassword ? "text" : "password"}
              className="px-2 py-1 w-[90%] outline-none  "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />
            <button
              disabled={password === ""}
              className="mr-3 disabled:cursor-not-allowed"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <label>Confirm Password</label>
          <div className="border-2 w-full rounded py-1 mt-2">
            <input
              type={showPassword ? "text" : "password"}
              className="px-2 py-1 w-[90%]  outline-none "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="**********"
            />
            <button
              disabled={confirmPassword === ""}
              className="mr-3 disabled:cursor-not-allowed"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={password === "" || confirmPassword === ""}
            className="bg-green-800 text-white p-2 px-10 rounded-lg cursor-pointer disabled:cursor-not-allowed"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupPassword;

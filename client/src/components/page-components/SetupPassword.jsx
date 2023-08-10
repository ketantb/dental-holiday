import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetupPassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordErrorStyle,
  passwordMatch,
}) => {
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
    <div className="w-full max-w-md p-2 mt-6 bg-white">
      <h2 className="text-lg font-semibold ">Set up password</h2>
      {password === "" && confirmPassword === "" ? (
        <p className="text-red-600 opacity-80 text-sm">
          Please setup password to proceed !
        </p>
      ) : null}
      {passwordMatch ? (
        <p className="text-red-600 text-sm  ">Passwords does not match!</p>
      ) : null}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-2">
          <label>Enter Password</label>
          <div
            className="border-2 w-full rounded py-1 mt-2 flex"
            style={passwordErrorStyle}
          >
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
          <div
            className="border-2 w-full rounded py-1 mt-2 flex"
            style={passwordErrorStyle}
          >
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
      </form>
    </div>
  );
};

export default SetupPassword;

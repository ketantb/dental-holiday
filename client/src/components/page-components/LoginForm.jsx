import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-hot-toast";

function LoginForm({ togglePopup, setAuth }) {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // handle inputs
  const handleInputs = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Logging in...");
      const resp = await axios.post("/account-login", loginForm);
      console.log(resp);
      if (resp.data.success) {
        toast.dismiss();
        navigate("/account-details-form");
        toast.success(resp.data.message);
        localStorage.setItem("token", resp.data.token);
      } else {
        toast.dismiss();
        toast.error(resp.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle login

  return (
    <div className="flex items-center justify-center min-h-[40rem] bg-gray-100">
      <div className="w-[97%] m-auto md:max-w-md p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Account Login </h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleInputs}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400 mb-4"
            required
          />
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleInputs}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 mt-6"
          >
            Login
          </button>
        </form>
        <p className="mt-6">
          Don't have an account ?
          <span
            className="text-blue-500 cursor-pointer ml-2"
            onClick={() => {
              navigate("/");
              togglePopup();
            }}
          >
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

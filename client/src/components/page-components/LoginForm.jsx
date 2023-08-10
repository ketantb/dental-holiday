import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ togglePopup }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-[40rem] bg-gray-100">
      <div className="w-[97%] m-auto md:max-w-md p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Account Login </h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400 mb-4"
            required
          />
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

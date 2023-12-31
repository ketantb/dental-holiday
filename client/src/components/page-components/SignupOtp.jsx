import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import SetupPassword from "./SetupPassword";

const SignupOtp = ({ toggleForms }) => {
  const navigate = useNavigate();
  // SEND OTP
  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [password, setPaswword] = useState("");
  const [confirmPassword, setConfirmPaswword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  //styling when error in form fields
  const passwordErrorStyle = {
    border:
      password !== confirmPassword ? "1px solid red" : "1px solid #D1D1D1",
  };
  // passwords does not match
  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  // handle send otp
  const handleSendOtp = async () => {
    const data = { email: emailInput, password: password };
    try {
      toast.loading("Please check your email for otp...");
      const resp = await axios.post("/send-email", data);
      console.log(resp);
      if (resp.data.success) {
        setOtpInput(true);
        toast.dismiss();
      } else {
        toast.dismiss();
        toast.error(resp.data.message, { autoClose: 5000 });

        if (
          resp.data.message ===
          "Account found but not verified. OTP has been resent. Please check your email"
        ) {
          setResendOtp(true);
        } else if (resp.data.message === "Email already in use. Try to login") {
          toggleForms();
        }
      }
    } catch (err) {
      console.log("catch err", err);
    }
  };

  // handle verify otp
  const handleVerifyOtp = async () => {
    const verifyData = { email: emailInput, otp: otp };
    console.log(verifyData);
    try {
      toast.loading("Verifying OTP...");
      const resp = await axios.post("/verify-otp", verifyData);
      if (resp.data.success) {
        toast.dismiss();
        toast.success(resp.data.message);
        toggleForms();
      } else {
        toast.dismiss();
        toast.error(resp.data.message);
        console.log(resp.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[40rem]  bg-white rounded-xl shadow p-4">
      <div>
        <p>
          <span className="text-xl font-bold mb-4">Have an account ?</span>
          <span
            className="ml-3 text-blue-600 cursor-pointer"
            onClick={() => {
              toggleForms();
            }}
          >
            Login
          </span>
        </p>
      </div>
      <p className="text-sm mt-6">Quick signup using OTP</p>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="w-full px-2 py-2 border-[1px] mt-2 outline-blue-900 border-blue-900 rounded-lg"
      />
      {!otpInput && !resendOtp && (
        <SetupPassword
          password={password}
          setPassword={setPaswword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPaswword}
          passwordErrorStyle={passwordErrorStyle}
          passwordMatch={passwordMatch}
        />
      )}

      {/* otp input for */}
      {(otpInput || resendOtp) && (
        <>
          <p className="text-sm mt-6">Verify OTP</p>
          <input
            type="Number"
            placeholder="OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-2 py-2 border-[1px] mt-2 outline-blue-900 border-blue-900 rounded-lg"
          />
        </>
      )}

      <div className="flex justify-end gap-3">
        {/* conditional rendering button send otp and verify */}
        {otpInput || resendOtp ? (
          <button
            onClick={handleVerifyOtp}
            disabled={otp === ""}
            className="mt-4 bg-green-700 text-white text-sm px-2 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed"
          >
            Verify
          </button>
        ) : (
          <button
            onClick={handleSendOtp}
            disabled={
              emailInput === "" ||
              password.length === 0 ||
              confirmPassword.length === 0 ||
              password !== confirmPassword
            }
            className="mt-4 bg-blue-200 text-black text-sm px-2 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed"
          >
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupOtp;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-hot-toast";

const OtpPopup = ({ togglePopup }) => {
  // const navigate = useNavigate();
  // SEND OTP
  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(false);

  // handle send otp
  const handleSendOtp = async () => {
    const data = { email: emailInput };
    console.log(data);
    try {
      toast.loading("Please check your email for otp...");
      const resp = await axios.post("/send-email", data);
      console.log(resp);
      if (resp.data.success) {
        setOtpInput(true);
        toast.dismiss();
      } else {
        toast.dismiss();
        toast.error(resp.data.message);
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
      console.log(resp);
      if (resp.data.success) {
        toast.dismiss();
        toast.success(resp.data.message);
        // navigate("/account-details");
        togglePopup();
      } else {
        toast.dismiss();
        toast.error(resp.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[40rem]">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white rounded-lg p-6 w-[80%] lg:w-[40%]">
          <h2 className="text-xl font-semibold  text-blue-500">Hello,</h2>
          <p className="text-sm">Quick login using OTP</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-2 py-2 border-[1px] mt-2 outline-blue-900 border-blue-900 rounded-lg"
          />
          {/* otp input for */}
          {otpInput && (
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
            {otpInput ? (
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
                disabled={emailInput === ""}
                className="mt-4 bg-blue-200 text-black text-sm px-2 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            )}

            <button
              onClick={togglePopup}
              className="mt-4 bg-blue-200 text-black text-sm px-2 py-2 rounded-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;

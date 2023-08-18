import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      Activity
      <button
        className="border-2 bg-blue-300 p-3 rounded-md"
        onClick={() => navigate("/final-confirmation")}
      >
        next
      </button>
    </div>
  );
};
export default Activity;

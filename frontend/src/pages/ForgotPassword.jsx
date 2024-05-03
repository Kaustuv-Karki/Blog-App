import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      const data = await response.json();
      localStorage.setItem("resetToken", data.response.resetToken);
      navigate("/resetPassword");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex mx-auto w-[400px] h-[300px] bg-white flex-col items-center justify-center my-[10%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">
        RESET PASSWORD
      </h1>
      <form
        className="mt-8 px-4 py-4 flex flex-col gap-6"
        onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Username
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-[300px] py-2 px-4 bg-[#D6482C] text-white font-semibold rounded-md">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

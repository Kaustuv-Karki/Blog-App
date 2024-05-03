import React, { useState } from "react";
import { resetPasswordValidation } from "../Validations/resetPasswordValidation";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await resetPasswordValidation.validate({
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!isValid) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`/api/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          resetToken: localStorage.getItem("resetToken"),
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Password reset successfully");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
      localStorage.removeItem("resetToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mx-auto w-[400px] h-[400px] bg-white flex-col items-center justify-center my-[10%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">
        RESET PASSWORD
      </h1>
      <form
        className="mt-4 px-4 py-4 flex flex-col gap-6"
        onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Password
          </label>
          <div>
            <input
              className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
              type={passwordType}
              name="passowrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                passwordType === "password"
                  ? setPasswordType("text")
                  : setPasswordType("password")
              }
              className="text-[0.8rem] px-2 py-1 bg-gray-500 text-white font-semibold ml-2">
              Toggle
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="w-full text-[1.15rem] font-semibold text-slate-600">
            Confirm Password
          </label>
          <div>
            <input
              className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
              type={confirmPasswordType}
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                confirmPasswordType === "password"
                  ? setConfirmPasswordType("text")
                  : setConfirmPasswordType("password")
              }
              className="text-[0.8rem] px-2 py-1 bg-gray-500 text-white font-semibold ml-2">
              Toggle
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-[300px] py-2 px-4 bg-[#D6482C] text-white font-semibold rounded-md">
          Reset Password
        </button>
        {error.length > 0 && (
          <p className="text-red-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

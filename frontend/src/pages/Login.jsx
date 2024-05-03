import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../Validations/loginValidation";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await loginValidation.validate(formData);
    if (!isValid) return;
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { user, access_token } = data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mx-auto w-[400px] h-[450px] bg-white flex-col items-center justify-center my-[10%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">LOGIN</h1>
      <p className="text-red-500 font-semibold">
        {error && <span>{error}</span>}
      </p>
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
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600 ">
            Password
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </div>
        <button
          type="submit"
          className="w-[300px] py-2 px-4 bg-[#D6482C] text-white font-semibold rounded-md">
          LOGIN
        </button>
      </form>
      <p>
        No account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-500 underline font-semibold cursor-pointer">
          Make a new Account
        </span>
      </p>
      <p
        className="text-red-500 underline cursor-pointer"
        onClick={() => navigate("/forgotPassword")}>
        Forgot Password
      </p>
    </div>
  );
};

export default Login;

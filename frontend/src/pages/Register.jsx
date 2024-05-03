import { useState } from "react";
import { registerValidation } from "../Validations/registerValidate";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await registerValidation.validate(formData);
    if (!isValid) return;
    try {
      const response = await fetch(`/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex mx-auto w-[400px] h-[450px] bg-white flex-col items-center justify-center my-[5%] rounded-sm">
      <h1 className="py-2 text-[2rem] font-semibold text-slate-700">
        REGISTER
      </h1>
      {error.length > 0 && <p className="text-red-500 text-center">{error}</p>}
      <form
        className="mt-8 px-4 py-4 flex flex-col gap-6"
        onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="w-8 text-[1.15rem] font-semibold text-slate-600">
            Username
          </label>
          <input
            className="w-[300px] py-2 px-4 rounded-md bg-[#EFEEEC] outline-none"
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
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
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;

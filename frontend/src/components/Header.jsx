import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [localStorage.getItem("user")]);

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };
  const navigate = useNavigate();
  return (
    <div className="bg-white py-4 flex items-center">
      <div className="max-w-[1280px] mx-auto flex justify-between w-[80%] items-center">
        <div
          onClick={() => navigate("/")}
          className="font-bold text-[#D6482C] text-[1.5rem] cursor-pointer">
          BLOG <span className="text-slate-500">APP</span>
        </div>
        <div>
          {!user ? (
            <button
              className="bg-green-600 px-5 py-2 rounded-md text-white font-semibold"
              onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <>
              <p className="text-slate-700 font-semibold ">{user.username}</p>
              <p
                className="text-red-500 font-semibold underline text-[0.8rem] cursor-pointer"
                onClick={signOut}>
                Sign Out
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

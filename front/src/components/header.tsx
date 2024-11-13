import React from "react";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName?: string | null;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md lg:px-8">
      <h1 className="text-xl font-bold">GendaPro</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 hidden lg:inline">{userName}</span>
        <button onClick={handleLogout}>
          <FiLogOut className="text-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;

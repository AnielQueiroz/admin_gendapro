import type React from "react";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

// interface HeaderProps {
//   userName?: string | null;
// }

const Header: React.FC = () => {
  const { employee } = useAuth();
  const employeeName = employee?.name;
  const establishment = employee?.barbershop.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md lg:px-8">
      <h1 className="text-xl font-bold">GendaPro | {establishment}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 hidden lg:inline">{employeeName}</span>
        <button type="button" onClick={handleLogout}>
          <FiLogOut className="text-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;

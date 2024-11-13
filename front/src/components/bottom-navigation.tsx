import { FiHome, FiCalendar, FiPlusCircle, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around lg:hidden">
      <button onClick={() => navigate("/home")} className="text-blue-600">
        <FiHome size={24} />
      </button>
      <button onClick={() => navigate("/calendar")} className="text-gray-600">
        <FiCalendar size={24} />
      </button>
      <button onClick={() => navigate("/new")} className="text-green-600">
        <FiPlusCircle size={32} />
      </button>
      <button onClick={() => navigate("/profile")} className="text-gray-600">
        <FiUser size={24} />
      </button>
    </nav>
  );
};

export default BottomNavigation;

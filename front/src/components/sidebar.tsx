import { FiHome, FiCalendar, FiUser, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-lg h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <ul className="space-y-4">
        <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/home")}
          >
            <FiHome className="mr-3" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/calendar")}
          >
            <FiCalendar className="mr-3" />
            <span>Calendário</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/profile")}
          >
            <FiUser className="mr-3" />
            <span>Perfil</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/settings")}
          >
            <FiSettings className="mr-3" />
            <span>Configurações</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

import {
  FiHome,
  FiCalendar,
  // FiUser,
  // FiSettings,
  FiTool,
  FiMonitor,
  FiKey,
  FiUsers,
} from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import SubMenu from "./sub-menu";

const Sidebar = () => {
  const navigate = useNavigate();
  const { employee } = useAuth();

  // Verifica se o usuário tem permissao
  const checkPermission = (permission: string) => {
    return employee?.role.permissions.map((p) => p.name).includes(permission);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 shadow-lg h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <ul className="space-y-4">
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/home")}
          >
            <FiHome className="mr-3" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/operational/clients")}
          >
            <FiUsers className="mr-3" />
            <span>Clientes</span>
          </button>
        </li>
        {/* <SubMenu
          title="Operacional"
          icon={<GrUserWorker className="mr-3" />}
          navigate={navigate}
          items={[
            { icon: <FiUsers className="mr-3" />, label: "Clientes", path: "/operational/clients"}
          ]}
        /> */}
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/calendar")}
          >
            <FiCalendar className="mr-3" />
            <span>Calendário</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/services")}
          >
            <FiTool className="mr-3" />
            <span>Serviços</span>
          </button>
        </li>
        {/* <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/profile")}
          >
            <FiUser className="mr-3" />
            <span>Perfil</span>
          </button>
        </li> */}
        {/* <li>
          <button
            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/settings")}
          >
            <FiSettings className="mr-3" />
            <span>Configurações</span>
          </button>
        </li> */}
        {/* Exibe o menu administrativo apenas se o usuário tiver permissão */}
        {checkPermission("schedule_appointments") && (
          <SubMenu
            title="Administrativo"
            icon={<FiMonitor className="mr-3" />}
            navigate={navigate}
            items={[
              {
                icon: <GrUserWorker className="mr-3" />,
                label: "Colaboradores",
                path: "/admin/employees",
              },
              {
                icon: <FiKey className="mr-3" />,
                label: "Permissões",
                path: "/admin/permissions",
              },
            ]}
          />
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;

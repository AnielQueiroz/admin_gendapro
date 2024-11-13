import AppointmentList from "@/components/appointment-list";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SummaryCard from "@/components/summary-card";
// import { useAuth } from "@/hooks/useAuth";

const Home = () => {
//   const { user } = useAuth();
const user = {
    name: "Aniel"
}

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar apenas para web */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1">
        <Header userName={user?.name} />

        <div className="container mx-auto p-4 lg:flex lg:space-x-4">
          <div className="lg:w-1/3">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Dia</h2>
            <SummaryCard />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos Agendamentos</h2>
            <AppointmentList />
          </div>
        </div>

        {/* Navegação inferior para mobile */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Home;

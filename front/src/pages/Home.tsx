import AppointmentList from "@/components/appointment-list";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SummaryCard from "@/components/summary-card";
import { useAuth } from "@/hooks/use-auth";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect } from "react";

dayjs.locale("pt-br");

const Home = () => {
  const { employee } = useAuth();

  useEffect(() => {
    document.title = "GendaPro | Home";
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar apenas para web */}
      <Sidebar />

      {/* Conteúdo principal ao lado do sidebar */}
      <div className="flex-1 bg-gray-100">
        {/* Cabeçalho com nome do usuário */}
        <Header />

        {/* Conteúdo principal */}
        <div className="lg:px-12">
          <div className="container mx-auto p-4 lg:flex lg:space-x-4">
            <div className="lg:w-1/3">
              <h2 className="text-xl font-bold">Olá, {employee?.name}!</h2>

              {/* Dia da semana com dayjs */}
              <p>
                <span className="capitalize">{dayjs().format("dddd, D")}</span>
                <span>&nbsp;de&nbsp;</span>
                <span className="capitalize">{dayjs().format("MMMM")}</span>
              </p>
            </div>
          </div>

          <div className="container mx-auto p-4 lg:flex lg:space-x-4 pb-20">
            <div className="lg:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Resumo do Dia
              </h2>
              <SummaryCard />

              <h2 className="mt-4 lg:mt-0 text-lg font-semibold text-gray-800 mb-2">
                Agenda
              </h2>
              <div className="p-6 bg-white rounded-lg shadow-md lg:mb-4 lg:max-w-sm">
                <p>Futuro calendario</p>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="lg:w-full mt-4 lg:mt-0">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Próximos Agendamentos
                </h2>
                <AppointmentList statusFilter="Pendente" />
              </div>
              <div className="lg:w-full mt-4 lg:mt-4">
                <h2 className="mt-4 lg:mt-0 text-lg font-semibold text-gray-800 mb-2">
                  Agendamentos Concluídos
                </h2>
                <AppointmentList statusFilter="Concluído" />
              </div>
            </div>
          </div>

          {/* Navegação inferior para mobile */}
          <div className="lg:hidden">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

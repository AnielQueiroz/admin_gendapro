import AppointmentList from '@/components/appointment-list';
import BottomNavigation from '@/components/bottom-navigation';
import Header from '@/components/header';
import SummaryCard from '@/components/summary-card';
// import { useAuth } from '@/hooks/use-auth'

const Home = () => {
    const user = {
        name: "Aniel Queiroz"
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header userName={user?.name} />
      
            <div className="flex flex-col p-4 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Resumo do Dia</h2>
                <SummaryCard />
                
                <h2 className="text-lg font-semibold text-gray-800">Próximos Agendamentos</h2>
                <AppointmentList />
            </div>

            <BottomNavigation />
        </div>
    )
}

export default Home
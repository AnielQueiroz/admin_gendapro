import BottomNavigation from '@/components/bottom-navigation';
import ClientList from '@/components/client-list';
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

const Clients = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = "GendaPro | Clientes";
    }, []);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar apenas para web */}
            <Sidebar />

            {/* Conteúdo principal ao lado do sidebar */}
            <div className="flex-1 bg-gray-100">
                <Header userName={user?.name} />

                {/* Conteúdo principal */}
                <div className="lg:px-12">
                    <div className='pb-20'>
                        <ClientList />
                    </div>

                    {/* Navegação inferior para mobile */}
                    <div className="lg:hidden">
                        <BottomNavigation />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients;
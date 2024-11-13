import BottomNavigation from '@/components/bottom-navigation';
import Header from '@/components/header'
import ServicesCard from '@/components/services-card'
import Sidebar from '@/components/sidebar'
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

const Services = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = "GendaPro | Serviços";
    }, []);

    return (
        // Conteúdo principal ao lado do sidebar
        <div className="min-h-screen flex">
            {/* Sidebar apenas para web */}
            <Sidebar />

            {/* Conteúdo principal ao lado do sidebar */}
            <div className="flex-1 bg-gray-100">
                <Header userName={user?.name} />

                {/* Conteúdo principal */}
                <div className="lg:px-12">
                    <div className='pb-20'>
                        <ServicesCard />
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

export default Services
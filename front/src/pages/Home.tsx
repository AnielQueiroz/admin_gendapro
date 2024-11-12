import { useAuth } from '@/hooks/use-auth'

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <div>Olá, {user?.email}</div>
            ) : (
                <div>Por favor, faça login</div>
            )}
        </>
    )
}

export default Home
import { logout } from '@/features/auth/authSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { FiLogOut } from "react-icons/fi"

interface HeaderProps {
    userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
            <h1 className="text-xl font-bold">Sistema de Agendamento</h1>
            <div className="flex items-center space-x-2">
                <span className="text-gray-600">{userName}</span>
                <button onClick={handleLogout}>
                    <FiLogOut className="text-red-500" />
                </button>
            </div>
        </header>
    )
}

export default Header;
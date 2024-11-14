import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SubMenuProps {
    title: string;
    icon: React.ReactNode;
    items: { icon: React.ReactNode; label: string; path: string }[];
    navigate: (path: string) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ title, icon, items, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <li>
            <button
                className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={toggleMenu}
            >
                {icon}
                <span>{title}</span>
                {isOpen ? <FiChevronUp className="ml-auto" /> : <FiChevronDown className="ml-auto" />}
            </button>
            {isOpen && (
                <ul className="pl-8 mt-2 space-y-2">
                {items.map((item) => (
                    <li key={item.path}>
                        <button
                            className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    </li>
                ))}
                </ul>
            )}
        </li>
    )
}

export default SubMenu;
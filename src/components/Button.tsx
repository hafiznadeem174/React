import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}
const Button =
    ({ children, onClick, variant = 'primary' }: ButtonProps) => {
        const baseStyle = 'px-4 py-2 rounded font-medium';
        const variants = {
            primary: 'bg-blue-600 text-white',
            secondary: 'bg-gray-300 text-black',
            danger: 'bg-red-600 text-white hover:bg-red-700',
        };
        return (
            <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
                {children}
            </button>
        );
    };
export default Button;
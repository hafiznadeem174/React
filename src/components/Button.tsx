import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
}
const Button =
    ({ children, onClick, variant = 'primary', type = 'button' }: ButtonProps) => {
        const baseStyle = 'px-4 py-2 rounded font-medium';
        const variants = {
            primary: 'bg-blue-600 text-white',
            secondary: 'bg-gray-300 text-black',
            danger: 'bg-red-600 text-white hover:bg-red-700',
        };
        return (
            <button  type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
                {children}
            </button>
        );
    };
export default Button;
import React from "react";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
    return (
        <header className={`bg-gray-900 border-b border-gray-800 ${className}`}>
            {children}
        </header>
    );
}

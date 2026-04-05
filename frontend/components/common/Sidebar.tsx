import React from "react";

interface SidebarProps {
    children: React.ReactNode;
    className?: string;
}

export default function Sidebar({ children, className = "" }: SidebarProps) {
    return (
        <div className={`w-64 bg-gray-900 border-r border-gray-800 ${className}`}>
            {children}
        </div>
    );
}

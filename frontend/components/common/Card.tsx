import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`bg-gray-900 rounded-lg border border-gray-800 shadow-lg ${className}`}
        >
            {children}
        </div>
    );
}

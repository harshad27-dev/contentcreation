import React from "react";

interface FooterProps {
    children: React.ReactNode;
    className?: string;
}

export default function Footer({ children, className = "" }: FooterProps) {
    return (
        <footer className={`bg-gray-900 border-t border-gray-800 ${className}`}>
            {children}
        </footer>
    );
}

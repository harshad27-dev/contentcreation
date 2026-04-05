import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    className = "",
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles =
        "font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

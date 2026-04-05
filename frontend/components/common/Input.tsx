import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = "",
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm font-medium text-gray-200 mb-2">
                    {label}
                </label>
            )}
            <input
                className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

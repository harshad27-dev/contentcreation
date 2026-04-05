import React from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className={`bg-gray-900 rounded-lg border border-gray-800 shadow-xl ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-800">
                        <h2 className="text-xl font-semibold text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

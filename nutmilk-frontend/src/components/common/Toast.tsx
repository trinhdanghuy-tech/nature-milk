import { useEffect } from "react";

type ToastProps = {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
};

export default function Toast({ message, type = "info", onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bg =
        type === "success"
            ? "bg-green-600"
            : type === "error"
                ? "bg-red-600"
                : "bg-blue-600";

    return (
        <div className={`fixed bottom-4 right-4 z-50 ${bg} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up flex items-center gap-3`}>
            <span>{message}</span>
            <button onClick={onClose} className="opacity-70 hover:opacity-100">✕</button>
        </div>
    );
}

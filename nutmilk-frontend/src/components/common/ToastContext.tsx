import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext<any>(undefined);

export function ToastProvider({ children }: { children: any }) {
    const [toast, setToast] = useState<any>(null);

    const showToast = (message: string, type: string = "info") => {
        setToast({ msg: message, type });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    message={toast.msg}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
}

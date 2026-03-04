import {createContext, type ReactNode, useContext, useState} from "react";
import Toast from "../components/toast/Toast.tsx";

interface ToastState {
    message: string;
}

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = (message: string) => {
        setToast({message});

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            {toast &&
                <Toast message={toast.message} onClose={() => setToast(null)}/>}
        </ToastContext.Provider>
    );
};
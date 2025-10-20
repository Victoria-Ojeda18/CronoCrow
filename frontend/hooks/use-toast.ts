import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ToastType = "info" | "success" | "warning" | "error";

type Toast = {
    id: string;
    title?: string;
    message: string;
    type?: ToastType;
    duration?: number; // ms
};

type ShowToastOptions = {
    title?: string;
    type?: ToastType;
    duration?: number;
};

type ToastContextValue = {
    showToast: (message: string, opts?: ShowToastOptions) => string;
    hideToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function genId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export const ToastProvider: React.FC<{ children?: React.ReactNode; maxToasts?: number }> = ({
    children,
    maxToasts = 5,
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((t) => t.filter((x) => x.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, opts?: ShowToastOptions) => {
            const id = genId();
            const toast: Toast = {
                id,
                message,
                title: opts?.title,
                type: opts?.type ?? "info",
                duration: opts?.duration ?? 4000,
            };

            setToasts((prev) => {
                const next = [toast, ...prev].slice(0, maxToasts);
                return next;
            });

            if (toast.duration && toast.duration > 0) {
                window.setTimeout(() => removeToast(id), toast.duration);
            }

            return id;
        },
        [maxToasts, removeToast]
    );

    const hideToast = useCallback(
        (id: string) => {
            removeToast(id);
        },
        [removeToast]
    );

    const value = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onClose={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return ctx;
};

const toastColors: Record<ToastType, { bg: string; border: string }> = {
    info: { bg: "#eef2ff", border: "#c7d2fe" },
    success: { bg: "#ecfdf5", border: "#bbf7d0" },
    warning: { bg: "#fffbeb", border: "#fde68a" },
    error: { bg: "#fef2f2", border: "#fecaca" },
};

const containerStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    right: 16,
    top: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 360,
    pointerEvents: "none",
};

const toastStyleBase: React.CSSProperties = {
    pointerEvents: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderRadius: 8,
    padding: "10px 12px",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    transition: "transform 180ms ease, opacity 180ms ease",
    opacity: 1,
};

function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
    return (
        <div style={containerStyle}>
            {toasts.map((t) => (
                <div
                    key={t.id}
                    role="status"
                    aria-live="polite"
                    style={{
                        ...toastStyleBase,
                        background: toastColors[t.type ?? "info"].bg,
                        border: `1px solid ${toastColors[t.type ?? "info"].border}`,
                    }}
                >
                    <div style={{ flex: 1 }}>
                        {t.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.title}</div>}
                        <div style={{ fontSize: 13 }}>{t.message}</div>
                    </div>
                    <button
                        onClick={() => onClose(t.id)}
                        aria-label="Cerrar"
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 14,
                            lineHeight: 1,
                            padding: 6,
                        }}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
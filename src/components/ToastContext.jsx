import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prevToasts) =>
      [{ id, message, type }, ...prevToasts].slice(0, 3)
    );
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between px-4 py-3 rounded shadow-md text-white ${
              toast.type === "info" && "bg-blue-500"
            } ${toast.type === "success" && "bg-green-500"} ${
              toast.type === "error" && "bg-red-500"
            } ${toast.type === "warning" && "bg-yellow-500"}`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-lg font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

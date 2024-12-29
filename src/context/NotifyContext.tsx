"use client";

import { useNotify } from "@/hook/NotifyHook";
import { createContext, useState, useCallback } from "react";

// Type definitions
export type NotifyData = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timeout?: 500 | 1000 | 3000 | 5000;
  timeoutId?: NodeJS.Timeout;
  onClose?: () => void;
  onOpen?: () => void;
};

export type NotifyContextType = {
  notify: NotifyData[];
  addNotify: (notification: Omit<Omit<NotifyData, "id">, "timeoutId">) => void;
  removeNotify: (id: number) => void;
};

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotifyData[]>([]);

  const addNotify = useCallback(
    (notify: Omit<Omit<NotifyData, "id">, "timeoutId">) => {
      const newNotification: NotifyData = {
        id: Date.now(),
        message: notify.message,
        type: notify.type,
        timeout: notify.timeout,
        onClose: notify.onClose,
        onOpen: notify.onOpen,
      };

      if (newNotification.onOpen) {
        newNotification.onOpen();
      }

      if (newNotification.timeout) {
        newNotification.timeoutId = setTimeout(() => {
          removeNotify(newNotification.id);
        }, notify.timeout);
      }

      setNotifications((prev) => [...prev, newNotification]);
    },
    []
  );

  const removeNotify = useCallback((id: number) => {
    setNotifications((prev) => {
      const notification = prev.find((data) => data.id === id);

      if (notification?.onClose) {
        notification.onClose();
      }

      if (notification?.timeoutId) {
        clearTimeout(notification.timeoutId);
      }

      return prev.filter((data) => data.id !== id);
    });
  }, []);

  return (
    <NotifyContext.Provider
      value={{ notify: notifications, addNotify, removeNotify }}
    >
      {children}
    </NotifyContext.Provider>
  );
};

const NotifyBar = () => {
  const { notify, removeNotify } = useNotify();

  return (
    <div className="fixed top-0 right-0 w-full p-4 z-50 flex flex-col gap-4">
      {notify.map((data) => (
        <div
          key={data.id}
          className="bg-white rounded-lg shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl max-w-sm ml-auto animate-[slideIn_0.3s_ease-out]"
        >
          <div className="relative">
            <div className="p-4 pr-12 text-sm font-medium">{data.message}</div>
            <button
              onClick={() => removeNotify(data.id)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                data.timeout ? "hidden" : ""
              }`}
            >
              <span className="text-gray-500 hover:text-gray-700">✕</span>
            </button>
            <div
              className={
                `h-1.5 w-full rounded-b-lg transition-all ${
                  data.type === "success"
                    ? "bg-green-500 border-green-600"
                    : data.type === "error"
                    ? "bg-red-500"
                    : data.type === "info"
                    ? "bg-blue-500"
                    : data.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }` + (data.timeout ? "" : " hidden")
              }
              style={{
                animation: `animateBar ${data.timeout}ms linear infinite`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { NotifyContext, NotifyProvider, NotifyBar };

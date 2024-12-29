import { NotifyContext } from "@/context/NotifyContext";
import { useContext } from "react";

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};

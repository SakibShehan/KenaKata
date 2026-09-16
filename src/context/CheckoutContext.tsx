
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface OrderInfo {
  fullName: string;
  phone: string;
  email: string;
  location: string;
}

interface CheckoutContextValue {
  orderInfo: OrderInfo | null;
  setOrderInfo: (info: OrderInfo) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  return (
    <CheckoutContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
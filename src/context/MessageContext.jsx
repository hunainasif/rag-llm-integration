"use client";
import { createContext, useContext, useEffect, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(message));
  }, [message]);
  console.log(message);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);

"use client";

import { useEffect, useState, createContext, useContext } from "react";

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        setIsMobile(true);
        setSideBarOpen(false);
      } else {
        setIsMobile(false);
        setSideBarOpen(true);
      }
    };

    checkMobile();  
    window.addEventListener("resize", checkMobile);  

    return () => {
      window.removeEventListener("resize", checkMobile);  
    };
  }, []);

  return (
    <SideBarContext.Provider
      value={{ sideBarOpen, setSideBarOpen, isMobile, setIsMobile }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => useContext(SideBarContext);

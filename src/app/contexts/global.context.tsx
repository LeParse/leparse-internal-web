"use client";

import { createContext, useContext, useState } from "react";

import { Enterprise } from "@leparse/ui/dist/types";

interface GlobalProps {
  user: object;
  enterprises: Enterprise[];
}

const GlobalContext = createContext<GlobalProps>({} as GlobalProps);

const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [enterprises, setEnterprises] = useState<Enterprise[]>(
    [] as Enterprise[]
  );

  return (
    <GlobalContext.Provider
      value={{
        user,
        enterprises,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export function useGlobal() {
  return useContext(GlobalContext);
}

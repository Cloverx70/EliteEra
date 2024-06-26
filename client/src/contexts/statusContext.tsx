import { fetchStatus } from "@/api";
import { UserData } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserInfo } from "os";
import React, { createContext, useContext, useEffect, useState } from "react";

type StatusContextValue = {
  Status: UserData | null;
  statusSuccess: boolean;
  statusError: boolean;
  statusPending: boolean;
  statusLoading: boolean;
  setStatus: React.Dispatch<
    React.SetStateAction<{
      addressone: string;
      addresstwo: string;
      email: string;
      fullname: string;
      exp: number;
      iat: number;
      isAdmin: boolean;
      userId: number;
      username: string;
    } | null>
  >;
};
const statusContext = createContext<StatusContextValue | undefined>(undefined);
export const MyStatusContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Status, setStatus] = useState<UserData | null>(null);

  const client = useQueryClient();
  const {
    data,
    isSuccess: statusSuccess,
    isError: statusError,
    isLoading: statusLoading,
    isPending: statusPending,
  } = useQuery({
    queryKey: ["status"],
    queryFn: async () => await fetchStatus(localStorage.getItem("token")),
  });
  useEffect(() => {
    function assignStatus() {
      if (data) setStatus(data);
    }
    assignStatus();
  }, [data]);

  const value = {
    setStatus,
    Status,
    statusSuccess,
    statusError,
    statusLoading,
    statusPending,
  };

  return (
    //@ts-ignore
    <statusContext.Provider value={value}>{children}</statusContext.Provider>
  );
};
//@ts-ignore
export const useStatus = () => {
  const context = useContext(statusContext);
  if (context === undefined) {
    throw new Error("useStatus must be used within a MyStatusContext.Provider");
  }
  return context;
};

import { fetchGetUserById, fetchStatus } from "@/api";
import { UserData } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserInfo } from "os";
import React, { createContext, useContext, useEffect, useState } from "react";

type StatusContextValue = {
  isAdmin: boolean;
  Status: UserData | null;
  statusSuccess: boolean;
  statusError: boolean;
  statusPending: boolean;
  statusLoading: boolean;
  refetchStatus: () => void;
  setStatus: React.Dispatch<
    React.SetStateAction<{
      addressOne: string;
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
  const client = useQueryClient();
  const {
    data,
    isSuccess: statusSuccess,
    isError: statusError,
    isLoading: statusLoading,
    isPending: statusPending,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ["status"],
    queryFn: async () => await fetchStatus(localStorage.getItem("token")),
  });

  console.log(data?.userId);

  const { data: Status } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await fetchGetUserById(data?.userId!),
    enabled: !!data?.userId,
  });

  const isAdmin = data?.isAdmin;

  const value = {
    Status,
    statusSuccess,
    statusError,
    statusLoading,
    statusPending,
    isAdmin,
    refetchStatus,
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

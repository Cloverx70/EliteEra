import toast from "react-hot-toast";
import React from "react";

export function createToast(message: string) {
  toast((t) => {
    return <span className=" text-lg text-bold">{message}</span>;
  });
}

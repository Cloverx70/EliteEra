import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

export const CartItemsSkeleton = () => {
  return (
    <div className=" w-[550px] h-full">
      <TableRow className=" w-full h-full bg-black flex items-center justify-between ">
        <TableCell className="w-[100px]">
          {/*@ts-ignore */}
          <Skeleton className=" w-10 h-10 " />
        </TableCell>
        <TableCell className=" text-custom-ke7li">
          <Skeleton className=" w-44 h-4" />
        </TableCell>
        <TableCell className=" text-custom-ke7li flex gap-2 justify-center items-center">
          <Skeleton className="w-4 h-4" />
          <Skeleton className=" w-4 h-4" />
          <Skeleton className=" w-4 h-4" />
        </TableCell>
        <TableCell className="text-right  text-custom-ke7li">
          <Skeleton className="w-4 h-4" />
        </TableCell>
      </TableRow>
    </div>
  );
};

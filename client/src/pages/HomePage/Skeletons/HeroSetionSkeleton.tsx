import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSetionSkeleton = () => {
  return (
    <section className="w-full h-[590px] flex justify-between pt-20 items-start  lg:h-[550px] md:h-[490px] pb-7 overflow-hidden relative sm:pb-5 pl-10 pr-10  custom-mobile:pb-5 md:pr-6 md:pl-6 text-white">
      <div className=" h-full w-10 flex flex-col items-center  gap-10">
        <Skeleton className=" h-44 w-7 " />
        <Skeleton className=" h-44 w-7" />
      </div>
      <div className=" flex flex-col items-start justify-center gap-24">
        <div className=" flex flex-col gap-3">
          <Skeleton className=" w-80 h-7" />
          <Skeleton className=" w-64 h-7" />
          <Skeleton className=" w-40 h-7" />
        </div>
        <div className=" flex items-start justify-start gap-3">
          <Skeleton className=" w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>
        <div className=" flex gap-3 items-center ">
          <Skeleton className=" w-10 h-10 rounded-full" />
          <Skeleton className=" w-32 h-7 " />
        </div>
      </div>
      <div className=" flex items-center">
        <Skeleton className=" w-[420px] h-[420px]" />
      </div>
      <div className=" h-[400px] flex flex-col gap-5 items-center justify-center">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>
    </section>
  );
};

export default HeroSetionSkeleton;

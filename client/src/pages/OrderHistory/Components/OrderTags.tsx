import React, { useState } from "react";

type OrderTagsProps = {
  btnActive: {
    inProgress: boolean;
    completed: boolean;
    cancelled: boolean;
  };
  setBtnActive: React.Dispatch<
    React.SetStateAction<{
      inProgress: boolean;
      completed: boolean;
      cancelled: boolean;
    }>
  >;
};

const OrderTags = ({ btnActive, setBtnActive }: OrderTagsProps) => {
  const handleOnClickBtnActive = (btn: string) => {
    if (btn === "inprogress")
      setBtnActive({
        ...btnActive,
        inProgress: true,
        completed: false,
        cancelled: false,
      });
    if (btn === "completed")
      setBtnActive({
        ...btnActive,
        completed: true,
        inProgress: false,
        cancelled: false,
      });
    if (btn === "cancelled")
      setBtnActive({
        ...btnActive,
        cancelled: true,
        inProgress: false,
        completed: false,
      });
  };

  return (
    <div className=" w-full h-9  font-Poppins text-white flex gap-3  text-sm items-center justify-start pl-5 pb-5">
      <button
        onClick={() => handleOnClickBtnActive("inprogress")}
        className={`${
          btnActive.inProgress
            ? "bg-custom-light-purple text-white"
            : " bg-white text-custom-ke7li"
        }  hover:bg-custom-light-purple rounded-xl hover:text-white transition-all delay-100 ease-linear w-32 h-9`}
      >
        In Progress
      </button>
      <button
        onClick={() => handleOnClickBtnActive("completed")}
        className={`${
          btnActive.completed
            ? "bg-custom-light-purple text-white"
            : " bg-white text-custom-ke7li"
        } hover:bg-custom-light-purple rounded-xl hover:text-white transition-all delay-100 ease-linear  w-32 h-9`}
      >
        Completed
      </button>
      <button
        onClick={() => handleOnClickBtnActive("cancelled")}
        className={` ${
          btnActive.cancelled
            ? "bg-custom-light-purple text-white"
            : " bg-white text-custom-ke7li"
        } hover:bg-custom-light-purple rounded-xl hover:text-white transition-all delay-100 ease-linear  w-32 h-9`}
      >
        Cancelled
      </button>
    </div>
  );
};

export default OrderTags;

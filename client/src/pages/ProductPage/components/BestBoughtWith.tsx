import React from "react";

const BestBoughtWith = () => {
  return (
    <section className="w-full border-b border-t py-6 border-custom-ke7li text-white flex items-center justify-center">
      <div className="w-full flex flex-col gap-2">
        <p className="text-start font-Poppins text-2xl text-custom-light-purple font-semibold">
          99% OF PEOPLE BOUGHT THESE TOGETHER
        </p>
        <div className=" grid grid-cols-10 gap-20">
          <div className=" w-32 h-32 bg-white"></div>
          <div className=" w-32 h-32 bg-white"></div>
          <div className=" w-32 h-32 bg-white"></div>
          <div className=" w-32 h-32 bg-white"></div>
          <div className=" w-32 h-32 bg-white"></div>
          <div className=" w-32 h-32 bg-white"></div>{" "}
          <div className=" w-52 flex flex-col gap-1 items-center justify-center">
            <button className=" w-32 h-9  font-poppins font-bold text-sm  bg-custom-light-purple ">
              ADD ALL CART
            </button>
            <p className=" font-bold">TOTAL : 10230$</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestBoughtWith;

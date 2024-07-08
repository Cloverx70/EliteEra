import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { fetchGetAllProducts } from "../../../api";
import { Iproduct } from "@/interfaces";
import { motion } from "framer-motion";

const Featured = () => {
  const {
    data: Products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchGetAllProducts,
  });

  const [SliceArray, setSliceArray] = useState([0, 4]);

  function UpdateSlicedArray() {
    if (window.innerWidth <= 500) {
      setSliceArray([0, 1]);
    } else {
      setSliceArray([0, 4]);
    }
  }

  useEffect(() => {
    UpdateSlicedArray();
    window.addEventListener("resize", UpdateSlicedArray);
    return () => {
      window.removeEventListener("resize", UpdateSlicedArray);
    };
  }, []);

  const [StartIdx, setStartIdx] = useState(0);

  const handleOnClickNext = () => {
    if (Products && StartIdx < Products.length - 4) {
      setStartIdx(StartIdx + 1);
    }
  };

  const handleOnClickBack = () => {
    if (StartIdx > 0) {
      setStartIdx(StartIdx - 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products.</p>;
  }

  const EndIdx = Products ? Math.min(StartIdx + 4, Products.length) : 0;

  return (
    <>
      <motion.section
        key={"Featured"}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="overflow-hidden w-full relative pr-10 pl-10 pt-14 pb-6 text-white"
      >
        <p className="2xl:text-[500px] 2xl:left-[-110px] 2xl:top-10 font-bold text-[350px] text-center whitespace-nowrap text-custom-ke7li/20 z-10 absolute left-[-75px] top-[90px] md:top-[300px] ">
          FEATURED
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-white">Featured Products</p>
            <div className="flex items-center gap-2">
              <AiFillMinusCircle
                size={30}
                className="rounded-full ring-1 ring-custom-light-purple text-white"
              />
              <p className="font-cabin">BROWSE</p>
            </div>
          </div>

          <div className="grid grid-cols-4 justify-items-center sm:grid-cols-2 sm:gap-x-40 custom-mobile:grid-cols-1 md:grid-cols-2 pl-20 pr-20 justify-between z-20 w-full">
            {
              //@ts-ignore
              Products?.slice(StartIdx, EndIdx).map((item: Iproduct) => {
                return (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, type: "tween" }}
                    className="flex flex-col pt-20 gap-5 justify-center"
                  >
                    <div className=" flex justify-center items-center">
                      <img
                        className="w-[210px]"
                        src={item.productPicture}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                      <div className="flex flex-col items-center">
                        <p className="font-bold custom-mobile:w-[150px] custom-mobile:text-center lg:w-[150px] md:w-[150px] sm:w-[150px] md:text-center sm:text-center lg:text-center text-white">
                          {item.productTitle}
                        </p>
                        <p className="text-sm text-custom-ke7li">
                          {item.productDescription}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-3xl text-custom-light-purple">
                          $ {item.productPrice}
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <AiFillPlusCircle
                          size={25}
                          className="rounded-full ring-1 ring-custom-light-purple sm:size-7 custom-mobile:size-5"
                        />
                        <p className="font-semibold text-base">ADD TO CART</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            }
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center justify-center pt-16 gap-3">
              <p className="text-custom-light-purple">{EndIdx}</p>
              <div className="w-80 h-[2px] bg-custom-ke7li" />
              <p className="text-custom-light-purple">{Products.length}</p>
            </div>
            <div className="gap-5 flex">
              <GoChevronLeft
                className=" cursor-pointer"
                onClick={handleOnClickBack}
              />
              <GoChevronRight
                className=" cursor-pointer"
                onClick={handleOnClickNext}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Featured;

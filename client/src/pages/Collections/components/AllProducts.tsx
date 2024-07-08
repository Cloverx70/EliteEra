import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Iproduct } from "@/interfaces";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { motion } from "framer-motion";

type AllProductsProps = {
  products: Iproduct[];
  isLoading: boolean;
  isError: boolean;
};

const AllProducts: React.FC<AllProductsProps> = ({
  products,
  isLoading,
  isError,
}) => {
  const [StartIdx, setStartIdx] = useState(0);
  const [EndIdx, setEndIdx] = useState(4);

  const handleNext = () => {
    if (EndIdx < products.length) {
      setStartIdx(StartIdx + 1);
      setEndIdx(EndIdx + 1);
    }
    if (EndIdx === products.length) {
      setStartIdx(0);
      setEndIdx(4);
    }
  };

  const handlePrevious = () => {
    if (StartIdx > 0) {
      setStartIdx(StartIdx - 1);
      setEndIdx(EndIdx - 1);
    }
    if (EndIdx === 1) {
      setStartIdx(products.length - 4);
      setEndIdx(products.length);
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError || !products)
    return <p>Error loading products or no products found.</p>;

  return (
    <div className="w-full flex h-full">
      <div className="grid grid-cols-4 justify-items-center sm:grid-cols-2 sm:gap-x-40 custom-mobile:grid-cols-1 md:grid-cols-2 pl-20 pr-20 justify-between z-20 w-full">
        {products.slice(StartIdx, EndIdx).map((item: Iproduct) => (
          <motion.div
            key={item.productId}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className=" cursor-pointer flex flex-col gap-3 justify-center hover:scale-105 transition-all delay-100 ease-in-out"
          >
            <div className="flex items-center justify-center">
              <img className="w-[210px]" src={item.productPicture} alt="" />
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
                  ${item.productPrice}
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <AiFillPlusCircle
                  size={25}
                  className="rounded-full ring-1 ring-custom-light-purple"
                />
                <p className="font-semibold text-base">ADD TO CART</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col z-20 justify-center items-end">
        <button onClick={handleNext}>
          <GoChevronRight
            size={70}
            className="md:size-12 sm:size-10 custom-mobile:size-9"
          />
        </button>
        <button onClick={handlePrevious}>
          <GoChevronLeft
            size={70}
            className="md:size-12 sm:size-10 custom-mobile:size-9"
          />
        </button>
      </div>
    </div>
  );
};

export default AllProducts;

import React, { useState, useEffect, useCallback } from "react";
import { TiSocialInstagram } from "react-icons/ti";
import { FaTiktok } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoChevronLeft, GoChevronRight, GoChevronDown } from "react-icons/go";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  fetchAddUserProduct,
  fetchGetAllProducts,
  fetchGetUserProductByUIDandPID,
  fetchUpdateUserCartByUserId,
  fetchUpdateUserProductByUIDandUPID,
} from "../../../api";
import { Iproduct } from "@/interfaces";
import { createToast } from "@/shared/Toast";
import { useStatus } from "@/contexts/statusContext";
import HeroSetionSkeleton from "../Skeletons/HeroSetionSkeleton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const {
    data: Products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Posts"],
    queryFn: fetchGetAllProducts,
  });

  const client = useQueryClient();
  const { Status } = useStatus();
  const navigate = useNavigate();

  const handleOnClickAddProductToCart = async (
    productid: number,
    productPrice: number
  ) => {
    try {
      let Proditem = await fetchAddUserProduct(Status!.userId, productid, 1);
      if (Proditem) {
        createToast(
          `${Proditem.productTitle} has been successfully added to your cart`
        );
        await fetchUpdateUserCartByUserId(
          Status!.userId,
          Proditem.productPrice,
          1
        );
      } else {
        const userProduct = await fetchGetUserProductByUIDandPID(
          Status!.userId,
          productid
        );
        if (userProduct) {
          Proditem = await fetchUpdateUserProductByUIDandUPID(
            Status!.userId,
            userProduct.userProductId,
            1,
            productPrice
          );
          createToast(
            `${Proditem.productTitle} has been successfully added to your cart`
          );
        }
      }
      client.invalidateQueries({ queryKey: ["CartItems"] });
      client.invalidateQueries({ queryKey: ["cart"] });
    } catch {
      createToast("Unexpected error please try again later..");
    }
  };

  useEffect(() => {
    if (Products) {
      setStartIdx(0);
      setEndIdx(1);
    }
  }, [Products]);

  const handleOnClickNext = () => {
    //@ts-ignore
    if (endIdx < Products.length) {
      setStartIdx(startIdx + 1);
      setEndIdx(endIdx + 1);
    }
  };

  const handleOnClickBack = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
      setEndIdx(endIdx - 1);
    }
  };

  const checkIConstraints = () => startIdx === 0;
  //@ts-ignore
  const checkJConstraints = () => endIdx === Products.length;

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!Products) return;
    const intervalId = setInterval(() => {
      if (!isPaused) {
        if (startIdx === 0) {
          handleOnClickNext();
          //@ts-ignore
        } else if (endIdx === Products.length) {
          handleOnClickBack();
        } else {
          handleOnClickNext();
        }
      }
    }, 6000);
    return () => clearInterval(intervalId);
  }, [startIdx, endIdx, Products, isPaused]);

  return (
    <>
      {isError && <p>Error...</p>}

      {Products && (
        <motion.section
          key={Products}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[650px] lg:h-[550px] md:h-[490px] pb-7 overflow-hidden relative sm:pb-5 pl-10 pr-10 custom-mobile:pb-5 md:pr-6 md:pl-6 text-white"
          onMouseEnter={togglePause}
          onMouseLeave={togglePause}
        >
          <div className="product-container flex overflow-hidden">
            {Products.slice(startIdx, endIdx).map((item: Iproduct) => (
              <div
                key={item.productId}
                className="product flex justify-around w-full h-full custom-mobile:pt-5"
              >
                <div className="flex flex-col gap-6 justify-around items-center custom-mobile:hidden">
                  <p className="text-sm sm:text-[9px] vertical rotate-180">
                    WELCOME TO A NEW ERA
                  </p>
                  <div className="flex flex-col gap-6">
                    <FaTiktok size={18} className="sm:size-3" />
                    <BsTwitterX size={18} className="sm:size-3" />
                    <TiSocialInstagram size={18} className="sm:size-3" />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: "-20%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "easeInOut", duration: 0.5 }}
                  className="flex flex-col justify-around"
                >
                  <div className="flex flex-col pl-16 h-full z-20 sm:gap-4 justify-around">
                    <div
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="flex flex-col items-start custom-mobile:items-center sm:items-center gap-y-3 custom-mobile:gap-5"
                    >
                      <p className="font-bold w-[500px] lg:w-[450px] custom-mobile:w-[250px] md:w-[290px] sm:w-[160px] sm:text-center z-20 text-6xl custom-mobile:text-center custom-mobile:text-4xl sm:text-xl md:text-4xl">
                        {item.productTitle}
                      </p>
                      <div className="flex custom-mobile:justify-start custom-mobile:pb-5 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden custom-mobile:visible z-20 gap-5">
                        <p className="text-custom-ke7l md:text-3xl sm:text-xl custom-mobile:text-base font-bold text-4xl line-through">
                          $ 199
                        </p>
                        <p className="text-custom-light-purple md:text-3xl sm:text-xl custom-mobile:text-base font-bold text-4xl">
                          $ {item.productPrice}
                        </p>
                      </div>
                      <img
                        className="z-50 2xl:hidden xl:hidden lg:hidden md:hidden sm:pb-5 sm:w-[300px] custom-mobile:pb-5 custom-mobile:w-[250px]"
                        src={item.productPicture}
                        alt=""
                      />
                    </div>
                    <div
                      className="flex custom-mobile:justify-center sm:justify-center custom-mobile:hidden z-20 gap-5"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    >
                      <p className="text-custom-ke7l md:text-3xl sm:text-xl custom-mobile:text-base font-bold text-4xl line-through">
                        $ 199
                      </p>
                      <p className="text-custom-light-purple md:text-3xl sm:text-xl custom-mobile:text-base font-bold text-4xl">
                        $ {item.productPrice}
                      </p>
                    </div>
                    <div className="flex gap-5 cursor-pointer sm:justify-center custom-mobile:gap-3 custom-mobile:justify-center items-center">
                      <p>
                        <AiFillPlusCircle
                          onClick={() =>
                            handleOnClickAddProductToCart(
                              item.productId,
                              item.productPrice
                            )
                          }
                          size={35}
                          className="rounded-full ring-1 ring-custom-light-purple sm:size-7 custom-mobile:size-5"
                        />
                      </p>
                      <p
                        onClick={() =>
                          handleOnClickAddProductToCart(
                            item.productId,
                            item.productPrice
                          )
                        }
                        className="text-md font-bold sm:text-xs custom-mobile:text-[13px]"
                      >
                        ADD TO CART
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: "-20%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "easeInOut", duration: 0.5 }}
                  className="h-full flex flex-col z-20"
                >
                  <img
                    className="w-[450px] h-[500px] z-50 lg:w-[410px] lg:h-[410px] md:w-[300px] md:h-[350px] sm:hidden custom-mobile:hidden"
                    src={item.productPicture}
                    alt=""
                  />
                </motion.div>
                <p className="xl:text-[250px] lg:text-[200px] md:text-[150px] sm:text-[100px] sm:top-60 custom-mobile:text-[110px] whitespace-nowrap text-[270px] z-10 text-custom-ke7li/20 font-bold absolute custom-mobile:top-60">
                  {item.productDescription}
                </p>
                <div className="flex flex-col z-20 justify-center items-end">
                  <button
                    disabled={checkJConstraints()}
                    onClick={handleOnClickNext}
                  >
                    <GoChevronRight
                      size={70}
                      className="md:size-12 sm:size-10 custom-mobile:size-9"
                    />
                  </button>
                  <button
                    disabled={checkIConstraints()}
                    onClick={handleOnClickBack}
                  >
                    <GoChevronLeft
                      size={70}
                      className="md:size-12 sm:size-10 custom-mobile:size-9"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center sm:hidden xl:hidden 2xl:hidden custom-mobile:hidden justify-center">
            <GoChevronDown size={50} className="lg:size-16" />
          </div>
        </motion.section>
      )}
      <div className="w-full h-[2px] bg-custom-ke7li" />
    </>
  );
};

export default HeroSection;

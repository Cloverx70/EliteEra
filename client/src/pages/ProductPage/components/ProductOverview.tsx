import { Iproduct } from "@/interfaces";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiStarFullOutline } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const ProductOverview = ({
  productTitle,
  productAbout,
  productDescription,
  productPrice,
  productPicture,
  productSecondPicture,
  productThirdPicture,
  productFourthPicure,
  productRating,
  productOrigin,
}: Iproduct) => {
  const [images, setImages] = useState([
    productSecondPicture,
    productThirdPicture,
    productFourthPicure,
  ]);

  const [mainImg, setMainImg] = useState(images[0]);

  const stars = () => {
    return Array.from({ length: productRating }, (_, index) => (
      <TiStarFullOutline key={index} color="white" size={15} />
    ));
  };

  const handleOnClickImg = (index: number) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
    setMainImg(newImages[0]);
  };

  const [Counter, setCounter] = useState(1);

  return (
    <div className="w-full flex gap-x-10">
      <div className="w-96 flex flex-col gap-y-4">
        <div className="w-[400px] h-96 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={mainImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-96"
              src={mainImg}
              alt={productTitle}
            />
          </AnimatePresence>
        </div>
        <div className="w-[400px] flex gap-2">
          {images.map((imgSrc, index) => (
            <div key={index} className="w-32 h-32">
              <img
                onClick={() => handleOnClickImg(index)}
                src={imgSrc}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col text-white">
          <p className="text-custom-light-purple font-Poppins font-bold text-4xl">
            {productTitle}
          </p>
          <div className="flex gap-1 pt-1 pb-1">{stars()}</div>
          <p className="font-cabin font-bold text-2xl">{productPrice}$</p>
          <p className=" text-sm text-custom-ke7li uppercase">
            {productOrigin}
          </p>
        </div>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="font-Poppins font-bold w-[180px] bg-custom-ke7li border-none text-white">
              <SelectValue placeholder="Choose size" />
            </SelectTrigger>
            <SelectContent className="font-Poppins font-bold bg-custom-ke7li border-none text-white">
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
              <SelectItem value="xxl">2XL</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="font-Poppins font-bold w-[180px] bg-custom-ke7li border-none text-white">
              <SelectValue placeholder="Choose color" />
            </SelectTrigger>
            <SelectContent className="font-Poppins font-bold bg-custom-ke7li border-none text-white">
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="biege">Biege</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" w-52 h-10  flex text-white ">
          <div className=" w-1/4 h-full bg-white text-custom-light-purple  flex items-center justify-center">
            <FaMinus />
          </div>
          <div className=" w-1/2 h-full bg-custom-dark-ke7li  flex items-center justify-center">
            1
          </div>
          <div className=" w-1/4 h-full  bg-white text-custom-light-purple  flex items-center justify-center">
            <FaPlus />
          </div>
        </div>
        <div className="text-white font-poppins w-[700px]">{productAbout}</div>
      </div>
    </div>
  );
};

export default ProductOverview;

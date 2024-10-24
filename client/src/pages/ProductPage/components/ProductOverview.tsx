import { Iproduct, IProductVariant } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGetVariantsByProductId } from "@/api";

const ProductOverview = ({
  productId,
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
  productStock,
}: Iproduct) => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImg, setMainImg] = useState("");
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const availableImages = [
      productPicture,
      productSecondPicture,
      productThirdPicture,
      productFourthPicure,
    ].filter(Boolean);
    setMainImg(availableImages[0]);
    setImages(availableImages);
  }, [
    productPicture,
    productSecondPicture,
    productThirdPicture,
    productFourthPicure,
  ]);

  const stars = () => {
    return Array.from({ length: productRating }, (_, index) => (
      <TiStarFullOutline key={index} color="yellow" size={15} />
    ));
  };

  const handleOnClickImg = (index: number) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
    setMainImg(newImages[0]);
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setCounter(0);
    } else {
      const numberValue = Number(inputValue);
      if (!isNaN(numberValue) && numberValue > 0) {
        setCounter(numberValue);
      }
    }
  };

  const {
    data: variants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Pvariants"],
    queryFn: async () => await fetchGetVariantsByProductId(productId),
  });

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner
  }

  if (isError) {
    return <div>Error loading product information</div>;
  }
  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  console.log(Object.entries(variants[0]), "hi");
  return (
    <div className="w-full flex gap-x-10">
      <div className="p-2 flex flex-col gap-y-4">
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <p className="text-black font-Poppins font-bold text-4xl">
            {productTitle}
          </p>
          <p className="font-cabin font-bold text-2xl text-custom-light-purple">
            {productPrice}$
          </p>
          <p className="text-xs font-semibold text-custom-ke7li uppercase">
            {productOrigin}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {variants?.map((item: IProductVariant) => (
            <div
              key={item.VariantName}
              className="flex flex-col gap-2 font-Poppins"
            >
              <p className="text-black font-semibold">
                Choose {item.VariantName}
              </p>
              <div className="flex gap-5 pl-3 text-sm">
                {Object.entries(item.VariantDetails).map(
                  ([variantType, details]) =>
                    Array.isArray(details) &&
                    details.map((detail: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleVariantSelect(variantType, detail)}
                        className={`px-4 py-1 rounded-full border-2 ${
                          selectedVariants[variantType] === detail
                            ? "bg-custom-light-purple text-white border-transparent"
                            : "bg-white text-black border-gray-300"
                        }`}
                      >
                        {detail.toUpperCase()}
                      </button>
                    ))
                )}
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <input
              type="number"
              value={counter === 0 ? "" : counter}
              onChange={handleOnInput}
              min="1"
              className="w-20 h-8 text-center border-black border-[1.5px] outline-none"
            />
            <button className="h-8 px-4 bg-custom-light-purple text-white">
              Add to cart
            </button>
          </div>
          <div className="text-custom-ke7li font-poppins w-[700px]">
            {productAbout}
          </div>
          <div className="font-Poppins flex gap-2 items-center justify-start">
            <div className="flex gap-1 items-center justify-center">
              {stars()}
              <p className="text-xs">{productRating}</p>
            </div>
            <p className="text-xs"> | {productStock} in stock </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;

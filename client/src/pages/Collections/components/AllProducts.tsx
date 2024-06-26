import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiFillPlusCircle } from "react-icons/ai";
import { fetchGetAllCollectionProducts } from "@/api";
import { Iproduct } from "@/interfaces";

type AllProductsProps = {
  id: number;
};

const AllProducts: React.FC<AllProductsProps> = ({ id }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Iproduct[], Error>({
    queryKey: ["AllCollectionProducts", id],
    queryFn: () => fetchGetAllCollectionProducts(id),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError || !products)
    return <p>Error loading products or no products found.</p>;

  return (
    <div className="grid grid-cols-4 justify-items-center sm:grid-cols-2 sm:gap-x-40 custom-mobile:grid-cols-1 md:grid-cols-2 pl-20 pr-20 justify-between z-20 w-full">
      {products.map((item) => (
        <div
          key={item.productId}
          className="flex flex-col gap-3 justify-center"
        >
          <img className="w-[210px]" src={item.productPicture} alt="" />
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
        </div>
      ))}
    </div>
  );
};

export default AllProducts;

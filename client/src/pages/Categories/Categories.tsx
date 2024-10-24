import { fetchGetCategoryProductByCategoryName } from "@/api";
import { Iproduct } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const Categories = () => {
  const { name } = useParams<{
    name: string;
  }>();

  const { data: categoryProducts } = useQuery({
    queryKey: ["categoryprods"],
    queryFn: async () => await fetchGetCategoryProductByCategoryName(name!),
  });

  const [queryname, setqueryname] = useState("");

  const filteredProducts = categoryProducts?.filter((product: Iproduct) =>
    product.productTitle.toLowerCase().includes(queryname.toLowerCase())
  );

  return (
    <>
      <section className="  w-full h-full min-h-screen font-Poppins">
        <div className="  w-full h-80 bg-custom-light-purple">
          <img src="" alt="" />
        </div>
        <div className="p-10 w-full h-full min-h-screen text-white flex flex-col justify-start items-center gap-10 ">
          <p className=" font-bold  text-center text-2xl font-poppins border-b-2 ">
            {name?.toLocaleUpperCase()}
          </p>{" "}
          {categoryProducts?.length !== 0 ? (
            <>
              <div className=" w-full flex items-center justify-center ">
                <div className="w-60 relative flex items-center justify-center">
                  <input
                    type="text"
                    id="name"
                    className="w-60 h-8 md:w-80 bg-transparent  outline-none border-b border-custom-light-purple pl-1 custom-placeholder"
                    placeholder="Search here..."
                    value={queryname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setqueryname(e.target.value);
                    }}
                  />
                  <IoIosSearch className="absolute right-0" size={16} />
                </div>
              </div>
              <div className=" grid grid-cols-4 justify-items-center sm:grid-cols-2 sm:gap-x-40 custom-mobile:grid-cols- md:grid-cols-2 pl-20 pr-20 justify-between z-20 w-full">
                {
                  //@ts-ignore
                  filteredProducts?.map((item: Iproduct) => {
                    return (
                      <Link
                        key={item.productId}
                        to={`/product/${item.productId}`}
                      >
                        <div className=" hover:scale-105 transition-all delay-100 ease-in-out  flex flex-col  pt-20 gap-5 items-center justify-center ">
                          <img
                            className=" w-[210px]"
                            src={item.productPicture}
                            alt=""
                          />
                          <div className=" flex flex-col w-full  gap-3">
                            <div className="flex flex-col items-center ">
                              <p className="font-bold custom-mobile:w-[150px] custom-mobile:text-center lg:w-[150px] md:w-[150px] sm:w-[150px] md:text-center sm:text-center lg:text-center  text-white">
                                {item.productTitle}
                              </p>
                              <p className=" text-sm text-custom-ke7li">
                                {item.productDescription}
                              </p>
                            </div>
                            <div className=" flex flex-col items-center">
                              <p className=" font-bold text-3xl text-custom-light-purple">
                                $ {item.productPrice}
                              </p>
                            </div>
                            <div className="flex gap-3 justify-center">
                              <AiFillPlusCircle
                                size={25}
                                className="  rounded-full ring-1 ring-custom-light-purple sm:size-7  custom-mobile:size-5"
                              />
                              <p className=" font-semibold text-base">
                                ADD TO CART
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className=" font-semibold text-xl">Coming Soon !!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Categories;

import { fetchGetBtogetherProducts } from "@/api";
import { Iproduct } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type BestBoughtWithProps = {
  id: number;
};

const BestBoughtWith = ({ id }: BestBoughtWithProps) => {
  const client = useQueryClient();

  const {
    data: BtogetherData,
    isError: BtogetherError,
    isLoading,
  } = useQuery({
    queryKey: ["bestBoughtWith"],
    queryFn: () => fetchGetBtogetherProducts(id),
  });

  useEffect(() => {
    client.invalidateQueries({ queryKey: ["bestBoughtWith"] });
  }, []);

  console.log(id, "btogether");

  if (BtogetherError) return <p> Error fetching </p>;
  if (isLoading) return <p className=" text-black"> Is Loading </p>;
  return (
    <section className="w-full h-auto  font-Poppins border-custom-ke7li text-white flex items-center justify-center">
      <div className="w-full h-auto flex flex-col gap-6">
        <p className="text-start font-Poppins text-2xl text-white font-semibold">
          99% OF PEOPLE BOUGHT THESE TOGETHER
        </p>
        <div className="w-full flex gap-2">
          {BtogetherData.length > 0 ? (
            BtogetherData.map((item: Iproduct) => (
              <div
                key={item.btoghetherId}
                className="w-40 bg-white flex flex-col gap-10 p-2 justify-center items-center"
              >
                <div className="w-32 h-40 border ">
                  <img
                    src={item.productPicture}
                    className="w-full h-full object-cover"
                    alt={item.productTitle}
                  />
                </div>
                <p className="text-sm text-center font-semibold text-black">
                  {item.productTitle.split(" ").slice(0, 2).join(" ")}
                  <br />
                  <span className=" text-custom-light-purple">
                    ${item.productPrice}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
          <div className="w-52 flex flex-col gap-1 items-center justify-center">
            <button className=" h-9 w-32 font-poppins font-semibold text-xs text-black bg-white">
              ADD ALL TO CART
            </button>
            <p className="font-semibold text-xs text-white">TOTAL : ${0}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestBoughtWith;

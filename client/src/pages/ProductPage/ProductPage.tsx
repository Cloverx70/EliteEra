import React, { useEffect } from "react";
import ProductOverview from "./components/ProductOverview";
import BestBoughtWith from "./components/BestBoughtWith";
import Reviews from "./components/Reviews";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchGetAllReviewsByProductId, fetchGetProductById } from "@/api";
import { useParams } from "react-router-dom";
import { Iproduct } from "@/interfaces";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["ProductP"],
    queryFn: () => fetchGetProductById(Number(id)),
  });

  return (
    <section className=" px-10 py-10 flex flex-col gap-5">
      <ProductOverview
        productTitle={data?.productTitle!}
        productPrice={data?.productPrice!}
        productPicture={data?.productPicture!}
        productSecondPicture={data?.productSecondPicture!}
        productThirdPicture={data?.productFourthPicure!}
        productFourthPicure={data?.productFourthPicure!}
        productDescription={data?.productDescription!}
        productAbout={data?.productAbout!}
        collectionId={0}
        productId={0}
        btoghetherId={0}
        variantId={0}
        reviewsId={0}
        productOrigin={data?.productOrigin!}
        productRating={data?.productRating!}
        productSeason={""}
        productStock={0}
      />
      <BestBoughtWith />
      <Reviews prodrating={data?.productRating} prodid={data?.productId} />
    </section>
  );
};

export default ProductPage;

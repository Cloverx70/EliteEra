import React from "react";
import ProductOverview from "./components/ProductOverview";
import BestBoughtWith from "./components/BestBoughtWith";
import Reviews from "./components/Reviews";
import { useQuery } from "@tanstack/react-query";
import { fetchGetAllReviewsByProductId, fetchGetProductById } from "@/api";
import { useParams } from "react-router-dom";
import { Iproduct } from "@/interfaces";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch the product data using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["ProductP", id], // Add id to query key for proper caching
    queryFn: async () => await fetchGetProductById(Number(id)),
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner
  }

  // Handle error state
  if (error) {
    return <div>Error loading product information</div>;
  }

  // If data is not defined, return nothing to avoid accessing undefined properties
  if (!data) {
    return null;
  }

  return (
    <section className="flex flex-col bg-white">
      <div className="p-10">
        <ProductOverview
          productTitle={data.productTitle}
          productPrice={data.productPrice}
          productPicture={data.productPicture}
          productSecondPicture={data.productSecondPicture}
          productThirdPicture={data.productThirdPicture}
          productFourthPicure={data.productFourthPicure}
          productDescription={data.productDescription}
          productAbout={data.productAbout}
          collectionId={data.collectionId || 0} // Default value if undefined
          productId={data.productId || 0}
          btoghetherId={data.btoghetherId || 0} // Default value if undefined
          variantId={data.variantId || 0}
          reviewsId={data.reviewsId || 0}
          productOrigin={data.productOrigin}
          productRating={data.productRating || 0}
          productSeason={data.productSeason || ""}
          productStock={data.productStock || 0}
        />
      </div>
      <div className="p-10 bg-custom-light-purple">
        <BestBoughtWith id={data.btoghetherId || 0} />
      </div>
      <div className="p-10 bg-white">
        <Reviews prodrating={data.productRating} prodid={data.productId} />
      </div>
    </section>
  );
};

export default ProductPage;

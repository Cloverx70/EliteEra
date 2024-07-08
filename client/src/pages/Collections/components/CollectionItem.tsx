import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { Icollection, Iproduct } from "@/interfaces"; // Ensure this interface correctly defines the collection structure
import { fetchGetAllCollectionProducts, fetchGetAllCollections } from "@/api";
import AllProducts from "./AllProducts";
import { motion } from "framer-motion";

const CollectionItem: React.FC = () => {
  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchGetAllCollections,
  });

  const {
    data: products,
    isLoading: ProductLoading,
    isError: ErrorLoading,
  } = useQuery<Iproduct[], Error>({
    queryKey: ["AllCollectionProducts", collections?.collectionId!],
    queryFn: () => fetchGetAllCollectionProducts(collections?.collectionId!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading collections.</p>;

  return (
    <section className="w-full text-white flex flex-col gap-4 py-10">
      {
        //@ts-ignore
        collections?.map((collection: Icollection) => (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            key={collection.collectionId}
            className=" w-full"
          >
            <div className="w-full h-72 bg-custom-light-purple"></div>
            <div className=" py-6">
              <p className="font-bold text-center uppercase">
                {collection.collectionTitle}
              </p>
            </div>
            <div>
              <AllProducts
                products={products!}
                isError={ErrorLoading}
                isLoading={ProductLoading}
              />
            </div>
          </motion.div>
        ))
      }
    </section>
  );
};

export default CollectionItem;

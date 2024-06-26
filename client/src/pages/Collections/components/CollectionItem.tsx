import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { Icollection } from "@/interfaces"; // Ensure this interface correctly defines the collection structure
import { fetchGetAllCollections } from "@/api";
import AllProducts from "./AllProducts";

const CollectionItem: React.FC = () => {
  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery<Icollection[]>({
    queryKey: ["collections"],
    queryFn: fetchGetAllCollections,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading collections.</p>;

  return (
    <section className="w-full text-white flex flex-col gap-4 pb-10">
      {collections?.map((collection: Icollection) => (
        <div key={collection.collectionId} className=" w-full">
          <div className="w-full h-72 bg-custom-light-purple"></div>
          <div>
            <p className="font-bold text-center">
              {collection.collectionTitle}
            </p>
          </div>
          <div>
            <AllProducts id={collection.collectionId} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default CollectionItem;

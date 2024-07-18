import React, { useEffect, useState } from "react";
import {
  fetchGetAllProducts,
  fetchGetBtogetherProducts,
  fetchGetProductById,
  fetchGetVariantsByProductId,
  fetchUpdateBtogetherProducts,
} from "@/api";
import { Iproduct, IProductVariant } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TiStarFullOutline } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { set } from "zod";
import { createToast } from "@/shared/Toast";

const ProductsScreen = () => {
  const [ProductState, setProductState] = useState({
    AddProduct: false,
    DeleteProduct: false,
    EditProduct: false,
    editProductId: 0,
  });

  const handleEditClick = (productId: number) => {
    setProductState({
      ...ProductState,
      EditProduct: true,
      editProductId: productId,
    });
  };

  return (
    <>
      <div className=" w-full flex gap-2 items-center justify-start p-5 bg-white border-b sticky">
        <div className=" flex items-center w-full justify-between">
          <button className=" w-40 h-9  bg-custom-light-purple rounded-sm  text-white">
            Select Products
          </button>
          <div className=" flex items-center justify-center gap-2">
            <button className="  w-40 h-9 bg-custom-light-purple rounded-sm text-white">
              Add Product
            </button>
            <button className="  w-40 h-9 bg-custom-light-purple rounded-sm text-white">
              Delete Products
            </button>
          </div>
        </div>
      </div>

      <section className="h-full w-full bg-custom-dark-white px-5 py-5 font-Poppins flex flex-col  items-center justify-center gap-2">
        <ProductCards
          setProductState={setProductState}
          ProductState={ProductState}
          handleEditClick={handleEditClick}
        />
      </section>
    </>
  );
};

type ProductCardsProps = {
  setProductState: React.Dispatch<
    React.SetStateAction<{
      AddProduct: boolean;
      DeleteProduct: boolean;
      EditProduct: boolean;
      editProductId: number;
    }>
  >;
  ProductState: {
    AddProduct: boolean;
    DeleteProduct: boolean;
    EditProduct: boolean;
    editProductId: number;
  };
  handleEditClick: (productId: number) => void;
};

const ProductCards = ({
  setProductState,
  ProductState,
  handleEditClick,
}: ProductCardsProps) => {
  const RatingStars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <TiStarFullOutline key={index} color="#676eff" size={15} />
    ));
  };

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Iproduct[], Error>({
    queryKey: ["products"],
    queryFn: async () => fetchGetAllProducts(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      {ProductState.EditProduct ? (
        <ProductEdit editProductId={ProductState.editProductId} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll h-full font-Poppins ">
          {products?.map((product: Iproduct) => (
            <div
              onClick={() => handleEditClick(product.productId)}
              key={product.productId}
              className="p-5 bg-white shadow-md rounded-lg flex gap-5 items-center justify-start"
            >
              <div className="w-32 h-32 object-center">
                <img
                  src={product?.productPicture}
                  className=" object-cover"
                  alt=""
                />
              </div>
              <div className=" w-full flex flex-col gap-2">
                <div className=" flex  justify-between w-full ">
                  <h2 className="text-custom-light-purple text-lg font-bold">
                    {product.productTitle}
                  </h2>
                  <div className=" flex gap-1">
                    {RatingStars(product.productRating)}
                  </div>
                </div>
                <p className="">{product.productAbout}</p>
                <div className=" flex justify-between  items-center">
                  <p className=" text-custom-light-purple font-semibold">
                    $ {product.productPrice}
                  </p>
                  <p className=" text-xs text-custom-ke7li font-bold flex gap-2">
                    <span className=" text-custom-light-purple">
                      {product.productStock}
                    </span>
                    In Stock
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

type ProductEditProps = {
  editProductId: number | null;
};

const ProductEdit = ({ editProductId }: ProductEditProps) => {
  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: async () => await fetchGetProductById(editProductId!),
  });

  const client = useQueryClient();

  // Bought Together Products

  const { data: btogetherProducts } = useQuery({
    queryKey: ["btogetherprods"],
    queryFn: async () =>
      await fetchGetBtogetherProducts(product?.btoghetherId!),
  });

  const [AddBoughtTogetherProductScreen, setAddBoughtTogetherProductScreen] =
    useState(false);

  const {
    data: allproducts,
    isPending: allproductsPending,
    isLoading: allproductsLoading,
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => await fetchGetAllProducts(),
    enabled: !AddBoughtTogetherProductScreen,
  });

  const [AddBTogetherProducts, setAddBTogetherProducts] = useState<number[]>(
    []
  );

  const handleOnAddBoughtTogetherProduct = (id: number) => {
    setAddBTogetherProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handelOnSavingBtogetherProds = async (BTogetherId: number) => {
    const res = await fetchUpdateBtogetherProducts(
      BTogetherId,
      AddBTogetherProducts
    );
    console.log(AddBTogetherProducts);

    if (res) {
      client.invalidateQueries({ queryKey: ["product"] });
      client.invalidateQueries({ queryKey: ["btogetherprods"] });
      return createToast("Bought Together Product List Updated Successfully");
    } else return createToast("Something went wrong please try again later...");
  };

  // Variants

  const [VariantNumber, setVariantNumber] = useState(0);
  const [variantValues, setVariantValues] = useState<Array<Array<string>>>([]);

  const handleAddVariantValue = (variantIndex: number) => {
    setVariantValues((prev) => {
      const updated = [...prev];
      updated[variantIndex] = [...(updated[variantIndex] || []), ""];
      return updated;
    });
  };

  const handleVariantValueChange = (
    variantIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    setVariantValues((prev) => {
      const updated = [...prev];
      updated[variantIndex][valueIndex] = newValue;
      return updated;
    });
  };

  const AddVariantForm = ({ VariantNumber }: { VariantNumber: number }) => {
    return (
      <div className=" flex flex-col gap-2">
        {Array.from({ length: VariantNumber }, (_, variantIndex) => (
          <div key={variantIndex} className=" flex gap-2">
            <div className=" flex items-center justify-start gap-2">
              <input
                type="text"
                className="w-auto h-8 text-xs text-center bg-transparent border-2 border-custom-ke7li/20 rounded-sm"
                placeholder="Variant Name"
              />
            </div>
            <div className=" flex items-center gap-2">
              {variantValues[variantIndex]?.map((value, valueIndex) => (
                <input
                  key={valueIndex}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleVariantValueChange(
                      variantIndex,
                      valueIndex,
                      e.target.value
                    )
                  }
                  className="w-20 h-8 text-xs text-center bg-transparent border-2 border-custom-ke7li/20 rounded-sm"
                  placeholder="value"
                />
              ))}
              <div
                onClick={() => handleAddVariantValue(variantIndex)}
                className="w-12 h-8 text-custom-ke7li bg-transparent border-2 border-custom-ke7li/20 rounded-sm py-2 px-3 text-xs flex items-center justify-center"
              >
                <FaPlus />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const [ProductEditInputs, setProductEditInputs] = useState({
    productTitle: product?.productTitle,
    productPrice: product?.productPrice,
    productStock: product?.productStock,
    productAbout: product?.productAbout,
    productRating: product?.productRating,
    productOrigin: product?.productOrigin,
    productDescription: product?.productDescription,
    productPicture: product?.productPicture,
    productSecondPicture: product?.productSecondPicture,
    productThirdPicture: product?.productThirdPicture,
    productFourthPicure: product?.productFourthPicure,
  });

  useEffect(() => {
    setProductEditInputs({
      ...ProductEditInputs,
      productTitle: product?.productTitle,
      productPrice: product?.productPrice,
      productStock: product?.productStock,
      productAbout: product?.productAbout,
      productRating: product?.productRating,
      productOrigin: product?.productOrigin,
      productDescription: product?.productDescription,
      productPicture: product?.productPicture,
      productSecondPicture: product?.productSecondPicture,
      productThirdPicture: product?.productThirdPicture,
      productFourthPicure: product?.productFourthPicure,
    });
  }, [product]);

  const { data: productVariants } = useQuery({
    queryKey: ["productvariants"],
    queryFn: async () => await fetchGetVariantsByProductId(editProductId!),
  });

  return (
    <form className="w-full h-full  font-Poppins flex flex-col gap-5 text-custom-ke7li">
      <div className=" w-full flex flex-col gap-2 bg-white p-3 rounded-sm">
        <label htmlFor="" className=" text-black font-semibold ">
          Product Name
        </label>
        <input
          type="text"
          value={ProductEditInputs.productTitle}
          className=" w-1/2 h-10 bg-transparent border-2 border-custom-ke7li/20 rounded-sm px-2  text-xs"
        />
      </div>

      <div className=" w-full flex flex-col gap-2 bg-white p-3 rounded-sm">
        <label htmlFor="" className=" text-black font-semibold ">
          Product Description
        </label>
        <textarea
          name=""
          id=""
          value={ProductEditInputs.productAbout}
          className=" w-[90%] h-60 border-2 border-custom-ke7li/20 rounded-sm p-2 text-xs"
        ></textarea>
      </div>

      <div></div>

      <div className="bg-white p-3 rounded-sm flex flex-col gap-5 ">
        <div>
          <p className=" font-semibold  text-black">Product Images</p>
        </div>
        <div className=" w-full flex justify-end px-4">
          <p className=" text-custom-light-purple text-sm font-semibold">
            Edit Images
          </p>
        </div>
        <div className=" flex gap-1  ">
          <div className="w-[324px] h-[324px] overflow-hidden border ">
            <img
              src={ProductEditInputs?.productPicture}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className=" grid grid-cols-2 gap-1">
            <div className=" w-40 h-40 overflow-hidden border">
              <img
                src={ProductEditInputs?.productSecondPicture}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-40 h-40 overflow-hidden border">
              <img
                src={ProductEditInputs?.productThirdPicture}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-40 h-40 overflow-hidden border ">
              <img
                src={ProductEditInputs?.productFourthPicure}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-10  w-full p-5 bg-white rounded-sm">
        <div>
          <p className="font-semibold text-black">General Information</p>
        </div>
        <div className=" w-full flex ">
          <div className=" flex flex-col justify-center items-center gap-5 w-full">
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="" className=" text-black font-semibold text-sm ">
                Origin
              </label>
              <input
                type="text"
                value={ProductEditInputs?.productOrigin}
                className=" w-1/2 h-8 bg-transparent border-2  border-custom-ke7li/20 rounded-sm px-2  text-xs"
              />
            </div>
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="" className=" text-black font-semibold text-sm ">
                Product Price
              </label>
              <input
                type="text"
                value={ProductEditInputs?.productPrice}
                className=" w-1/2 h-8 bg-transparent border-2 border-custom-ke7li/20 rounded-sm px-2 text-xs"
              />
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center gap-5 w-full">
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="" className=" text-black font-semibold text-sm">
                Stock
              </label>
              <input
                type="text"
                value={ProductEditInputs?.productStock}
                className=" w-1/2 h-8 bg-transparent border-2  border-custom-ke7li/20 rounded-sm px-2 text-xs"
              />
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="" className=" text-black font-semibold text-sm">
                Background Title
              </label>
              <input
                type="text"
                value={ProductEditInputs?.productDescription}
                className=" w-1/2 h-8 bg-transparent border-2  border-custom-ke7li/20 rounded-sm  px-2 text-xs"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-10 w-full h-full bg-white p-5">
        <p className="font-semibold text-black">Variants</p>
        {productVariants?.map((item: IProductVariant) => {
          return (
            <div className=" flex items-center justify-center gap-5">
              <label htmlFor="" className=" text-black font-semibold text-sm ">
                {item?.VariantName}
              </label>
              <div className=" flex  justify-start w-full items-center py-2 px-3 gap-3">
                {Object.values(item?.VariantDetails).map((Detail) => {
                  return (
                    <div className=" w-auto text-center    text-xs">
                      <input
                        type="text"
                        value={Detail}
                        className="w-12 h-8 text-center bg-transparent border-2  border-custom-ke7li/20 rounded-sm"
                      />
                    </div>
                  );
                })}
                <div className=" w-12 h-8  text-custom-ke7li bg-transparent border-2 border-custom-ke7li/20 rounded-sm py-2 px-3 text-xs flex items-center justify-center">
                  <FaPlus />
                </div>
              </div>
            </div>
          );
        })}
        <div className=" w-full h-[1px] bg-custom-ke7li/50 border-0 border-t-[2px]" />{" "}
        {VariantNumber > 0 && (
          <div>
            <AddVariantForm VariantNumber={VariantNumber} />
          </div>
        )}{" "}
        <div
          onClick={() => setVariantNumber((prev) => prev + 1)}
          className=" w-[20%] h-8 gap-2  text-custom-ke7li bg-transparent border-2 border-custom-ke7li/20 rounded-sm py-2 px-3 text-xs flex items-center justify-center"
        >
          <p className=" ">Add Variant</p>
          <FaPlus />
        </div>
      </div>
      <div className=" w-full h-full bg-white p-4 rounded-sm flex flex-col gap-5">
        <p className=" font-semibold text-black">Bought Together Products</p>
        <div className=" flex  gap-5">
          {btogetherProducts?.map((item: Iproduct) => {
            return (
              <div className="w-40 h-full flex flex-col gap-2 p-5 items-center justify-between border">
                <div className="w-32 h-32 overflow-hidden border">
                  <img
                    className=" object-contain w-full h-full"
                    src={item?.productPicture}
                    alt=""
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <p className=" font-semibold text-black text-lg">
                    {item.productTitle.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className=" text-custom-light-purple ">
                    $ {item?.productPrice}
                  </p>
                </div>
              </div>
            );
          })}
          <Dialog onOpenChange={() => setAddBTogetherProducts([])}>
            {" "}
            <DialogTrigger>
              <div className="w-40 h-full  flex flex-col gap-2 p-5 items-center justify-center border border-custom-ke7li text-3xl  text-custom-ke7li ">
                +<p className=" text-sm text-custom-ke7li">Add Product</p>
              </div>
            </DialogTrigger>
            <DialogContent className=" max-w-xl  p-5 outline-none ">
              <DialogHeader className=" px-5 flex flex-col gap-10">
                <p className=" text-black font-semibold text-start text-lg">
                  Select Products To Add
                </p>
                <div className=" w-full grid grid-cols-3 justify-items-center gap-2 ">
                  {allproductsLoading || allproductsPending ? (
                    <p>Loading</p>
                  ) : (
                    allproducts?.map((item: Iproduct) => {
                      return (
                        <div
                          onClick={() =>
                            handleOnAddBoughtTogetherProduct(item.productId)
                          }
                          className={`${
                            AddBTogetherProducts.includes(item?.productId)
                              ? " bg-gray-200"
                              : "bg-white "
                          } w-40 flex flex-col cursor-pointer  border p-2`}
                        >
                          <div className=" h-32 w-32 object-center flex items-center justify-center">
                            <img
                              src={item?.productPicture}
                              className=" w-full h-full object-contain "
                              alt=""
                            />
                          </div>
                          <div className=" flex flex-col justify-center items-start p-2">
                            <p className=" text-black">
                              {item?.productTitle
                                .split(" ")
                                .splice(0, 2)
                                .join(" ")}
                            </p>
                            <p className=" text-xs text-custom-light-purple">
                              $ {item?.productPrice}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className=" flex items-center justify-start">
                  <DialogTrigger>
                    <button
                      onClick={() =>
                        handelOnSavingBtogetherProds(product?.productId!)
                      }
                      className=" w-36 h-9 bg-custom-light-purple text-white"
                    >
                      Save
                    </button>
                  </DialogTrigger>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" w-full p-5 flex justify-start items-center ">
        <button className=" w-44 h-10 bg-custom-light-purple text-white rounded-sm">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProductsScreen;

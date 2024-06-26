import {
  fetchCheckoutByUserProductIdAndUserId,
  fetchGetAllUserProducts,
  fetchGetCheckoutByUserProductAndUserId,
  fetchRemoveUserProduct,
  fetchUpdateUserCartByUserId,
} from "@/api";
import { IUserCheckout, IuserProduct, UserData } from "@/interfaces";
import { createToast } from "@/shared/Toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type CheckoutProps = {
  Status: UserData | null;
  subtotal: number;
  setCheckout: React.Dispatch<
    React.SetStateAction<{
      paymentMethod: string;
      promocode: string;
      changefor: number;
      orderName: string;
      orderEmail: string;
      orderPhone: number;
      orderAddress: string;
      specialInstructions: string;
    }>
  >;
  Checkout: {
    paymentMethod: string;
    promocode: string;
    changefor: number;
    orderName: string;
    orderEmail: string;
    orderPhone: number;
    orderAddress: string;
    specialInstructions: string;
  };
};

const CheckoutBar: React.FC<CheckoutProps> = ({
  subtotal,
  Checkout,
  setCheckout,
  Status,
}: CheckoutProps) => {
  const [userproductIds, setUserproductIds] = useState<{
    [key: string]: number;
  }>({});

  const handleOnChangePromocode = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckout({ ...Checkout, promocode: e.target.value });
  };

  const navigate = useNavigate();
  const client = useQueryClient();
  const handleRemoveUserProductsOnClick = async () => {
    try {
      userproducts.forEach(async (element: IuserProduct) => {
        await fetchRemoveUserProduct(
          element.userProductId,
          Status?.userId!,
          ""
        );
        await fetchUpdateUserCartByUserId(
          Status?.userId!,
          -element.productPrice,
          -element.qty,
          ""
        );

        client.invalidateQueries({
          queryKey: ["cart"],
        });

        client.invalidateQueries({
          queryKey: ["CartItems"],
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClickCheckout = async () => {
    try {
      const checkout = await fetchCheckoutByUserProductIdAndUserId(
        Status?.userId!,
        userproductIds,
        Checkout.promocode,
        Checkout.paymentMethod,
        Checkout.specialInstructions,
        Checkout.orderName,
        Checkout.orderEmail,
        Checkout.orderPhone,
        Checkout.changefor
      );
      if (checkout) {
        createToast("You successfully checked out");
        await handleRemoveUserProductsOnClick();
        const checkobj = await fetchGetCheckoutByUserProductAndUserId(
          Status?.userId!,
          userproductIds
        );
        if (checkobj) {
          navigate(`${checkout?.paymentMethod}/${checkout?.checkoutId},`, {
            state: { scrollTo: "whishtowhishref" },
          });
        }
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      // Handle error or show message
    }
  };

  const { data: userproducts } = useQuery({
    queryKey: ["userproducts"],
    queryFn: () => fetchGetAllUserProducts(Status?.userId!, " "),
  });

  useEffect(() => {
    if (userproducts) {
      const ids: { [key: string]: number } = {};
      userproducts.forEach((element: any) => {
        if (!ids[element.userProductId]) {
          ids[element.userProductId] = element.userProductId;
        }
      });
      setUserproductIds(ids);
    }
  }, [userproducts]);

  return (
    <section className="h-60 bg-white font-Poppins font-bold text-sm p-4">
      <div className="h-full flex flex-col justify-between">
        <div>
          <p>Enter Promo Code</p>

          <div className="flex gap-2">
            <input
              onChange={handleOnChangePromocode}
              className="bg-transparent border-2 border-custom-light-purple w-60 h-7 px-2 outline-none"
              value={Checkout.promocode}
              type="text"
            />
            <button
              onClick={handleOnClickCheckout}
              className="w-32 h-[28.5px] font-normal bg-custom-dark-ke7li text-white"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-normal">Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-normal">Shipping Cost</p>
            <p>$3.5</p>
          </div>
          <div className="flex justify-between">
            <p>Estimated Total</p> <p>${subtotal + 3.5}</p>
          </div>
        </div>

        <button
          onClick={handleOnClickCheckout}
          className="w-full h-8 border-2 border-custom-light-purple hover:bg-custom-light-purple hover:border-none delay-100 ease-linear transition-all"
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default CheckoutBar;

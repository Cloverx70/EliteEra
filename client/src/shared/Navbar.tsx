import React, { useEffect, useState } from "react";
import { FaCircleUser, FaCartShopping } from "react-icons/fa6";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { CgMenu } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGetAllUserProducts,
  fetchGetUserCartByUserId,
  fetchRemoveUserProduct,
  fetchUpdateUserCartByUserId,
} from "../api";
import { Icart, IuserProduct } from "@/interfaces";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyStatusContext, useStatus } from "@/contexts/statusContext";
import { VscClose } from "react-icons/vsc";
import { createToast } from "./Toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Spinner from "./Spinner";
import { CartItemsSkeleton } from "@/Skeletons/CartItemsSkeleton.1";
import { FaShoppingCart } from "react-icons/fa";
import SecondaryNavBar from "@/components/EliteEraComponents/SecondaryNavBar";

type NavProps = {
  NavBgColor: string;
};

const Navbar = ({ NavBgColor }: NavProps) => {
  const client = useQueryClient();
  const { Status, setStatus, statusLoading } = useStatus();
  console.log(Status);
  const [Token, setToken] = useState("");

  const {
    data: cartitems,
    isLoading: cartloading,
    isError: carterror,
    refetch: refetchCartItems,
  } = useQuery({
    queryKey: ["CartItems"],
    queryFn: async () => await fetchGetAllUserProducts(Status!.userId)!,
  });

  const { data: UserCart, refetch: refetchUserCart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () =>
      await fetchGetUserCartByUserId(
        Status!.userId,
        localStorage.getItem("token")!
      ),
  });

  useEffect(() => {
    //@ts-ignore
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    client.invalidateQueries({ queryKey: ["status"] });
    client.invalidateQueries({ queryKey: ["user"] });
  };

  const handleOnClickDelete = async (
    userproductid: number,
    userid: number,
    prodprice: number,
    qty: number
  ) => {
    await fetchRemoveUserProduct(userproductid, userid, Token);

    await fetchUpdateUserCartByUserId(userid, -prodprice, -qty, Token);

    refetchUserCart();
    refetchCartItems();
  };

  const handleNavigateToCheckout = (cartitems: IuserProduct | undefined) => {
    //@ts-ignore
    if (cartitems.length > 0) navigate("/checkout");
    else createToast("You can't checkout on an empty cart");
  };

  return (
    <section className={`${NavBgColor}  w-full pl-10 pr-10 `}>
      <div className="flex py-6 justify-between items-center">
        <div className="flex custom-mobile:w-[499px] custom-mobile:justify-between custom-mobile:items-center">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="font-bold text-2xl sm:text-xl font-Poppins cursor-pointer"
          >
            ELI
            <span
              className={`${
                location.pathname === "/admin"
                  ? " text-white"
                  : " text-custom-light-purple"
              }`}
            >
              TE E
            </span>
            RA
          </p>
          <div className="sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
            <CgMenu size={23} className="font-bold" />
          </div>
        </div>
        <div className="lg:hidden md:w-5 sm:hidden custom-mobile:hidden"></div>
        <div className="flex gap-7 text-sm font-semibold md:text-xs sm:text-xs custom-mobile:hidden">
          <p
            onClick={() => navigate("/products")}
            className={` ${
              location.pathname === "/products"
                ? "text-custom-light-purple"
                : ""
            } cursor-pointer hover:text-custom-light-purple transition-all delay-100  ease-in-out`}
          >
            Catalog
          </p>
          <p
            onClick={() => navigate("/collections")}
            className={` ${
              location.pathname === "/collections"
                ? "text-custom-light-purple"
                : ""
            } cursor-pointer hover:text-custom-light-purple transition-all delay-100  ease-in-out`}
          >
            Collections
          </p>
          <p
            onClick={() => navigate("/contactus")}
            className={` ${
              location.pathname === "/contactus"
                ? "text-custom-light-purple"
                : ""
            } cursor-pointer hover:text-custom-light-purple transition-all delay-100  ease-in-out`}
          >
            Contact
          </p>
          <p
            className={` ${
              location.pathname === "/aboutus" ? "text-custom-light-purple" : ""
            } cursor-pointer hover:text-custom-light-purple transition-all delay-100  ease-in-out`}
          >
            About Us
          </p>
        </div>
        <div className="mb-3 mr-28 sm:hidden md:ml-4 custom-mobile:hidden">
          <p className="cursor-pointer hover:text-white transition-all delay-100  ease-in-out text-2xl custom-mobile:hidden text-custom-light-purple ">
            ...
          </p>
        </div>
        <div className="w-72 lg:w-5 md:hidden sm:hidden custom-mobile:hidden"></div>
        <div className="flex gap-10 sm:gap-4 md:gap-4 items-center custom-mobile:hidden">
          <div className="flex gap-3 text-sm font-semibold items-center">
            {Token ? (
              <div className=" flex items-center gap-7">
                {statusLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <Sheet>
                      <SheetTrigger>
                        {Status?.userpfp ? (
                          <div className="w-7 h-7 rounded-full ring-1 ring-white p-1 flex items-center justify-center">
                            <img
                              src={Status?.userpfp}
                              alt=""
                              className=" object-cover rounded-full flex items-center justify-center "
                            />
                          </div>
                        ) : (
                          <FaCircleUser
                            size={22}
                            className="text-custom-dark-ke7li cursor-pointer bg-custom-ke7li rounded-full ring-1 ring-custom-light-purple"
                          />
                        )}{" "}
                      </SheetTrigger>
                      <SheetContent
                        side={"top"}
                        className=" bg-custom-dark-ke7li border-none w-full h-48"
                      >
                        <SecondaryNavBar />
                      </SheetContent>
                      <SheetTrigger>
                        <p className="md:text-xs sm:hidden hover:text-custom-light-purple transition-all delay-100 ease-in-out cursor-pointer">
                          {Status?.username}
                        </p>
                      </SheetTrigger>
                    </Sheet>
                    <div className="w-[1px] h-[20px] bg-white/30" />
                    <p
                      onClick={handleLogout}
                      className="md:text-xs sm:hidden hover:text-custom-light-purple transition-all delay-100 ease-in-out cursor-pointer"
                    >
                      Logout
                    </p>
                  </>
                )}
              </div>
            ) : (
              <p
                onClick={() => navigate("/login")}
                className="md:text-xs sm:hidden hover:text-custom-light-purple transition-all delay-100 ease-in-out cursor-pointer"
              >
                {location.pathname === "/login" ? "" : "Login"}
              </p>
            )}
          </div>

          {Token ? (
            <>
              <div className="w-[1px] h-[20px] bg-white/30" />
              <Sheet>
                <SheetTrigger>
                  <div
                    className={`${
                      location.pathname === "/admin"
                        ? "bg-white text-custom-light-purple"
                        : ""
                    } w-7 h-7 rounded-full cursor-pointer text-center bg-custom-light-purple`}
                  >
                    <p className="text-xs font-bold pt-1.5 flex items-center justify-center">
                      {cartloading ? <Spinner /> : UserCart?.cartItemsNumber}
                    </p>
                    <p
                      className={`${
                        location.pathname === "/admin" ? "hidden" : " "
                      } text-sm font-bold  mt-5 rotate-90 hover:text-custom-light-purple transition-all delay-100 ease-in-out`}
                    >
                      {cartloading ? <Spinner /> : "$" + UserCart?.cartTotal}
                    </p>
                  </div>
                </SheetTrigger>
                <SheetContent className=" w-[550px] h-full bg-custom-dark-ke7li border-l-0">
                  <SheetHeader className=" h-full">
                    <SheetTitle className=" text-start font-bold flex items-center gap-3 font-Poppins ">
                      <FaCartShopping className=" text-custom-light-purple" />{" "}
                      <p className=" text-white">CART</p>
                    </SheetTitle>
                    <SheetDescription className="h-full">
                      {cartitems?.length === 0 ? (
                        <div className=" w-full h-full flex flex-col gap-4 items-center justify-center">
                          <p className="text-poppins text-lg  text-white font-semibold">
                            Your cart is empty..
                          </p>
                          <SheetTrigger>
                            <button
                              onClick={() => navigate("/products")}
                              className="w-40 h-9 bg-custom-light-purple text-poppins text-xs font-bold text-white
                           hover:text-white transition-all delay-100 ease-linear hover:bg-transparent hover:border-2 border-white"
                            >
                              Browse More
                            </button>
                          </SheetTrigger>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <div className=" w-full h-[0.5px] bg-custom-ke7li/15" />
                          <Table className="h-full w-full">
                            <TableHeader className=" w-full h-full">
                              <TableRow className="hover:bg-transparent w-full h-full">
                                <TableHead className="w-[100px] text-custom-light-purple font-bold text-xs font-Poppins">
                                  ITEM
                                </TableHead>
                                <TableHead className=""></TableHead>
                                <TableHead className=" text-white font-bold text-xs font-Poppins">
                                  QTY
                                </TableHead>
                                <TableHead className="text-white font-bold text-right text-xs font-Poppins">
                                  TOTAL
                                </TableHead>
                              </TableRow>
                            </TableHeader>

                            <div className="w-full h-[400px] overflow-y-scroll ">
                              <TableBody className=" w-full h-full">
                                {/*@ts-ignore */}
                                {cartloading ? (
                                  <CartItemsSkeleton />
                                ) : (
                                  cartitems?.map((item: IuserProduct) => {
                                    return (
                                      <TableRow
                                        key={item?.userProductId}
                                        className="hover:bg-transparent"
                                      >
                                        <TableCell className="w-[100px]">
                                          {/*@ts-ignore */}
                                          <img
                                            src={item?.productPicture || ""}
                                            alt=""
                                          />
                                        </TableCell>
                                        <TableCell className=" text-custom-ke7li">
                                          {item?.productTitle}
                                        </TableCell>
                                        <TableCell className=" text-custom-ke7li">
                                          <div className=" flex gap-2 items-center justify-center">
                                            {item?.qty === 1 ? (
                                              <RiDeleteBin5Fill
                                                onClick={() =>
                                                  handleOnClickDelete(
                                                    item.userProductId,
                                                    item.userId,
                                                    item.productPrice,
                                                    item.qty
                                                  )
                                                }
                                                size={10}
                                                className="text-white hover:text-custom-light-purple cursor-pointer transition-all delay-100  ease-in-out"
                                              />
                                            ) : (
                                              <IoMdRemove
                                                size={10}
                                                className=" text-white hover:text-custom-light-purple cursor-pointer transition-all delay-100  ease-in-out"
                                              />
                                            )}
                                            <p className=" cursor-default">
                                              {item?.qty}
                                            </p>
                                            <IoMdAdd
                                              size={10}
                                              className="text-white hover:text-custom-light-purple cursor-pointer transition-all delay-100  ease-in-out"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-right  text-custom-ke7li">
                                          ${item?.productPrice}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                                )}
                              </TableBody>
                            </div>

                            <TableFooter className="bg-transparent">
                              <TableRow className="hover:bg-transparent w-full">
                                <TableCell className="w-[100px] text-custom-light-purple text-xs font-Poppins font-bold">
                                  TOTAL CART
                                </TableCell>
                                <TableCell
                                  colSpan={4}
                                  className="text-white text-right"
                                >
                                  ${UserCart?.cartTotal}
                                </TableCell>
                              </TableRow>{" "}
                            </TableFooter>
                          </Table>
                          <SheetTrigger
                            onClick={() => handleNavigateToCheckout(cartitems)}
                            className="  hover:bg-custom-light-purple hover:border-none transition-all delay-100 ease-linear bottom-0 w-full h-10 bg-transparent border border-white text-white outline-none font-Poppins text-sm font-bold"
                          >
                            <button>Checkout</button>
                          </SheetTrigger>
                        </>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;

import {
  fetchGetAllCheckoutsByUserId,
  fetchGetAllUsers,
  fetchRemoveUserById,
  FetchUpdateUserById,
} from "@/api";
import { useStatus } from "@/contexts/statusContext";
import { IUserCheckout, UserData } from "@/interfaces";
import Spinner from "@/shared/Spinner";
import { Item } from "@radix-ui/react-select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import {
  FaCircleUser,
  FaGalacticSenate,
  FaLocationDot,
  FaUser,
} from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { ImStatsBars } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UsersScreen = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchGetAllUsers(),
  });

  const [UserState, setUserState] = useState({
    state: false,
    user: {} as UserData,
  });

  return (
    <>
      <section className="w-full h-full font-Poppins overflow-y-scroll">
        {UserState.state === false ? (
          <div>
            {
              <div className=" w-full h-full p-5  flex flex-col gap-5">
                {users?.map((item: UserData) => {
                  return (
                    <div
                      key={item.userId}
                      className="bg-white w-full h-auto justify-between flex  p-5"
                      onClick={() => setUserState({ state: true, user: item })}
                    >
                      <div className=" flex justify-start items-center  ">
                        <div className="  px-5 ">
                          {item.userpfp !== "" ? (
                            <div className="w-14 h-14 object-cover">
                              <img
                                src={item?.userpfp}
                                alt={"pfp"}
                                className="object-cover w-full h-full  ring ring-custom-light-purple rounded-full p-0.5"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 object-cover">
                              <FaCircleUser className="object-center w-full h-full text-custom-dark-ke7li cursor-pointer bg-white rounded-full ring  p-0.5 ring-custom-light-purple" />
                            </div>
                          )}
                        </div>
                        <div className=" flex flex-col items-start justify-center  p-5 ">
                          <p className=" text-xl font-semibold text-custom-light-purple">
                            {item.username}
                          </p>
                          <p className=" text-sm font-cabin font-bold text-custom-ke7li">
                            {item.email}
                          </p>
                        </div>
                      </div>
                      <div className="w-auto flex items-center justify-centers p-5">
                        <p className=" text-center font-semibold flex items-center justify-center text-custom-light-purple ">
                          Total Spendings <br /> ${item.totalSpendings}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          </div>
        ) : (
          <UserScreen
            user={UserState.user}
            setUserState={setUserState}
            userstate={UserState}
          />
        )}
      </section>
    </>
  );
};

type userScreenProps = {
  user: UserData;
  userstate: { state: boolean; user: UserData };
  setUserState: React.Dispatch<
    React.SetStateAction<{ state: boolean; user: UserData }>
  >;
};

export const UserScreen = ({
  user,
  setUserState,
  userstate,
}: userScreenProps) => {
  const { Status } = useStatus();

  const { data: usercheckouts } = useQuery<IUserCheckout[]>({
    queryKey: ["usercheckouts"],
    queryFn: () => fetchGetAllCheckoutsByUserId(user.userId),
  });
  console.log(usercheckouts);
  const [EditMode, setEditMode] = useState({
    editMode: false,
    isLoading: false,
  });
  const [EditInputs, setEditInputs] = useState({
    username: user.username,
    fullName: user.fullname,
    email: user.email,
    addressone: user.addressOne,
    addresstwo: user.addressTwo,
  });
  const [ViewOrdersMode, setViewOrdersMode] = useState({
    state: false,
    isLoading: false,
  });
  const client = useQueryClient();

  const handleOnSubmitEditChanges = async () => {
    setEditMode({ ...EditMode, isLoading: true });
    const update = await FetchUpdateUserById(
      Status?.userId!,
      EditInputs.username,
      EditInputs.fullName,
      EditInputs.email,
      EditInputs.addressone,
      EditInputs.addresstwo
    );
    if (update) {
      client.invalidateQueries({ queryKey: ["user"] });
      setEditMode({ ...EditMode, isLoading: false, editMode: false });
    }
  };

  const handleOnClickCloseAccount = async () => {
    const response = await fetchRemoveUserById(user.userId);

    if (response) {
      client.invalidateQueries({ queryKey: ["users"] });
      setUserState({ ...userstate, state: false });
    }
  };

  return (
    <section className=" w-full h-full bg-custom-dark-white rounded-sm p-5 font-Poppins flex flex-col gap-5">
      <div className="w-full h-auto flex items-center justify-end">
        <div
          className={`w-auto h-auto flex gap-3 items-center justify-end  ${
            EditMode.editMode
              ? " bg-custom-light-purple text-white"
              : "bg-white"
          } p-2 px-4 rounded-md`}
        >
          {!EditMode.editMode ? (
            <button
              className=" w-24 h-5 flex items-center justify-center gap-3 cursor-pointer"
              onClick={() =>
                setEditMode({ ...EditMode, editMode: !EditMode.editMode })
              }
            >
              <HiMiniPencilSquare
                size={20}
                className=" text-custom-light-purple"
              />
              <p className=" text-sm text-custom-ke7li">Edit Info</p>
            </button>
          ) : (
            <button
              className=" w-24 h-5 flex items-center justify-center gap-3 cursor-pointer"
              onClick={handleOnSubmitEditChanges}
              disabled={EditMode.isLoading}
            >
              {!EditMode.isLoading ? (
                <>
                  {" "}
                  <FaSave size={19} className=" text-white" />
                  <p className=" text-sm text-white">Save</p>
                </>
              ) : (
                <Spinner />
              )}
            </button>
          )}
        </div>
      </div>
      {/* Personal Information*/}
      <div className=" bg-white w-full h-auto flex-col p-7">
        <div className=" flex  gap-3 items-center pb-10">
          <FaUser size={20} className="text-custom-light-purple " />
          <p className=" text-custom-ke7li  text-lg ">Personal Information</p>
        </div>

        <div className="w-full h-auto flex items-start justify-start  gap-10">
          <div className=" w-16 h-16 rounded-full flex items-center justify-center ">
            <img
              src={user.userpfp}
              className=" object-cover rounded-full"
              alt=""
            />
          </div>
          <div className=" flex flex-col items-start text-[15px] justify-center gap-2">
            <label htmlFor="" className="font-Poppins">
              Username
            </label>
            <input
              type="text"
              className={` w-72 h-8  outline-none p-2   border rounded-sm ${
                EditMode.editMode
                  ? "bg-custom-dark-white"
                  : "bg-slate-200 cursor-not-allowed text-custom-ke7li"
              }`}
              value={EditInputs.username}
              disabled={!EditMode.editMode}
              onChange={(e) =>
                setEditInputs({ ...EditInputs, username: e.target.value })
              }
            />
          </div>
          <div className=" flex flex-col items-start justify-center text-[15px] gap-2">
            <label htmlFor="" className=" font-Poppins">
              Email
            </label>
            <input
              type="text"
              className={` w-72 h-8  outline-none p-2  bg-custom-dark-white border rounded-sm ${
                EditMode.editMode
                  ? "bg-custom-dark-white"
                  : "bg-slate-200 cursor-not-allowed text-custom-ke7li"
              } `}
              value={EditInputs.email}
              disabled={!EditMode.editMode}
              onChange={(e) =>
                setEditInputs({ ...EditInputs, email: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      {/* Addresses */}
      <div className=" w-full h-auto gap-7 bg-white flex flex-col justify-between rounded-sm p-7">
        <div className=" w-full h-auto flex items-center justify-start gap-3 ">
          <FaLocationDot size={20} className=" text-custom-light-purple " />
          <p className=" text-custom-ke7li text-lg">Addresses</p>
        </div>
        <div className=" w-full h-auto flex gap-10">
          <div className="w-full h-auto flex flex-col items-start text-[15px] justify-center gap-2">
            <label htmlFor="" className="font-Poppins">
              Address 1
            </label>
            <input
              type="text"
              className={`w-full h-9  outline-none p-2 bg-custom-dark-white border rounded-sm ${
                EditMode.editMode
                  ? "bg-custom-dark-white"
                  : "bg-slate-200 cursor-not-allowed text-custom-ke7li"
              }`}
              value={EditInputs.addressone}
              disabled={!EditMode.editMode}
              onChange={(e) =>
                setEditInputs({ ...EditInputs, addressone: e.target.value })
              }
            />
          </div>
          <div className="w-full h-auto flex flex-col items-start text-[15px] justify-center gap-2">
            <label htmlFor="" className="font-Poppins">
              Address 2
            </label>
            <input
              type="text"
              className={` w-full h-9  outline-none p-2 bg-custom-dark-white border rounded-sm ${
                EditMode.editMode
                  ? "bg-custom-dark-white"
                  : "bg-slate-200 cursor-not-allowed text-custom-ke7li"
              }`}
              value={EditInputs.addresstwo}
              disabled={!EditMode.editMode}
              onChange={(e) =>
                setEditInputs({ ...EditInputs, addresstwo: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      {/* User Stats */}
      <div className=" w-full h-auto bg-custom-dark-white">
        <div className="  w-full h-auto gap-7 bg-white flex flex-col justify-between rounded-sm p-7">
          <div className=" flex  w-full h-auto gap-3 items-center justify-start ">
            <ImStatsBars size={22} className=" text-custom-light-purple " />
            <p className=" text-custom-ke7li text-lg">User Stats</p>
          </div>
          <div className=" w-full h-auto flex gap-3 bg-white ">
            <StatCards
              CardName="Total Spendings"
              CardValue={`$ ${Status?.totalSpendings}`}
            />
            <StatCards
              CardName="Ongoing Orders"
              CardValue={`${Status?.ongoingOrders}`}
            />
            <StatCards
              CardName="Completed Orders"
              CardValue={`${Status?.completedOrders}`}
            />
            <StatCards
              CardName="Canceled Orders"
              CardValue={`${Status?.cancelledOrders}`}
            />
          </div>
        </div>
      </div>
      {/* Admin User Options */}
      <div className=" w-full h-auto flex flex-col items-start justify-center gap-7 bg-white p-7">
        <div className=" flex gap-3 items-center justify-start">
          <BsLightningChargeFill
            size={20}
            className=" text-custom-light-purple"
          />
          <p className=" text-lg text-custom-ke7li">Actions</p>
        </div>
        <div className=" flex gap-3 justify-start items-center text-white">
          <button
            onClick={handleOnClickCloseAccount}
            className=" w-40 h-9 rounded-md bg-red-800 cursor-pointer"
          >
            Close Account
          </button>

          <Dialog>
            <DialogTrigger>
              <button className=" w-40 h-9 rounded-md bg-custom-light-purple cursor-pointer">
                View Orders
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Orders</DialogTitle>
                <DialogDescription>
                  <p> </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

type StatCardsProps = {
  CardName: string;
  CardValue: string;
};

const StatCards = ({ CardName, CardValue }: StatCardsProps) => {
  return (
    <div className="w-full bg-custom-light-purple text-white p-4 font-Poppins ">
      <p className=" font-semibold text-xl">{CardName}</p>
      <p className=" font-medium text-lg">{CardValue}</p>
    </div>
  );
};

export default UsersScreen;

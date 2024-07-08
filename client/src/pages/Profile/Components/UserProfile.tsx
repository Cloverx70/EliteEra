import { FetchUpdateUserById } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import Spinner from "@/shared/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PfpChange from "./PfpChange";

const UserProfile = () => {
  const client = useQueryClient();
  const { Status } = useStatus();
  const [EditMode, setEditMode] = useState<boolean>(false);
  const [pfpedit, setPfpedit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [MouseState, setMouseState] = useState(false);
  const [InputChange, setInputChange] = useState({
    FullName: Status?.fullname,
    Username: Status?.username,
    Email: Status?.email,
    AddressOne: Status?.addressOne,
    AddressTwo: Status?.addressTwo,
  });

  useEffect(() => {
    setInputChange({
      ...InputChange,
      FullName: Status?.fullname,
      Username: Status?.username,
      Email: Status?.email,
      AddressOne: Status?.addressOne,
      AddressTwo: Status?.addressTwo,
    });
  }, [Status]);

  const handleOnClickChangeFullName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (EditMode) setInputChange({ ...InputChange, FullName: e.target.value });
  };
  const handleOnClickChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (EditMode) setInputChange({ ...InputChange, Username: e.target.value });
  };
  const handleOnClickChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (EditMode) setInputChange({ ...InputChange, Email: e.target.value });
  };
  const handleOnClickChangeAddressOne = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (EditMode)
      setInputChange({ ...InputChange, AddressOne: e.target.value });
  };
  const handleOnClickSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const update = await FetchUpdateUserById(
      Status?.userId!,
      InputChange.Username!,
      InputChange.FullName!,
      InputChange.Email!,
      InputChange.AddressOne!,
      InputChange.AddressTwo!
    );
    if (update) {
      client.invalidateQueries({ queryKey: ["user"] });
      setLoading(false);
      setEditMode(false);
    }
  };
  return (
    <section className=" w-full h-full font-Poppins flex flex-col gap-5">
      <div
        onClick={() => window.history.back()}
        className=" w-auto h-auto p-3 flex items-center justify-start"
      >
        <IoIosArrowBack
          size={30}
          className="cursor-pointer text-custom-light-purple hover:text-custom-ke7li transition-all delay-100 ease-linear"
        />
        <p>Go back...</p>
      </div>
      <div className="w-full h-full p-10 flex flex-col gap-5 ">
        <div className=" bg-white p-5">
          <p className=" text-3xl font-Poppins  text-black">
            Hello{" "}
            <span className=" text-custom-light-purple font-semibold">
              {Status?.username}{" "}
            </span>
            Welcome to your profile...
          </p>
        </div>
        <div className=" w-full h-auto flex gap-5 bg-white p-6 items-start justify-start">
          <div className="w-full flex flex-col items-start justify-center gap-10">
            <div className="w-full font-Poppins flex justify-between ">
              <div className=" flex gap-3 items-center">
                <FaUser size={25} className="text-custom-light-purple " />
                <p className=" text-custom-ke7li  text-xl ">
                  Personal Information
                </p>
              </div>
              {!EditMode && (
                <div className=" flex items-center  justify-center">
                  <FaEdit
                    onClick={() => setEditMode(true)}
                    size={23}
                    className=" text-custom-ke7li cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div
              onMouseEnter={() => setMouseState(true)}
              onMouseLeave={() => setMouseState(false)}
              className=" w-32 h-32 rounded-full flex items-center justify-center"
            >
              {Status?.userpfp ? (
                <>
                  {EditMode && MouseState && (
                    <Dialog
                      open={pfpedit}
                      onOpenChange={() => setPfpedit(!pfpedit)}
                    >
                      <DialogTrigger className=" flex absolute">
                        <div className=" absolute flex items-center justify-center">
                          <MdEdit
                            size={50}
                            className=" flex absolute items-center justify-center z-30 text-custom-light-purple cursor-pointer hover:text-custom-ke7li transition-all delay-100 ease-linear "
                          />
                          <div className=" w-32 h-32 absolute flex items-center justify-center rounded-full bg-custom-ke7li/50 cursor-pointer z-20 "></div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="w-full flex items-center justify-center">
                        <PfpChange pfpedit={pfpedit} setPfpedit={setPfpedit} />
                      </DialogContent>
                    </Dialog>
                  )}
                  <img
                    className="w-32 h-32 rounded-full ring-4 p-1 z-10 ring-custom-light-purple"
                    src={Status?.userpfp}
                    alt=""
                  />
                </>
              ) : (
                <FaCircleUser className=" w-32 h-32 text-custom-ke7li ring-4 p-1 ring-custom-light-purple rounded-full" />
              )}
            </div>
            <form
              onSubmit={handleOnClickSaveChanges}
              className="w-full  flex flex-col gap-5 justify-center items-center"
            >
              <div className="w-full flex gap-5 justify-center items-center">
                <div className="w-full flex flex-col gap-1 items-start justify-center">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    className={` ${
                      !EditMode
                        ? " bg-slate-200 cursor-not-allowed"
                        : "bg-transparent"
                    } w-full h-9 p-2 border-2 outline-none border-custom-light-purple `}
                    value={InputChange?.FullName}
                    onChange={handleOnClickChangeFullName}
                    readOnly={!EditMode}
                  />
                </div>
                <div className="w-full flex flex-col gap-1 items-start justify-center">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    className={` ${
                      !EditMode
                        ? " bg-slate-200 cursor-not-allowed"
                        : "bg-transparent"
                    } w-full h-9 p-2 border-2 outline-none border-custom-light-purple `}
                    value={InputChange?.Username}
                    onChange={handleOnClickChangeUsername}
                    readOnly={!EditMode}
                  />{" "}
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-full flex flex-col gap-1 outline-none items-start justify-center">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    className={` ${
                      !EditMode
                        ? " bg-slate-200 cursor-not-allowed"
                        : "bg-transparent"
                    } w-full h-9 p-2 border-2 outline-none border-custom-light-purple `}
                    value={InputChange?.Email}
                    onChange={handleOnClickChangeEmail}
                    readOnly={!EditMode}
                  />
                </div>
                <div className="w-full  flex flex-col gap-1 items-start justify-center">
                  <label htmlFor="">Address One</label>
                  <input
                    type="text"
                    className={` ${
                      !EditMode
                        ? " bg-slate-200 cursor-not-allowed"
                        : "bg-transparent"
                    } w-full h-9 p-2 border-2 outline-none border-custom-light-purple `}
                    value={InputChange?.AddressOne}
                    onChange={handleOnClickChangeAddressOne}
                    readOnly={!EditMode}
                  />
                </div>
              </div>
              {EditMode && (
                <div className=" flex items-center justify-end  gap-4 w-full ">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setInputChange({
                        ...InputChange,
                        FullName: Status?.fullname,
                        Username: Status?.username,
                        Email: Status?.email,
                        AddressOne: Status?.addressOne,
                      });
                    }}
                    className=" w-40 h-10 bg-red-800 text-white font-Poppins hover:bg-transparent hover:border-2 border-red-800 transition-colors delay-100 ease-linear hover:text-red-800  "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" w-40 h-10 flex items-center justify-center bg-custom-light-purple text-white font-Poppins hover:bg-transparent hover:border-2 border-custom-light-purple transition-colors delay-100 ease-linear hover:text-custom-light-purple  "
                  >
                    {Loading ? <Spinner /> : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

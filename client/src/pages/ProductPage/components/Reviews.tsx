import React, { FormEvent, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidQuoteAltLeft,
  BiSolidUpvote,
} from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { Ireviews } from "@/interfaces";
import {
  fetchAddUserReviewByUserIdAndProdId,
  fetchGetAllReviewsByProductId,
  fetchUpdateReviewsByUseridAndProductId,
} from "@/api";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { createToast } from "@/shared/Toast";
import { useStatus } from "@/contexts/statusContext";
import dayjs from "dayjs";
import { AwardIcon } from "lucide-react";
import axios from "axios";

const AddaReview = ({ prodid }: any) => {
  const client = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(0);
  const [Message, setMessage] = useState("");
  const { Status } = useStatus();
  const [Active, setActive] = useState(false);

  const handleOnSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    const review = await fetchAddUserReviewByUserIdAndProdId(
      Status?.userId!,
      prodid,
      Message,
      selectedRating
    );
    if (selectedRating === 0 || Message === "") {
      createToast("Please fill the inputs");
    } else if (review) {
      createToast("Your review has been added successfully");
      client.invalidateQueries({ queryKey: ["ProductR"] });
      client.invalidateQueries({ queryKey: ["ProductP"] });
    } else {
      createToast("an error had occured please try again later...");
    }
    setActive(false);
  };

  const stars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TiStarFullOutline
        onClick={() => setSelectedRating(index + 1)}
        key={index}
        color={index < selectedRating ? "yellow" : "#72748e"}
        size={15}
        style={{ cursor: "pointer" }}
      />
    ));
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-5  border-custom-ke7li"
        onSubmit={handleOnSubmitReview}
      >
        <div className=" w-full flex gap-2">
          <div className=" w-10 h-10 rounded-full object-center">
            <img
              src={Status?.userpfp || ""}
              className=" w-10 h-10 rounded-full object-cover"
              alt=""
            />
          </div>

          <div className="w-full flex flex-col gap-2 ">
            <textarea
              name="Review"
              id=""
              value={Message}
              className="w-full p-2 bg-transparent border outline-none text-black placeholder:italic placeholder:font-Poppins text-sm"
              placeholder="Write your review here..."
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className=" flex gap">{stars()}</div>
            <button
              disabled={Active}
              className="w-32 h-8 mb-4 text-white bg-custom-light-purple "
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
};

const Reviews = ({ prodrating, prodid }: any) => {
  const client = useQueryClient();

  const { id } = useParams<{ id: string }>();
  const { Status } = useStatus();
  const [ReviewsArraySE, setReviewsArraySE] = useState({
    start: 0,
    end: 3,
  });
  const { data: reviews } = useQuery({
    queryKey: ["ProductR"],
    queryFn: async () => await fetchGetAllReviewsByProductId(Number(id)),
  }) as UseQueryResult<Ireviews, Error>;

  const stars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <TiStarFullOutline key={index} color="yellow" size={15} />
    ));
  };

  const handleOnClickUpvotes = async (userid: number, currentVotes: number) => {
    try {
      const response = await fetchUpdateReviewsByUseridAndProductId(
        userid,
        prodid,
        {
          rating: 0,
          message: "",
          upvote: currentVotes + 1,
          downvote: 0,
        }
      );

      if (response) {
        client.invalidateQueries({ queryKey: ["ProductR"] });
        client.invalidateQueries({ queryKey: ["ProductP"] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!reviews) {
    return <p>Loading...</p>;
  }

  //@ts-ignore
  const sortedReviews = reviews.sort(
    (a: Ireviews, b: Ireviews) => b.upVotes - a.upVotes
  );

  return (
    <section className=" w-full flex flex-col gap-5 font-Poppins ">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-custom-light-purple">
          CREATE A REVIEW
        </p>
        <AddaReview prodid={prodid} />
        <div className=" flex flex-col gap-6">
          <p className=" text-md font-semibold text-custom-dark-ke7li">
            ALL{" "}
            <span className=" text-custom-light-purple">
              {
                //@ts-ignore
                reviews?.length
              }
            </span>{" "}
            REVIEWS :
          </p>
          <div className=" w-full h-96 overflow-y-scroll  rounded-xl bg-custom-dark-white">
            {
              //@ts-ignore
              sortedReviews?.map((item: Ireviews) => {
                return (
                  <div
                    key={item.reviewId}
                    className="w-full h-32 shadow-sm  px-10 py-20 flex flex-col items-start  justify-center gap-3"
                  >
                    <div className="w-full flex gap-2 items-start justify-center">
                      <div className=" w-7 h-7 flex rounded-full  items-center justify-center">
                        {item.userPfp ? (
                          <img
                            className="rounded-full w-20"
                            src={item.userPfp || ""}
                            alt=""
                          />
                        ) : (
                          <FaCircleUser
                            size={25}
                            className="text-custom-dark-ke7li cursor-pointer bg-custom-ke7li rounded-full ring-1 ring-custom-light-purple"
                          />
                        )}
                      </div>
                      <div className=" flex items-center justify-between w-full">
                        <div className=" flex flex-col  items-start justify-center">
                          <p className="font-bold text-custom-light-purple">
                            {item?.username.toUpperCase()}
                          </p>
                          <div className="flex">{stars(item.rating)} </div>
                        </div>

                        <p className="text-custom-dark-ke7li text-xs">
                          {dayjs(item?.dateCreated).format("MM/DD/YYYY")}
                        </p>
                      </div>
                    </div>

                    <div className="flex pl-8">
                      <BiSolidQuoteAltLeft size={8} color="black" />{" "}
                      <p className="text-black font-Poppins ">
                        {item?.message}
                      </p>
                      <BiSolidQuoteAltRight size={8} color="black" />
                    </div>

                    <div className=" flex pl-8 items-center text-sm gap-3 font-Poppins">
                      <div className=" flex gap-1 justify-center items-center">
                        <p>{item?.upVotes}</p>
                        <BiSolidUpvote
                          onClick={() =>
                            handleOnClickUpvotes(item.userid, item?.upVotes)
                          }
                        />
                      </div>
                      <div className="flex gap-1 justify-center items-center">
                        <p>{item?.downVotes}</p>
                        <BiDownvote />
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

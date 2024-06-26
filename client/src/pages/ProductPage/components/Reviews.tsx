import React, { FormEvent, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { Ireviews } from "@/interfaces";
import {
  fetchAddUserReviewByUserIdAndProdId,
  fetchGetAllReviewsByProductId,
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
        color={index < selectedRating ? "#676eff" : "white"}
        size={15}
        style={{ cursor: "pointer" }}
      />
    ));
  };

  return (
    <div className=" ">
      <form
        className="flex flex-col gap-5 border-b border-custom-ke7li"
        onSubmit={handleOnSubmitReview}
      >
        <textarea
          name="Review"
          id=""
          value={Message}
          className=" p-2 bg-transparent border outline-none text-white placeholder:italic placeholder:font-Poppins text-sm"
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
      </form>
    </div>
  );
};

const Reviews = ({ prodrating, prodid }: any) => {
  const { id } = useParams<{ id: string }>();
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
      <TiStarFullOutline key={index} color="white" size={15} />
    ));
  };

  if (!reviews) {
    return <p>Loading...</p>;
  }

  //@ts-ignore
  const slicedReviews = reviews.slice(ReviewsArraySE.start, ReviewsArraySE.end);
  const sortedReviews = slicedReviews.sort(
    (a: Ireviews, b: Ireviews) => b.rating - a.rating
  );

  return (
    <section className=" w-full flex flex-col gap-5 ">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-custom-light-purple">
          CUSTOMER REVIEWS
        </p>
        <AddaReview prodid={prodid} />
        <div>
          {
            //@ts-ignore
            sortedReviews?.map((item: Ireviews) => {
              return (
                <div
                  key={item.reviewId}
                  className="w-full h-32 border-b  border-custom-ke7li  flex flex-col items-start px-5 justify-center gap-5"
                >
                  <div className=" flex gap-5 items-center">
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
                    <div>
                      <p className="font-bold text-custom-light-purple">
                        {item?.username.toUpperCase()}
                      </p>
                      <div className="flex">{stars(item.rating)} </div>
                    </div>
                  </div>

                  <div className="flex">
                    <BiSolidQuoteAltLeft size={8} color="white" />
                    <i>
                      {" "}
                      <p className="text-white">{item?.message}</p>{" "}
                    </i>
                    <BiSolidQuoteAltRight size={8} color="white" />
                  </div>
                </div>
              );
            })
          }

          {
            //@ts-ignore
            reviews.length > ReviewsArraySE.end && (
              <p
                onClick={() =>
                  setReviewsArraySE({
                    ...ReviewsArraySE,

                    end: ReviewsArraySE.end + 3,
                  })
                }
                className="flex items-center justify-center text-white text-sm font-Poppins font-semibold pt-5 cursor-pointer"
              >
                Show More...
              </p>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Reviews;

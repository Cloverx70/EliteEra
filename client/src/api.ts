import axios, { AxiosResponse, HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import {
  IUserCheckout,
  Icheckout,
  Icollection,
  Iproduct,
  Ireviews,
  Istatistics,
  IuserProduct,
  UserData,
} from "./interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useStatus } from "./contexts/statusContext";

// Variants Route :

export const fetchGetVariantsByProductId = async (id: number) => {
  try {
    const response = await axios.post(
      `variant/get-variants-by-product-id/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

// Bought Together Products Route :

export const fetchGetBtogetherProducts = async (id: number) => {
  try {
    const response = await axios.post(
      `bought-together/get-btogether-by-id/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdateBtogetherProducts = async (
  prodId: number,
  productIds: number[]
) => {
  try {
    const response = await axios.post(
      `bought-together/update-btogether-by-id/${prodId}`,
      { productIds },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};
// User Route :

export const fetchGetAllUsers = async () => {
  try {
    const response = await axios.post(
      "user/get-all-users",
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

//Category Route :

export const fetchGetCategoryProductByCategoryName = async (name: string) => {
  try {
    const response = await axios.post(
      `category/get-category-products-by-category-name/${name}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCreateCategory = async (name: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      "category/create-category",
      {
        CategoryName: name,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

//Checkout Route :

export const fetchUpdateCheckoutStatus = async (
  checkoutId: number,
  Deliverystatus: string,
  Paymentstatus: string,
  Orderstatus: string | null
) => {
  try {
    const response = await axios.post(
      `checkoutuserproducts/update-checkout-by-checkout-id/${checkoutId}`,
      {
        Paymentstatus,
        Deliverystatus,
        Orderstatus,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetAllCheckouts = async () => {
  try {
    const response = await axios.post(
      "checkoutuserproducts/get-all-checkouts",
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetAllCheckoutsByUserId = async (userid: number) => {
  try {
    const response = await axios.post(
      `checkoutuserproducts/get-all-checkouts-by-user-id/${userid}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};
export const fetchGetCheckoutByCheckoutId = async (id: number) => {
  try {
    const response: AxiosResponse<IUserCheckout> =
      await axios.post<IUserCheckout>(
        `checkoutuserproducts/get-checkout-by-checkout-id/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetCheckoutByUserProductAndUserId = async (
  userid: number,
  userproductids: { [key: string]: number }
) => {
  try {
    const response: AxiosResponse<IUserCheckout> =
      await axios.post<IUserCheckout>(
        "checkoutuserproducts/get-checkout-by-user-product-and-user-id",
        { userid, userproductids },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    if (response.data !== null) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCheckoutByUserProductIdAndUserId = async (
  userId: number,
  userProductId: { [key: string]: number },
  promocode: string,
  paymentMethod: string,
  specialInstructions: string,
  orderName: string,
  orderEmail: string,
  orderPhone: number,
  bringChange: number,
  orderAddress: string
) => {
  try {
    const response = await axios.post(
      "checkoutuserproducts/checkout-by-user-product-and-user-id",
      {
        userId: userId,
        userProductId: userProductId,
        promocode: promocode,
        paymentMethod: paymentMethod,
        specialInstructions: specialInstructions,
        orderName: orderName,
        orderEmail: orderEmail,
        orderPhone: orderPhone,
        bringChange: bringChange,
        orderAddress: orderAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Statistics Route :

export const fetchGetLatestStats = async () => {
  try {
    const response: AxiosResponse<Istatistics[]> = await axios.post<
      Istatistics[]
    >(
      "statistics/get-latest-stats",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCreateStats = async (
  totalEarnings: number,
  totalOrders: number,
  totalPurchases: number,
  totalUsers: number,
  totalProducts: number
) => {
  try {
    const response: AxiosResponse = await axios.post(
      "statistics/create-stats",
      {
        TotalEarnings: totalEarnings,
        TotalPurchases: totalPurchases,
        TotalUsers: totalUsers,
        TotalProducts: totalProducts,
        TotalOrders: totalOrders,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetAlltStats = async () => {
  try {
    const response = await axios.post(
      "statistics/get-all-stats",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

//Review Route :

export const fetchGetAllReviewsByProductId = async (prodid: number) => {
  try {
    const response: AxiosResponse<Ireviews> = await axios.post<Ireviews>(
      `reviews/get-all-reviews-by-product-id/${prodid}`
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetAllUserReviewsByProductId = async (prodid: number) => {
  try {
    const response = await axios.post(
      `reviews/get-all-reviews-by-product-id/${prodid}`
    );

    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAddUserReviewByUserIdAndProdId = async (
  userid: number,
  prodid: number,
  message: string,
  rating: number
) => {
  try {
    const response: AxiosResponse<Ireviews> = await axios.post<Ireviews>(
      `reviews/add-review-by-user-id-and-product-id`,
      {
        uid: userid,
        prodid: prodid,
        message: message,
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdateReviewsByUseridAndProductId = async (
  uid: number,
  pid: number,
  request: {
    rating: number | null;
    message: string | "";
    upvote: number;
    downvote: number;
  }
) => {
  try {
    const response = await axios.post(
      `reviews/update-review-by-user-id-and-product-id`,
      {
        uid: uid,
        pid: pid,
        request: {
          rating: request.rating,
          message: request.rating,
          upvote: request.upvote,
          downvote: request.downvote,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data) return response.data;
  } catch (error) {}
};
//Cart route :

export const fetchGetUserCartByUserId = async (id: number) => {
  try {
    const response = await axios.post(
      `cart/get-cart-by-user-id/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdateUserCartByUserId = async (
  id: number,
  MinusTotal: number,
  MinusCartItemsNumber: number
) => {
  try {
    const response = await axios.post(
      `cart/update-cart-by-user-id/${id}`,
      {
        MinusTotal: MinusTotal,
        MinuscartItemsNumber: MinusCartItemsNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//NewsLetter route :

export const fetchaddEmailToNewsLetter = async (email: string) => {
  try {
    const response = await axios.post("newsletter/add-email", { email: email });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//User products route :

export const fetchRemoveUserProduct = async (
  userproductId: number,
  userId: number,
  token: string
) => {
  const response = await axios.post(
    `userproduct/remove-user-product-by-id`,
    { userproductId, userId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const fetchAddUserProduct = async (
  uid: number,
  pid: number,
  qty: number
) => {
  try {
    const response = await axios.post(
      "userproduct/add-user-product",
      {
        userid: uid,
        productid: pid,
        qty: qty,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.error(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetAllUserProducts = async (id: number) => {
  try {
    const response = await axios.get(
      `userproduct/get-all-user-products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdateUserProductByUIDandUPID = async (
  uid: number,
  upid: number,
  qty: number,
  price: number
) => {
  try {
    const response = await axios.post(
      `userproduct/update-user-product-by-user-product-id-and-user-id`,
      {
        userid: uid,
        userproductid: upid,
        qty: qty,
        price: price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGetUserProductByUIDandPID = async (
  uid: number,
  pid: number
) => {
  try {
    const response: AxiosResponse<IuserProduct> = await axios.post(
      "userproduct/get-user-product-by-user-id-and-product-id",
      {
        uid: uid,
        pid: pid,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//colloctions route :

export const fetchGetAllCollections = async () => {
  const response: AxiosResponse<Icollection> = await axios.post<Icollection>(
    "collection/get-all-collections"
  );

  return response.data;
};

//collection products route :

export const fetchGetAllCollectionProducts = async (id: number) => {
  const response = await axios.post(
    `collectionproducts/get-products-by-collection-id/${id}`
  );

  return response.data;
};

//Products route :

export const fetchUpdateProductById = async (
  id: number,
  productAndVariant: any
) => {
  const response = await axios.post(
    `product/update-product-by-id/${id}`,
    {
      productAndVariant,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.data) return response.data;
};

export const fetchGetProductById = async (id: number) => {
  const response = await axios.post<Iproduct>(
    `product/get-product-by-id/${id}`
  );

  return response.data;
};

export const fetchGetAllProducts = async () => {
  const response = await axios.post("product/get-all-products");
  return response.data;
};

//Auth route :

export const fetchRemoveUserById = async (id: number) => {
  try {
    const response = await axios.post(
      `user/remove-user-by-id/${id}`,
      {},
      {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetUserById = async (id: number) => {
  try {
    const response = await axios.post(
      `auth/get-user-by-id/${id}`,
      {},
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post("auth/login", {
      email: email,
      password: password,
    });
    const token = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStatus = async () => {
  try {
    const response: AxiosResponse<UserData> = await axios.get<UserData>(
      "auth/status",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) return response.data;
    else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchRegister = async (
  username: string,
  fullname: string,
  email: string,
  password: string,
  addressOne: string,
  addressTwo: string,
  birthdate: Date
) => {
  try {
    const response = await axios.post("auth/signup", {
      username,
      fullname,
      email,
      password,
      addressOne,
      addressTwo,
      birthdate,
    });
    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const FetchUpdateUserById = async (
  id: number,
  username: string,
  fullName: string,
  email: string,
  addressone: string,
  addresstwo: string
) => {
  try {
    const response = await axios.post(
      `auth/update-user-by-id/${id}`,
      {
        username,
        fullName,
        email,
        addressone,
        addresstwo,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};
export const fetchUpdateUserPfpByURL = async (id: number, url: string) => {
  try {
    const response = await axios.post(
      `user/update-user-pfp-by-id/${id}`,
      { url },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

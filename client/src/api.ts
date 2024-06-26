import axios, { AxiosResponse, HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import {
  IUserCheckout,
  Icheckout,
  Iproduct,
  Ireviews,
  Istatistics,
  IuserProduct,
  UserData,
} from "./interfaces";

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
  bringChange: number
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

export const fetchGetStat = async (status: UserData) => {
  try {
    const response: AxiosResponse<Istatistics> = await axios.post<Istatistics>(
      "statistics/get-stats",
      { status: status },
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
//Cart route :

export const fetchGetUserCartByUserId = async (id: number, token: string) => {
  try {
    const response = await axios.post(
      `cart/get-cart-by-user-id/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
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
  MinusCartItemsNumber: number,
  token: string
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
  qty: number,
  token: string
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.error(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetAllUserProducts = async (id: number, token: string) => {
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
  price: number,
  token: string
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
          Authorization: `Bearer ${token}`,
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
  pid: number,
  token: string
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
          Authorization: `Bearer ${token}`,
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
  const response = await axios.post("collection/get-all-collections");

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

export const fetchLogin = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email: email,
    password: password,
  });

  const token = response.data || null;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response;
};

export const fetchStatus = async (token: string | null) => {
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
  const response = await axios.post("auth/signup", {
    username,
    fullname,
    email,
    password,
    addressOne,
    addressTwo,
    birthdate,
  });

  return response.data;
};

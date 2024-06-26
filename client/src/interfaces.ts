export interface UserData {
  addressone: string;
  addresstwo: string;
  email: string;
  fullname: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  userId: number;
  username: string;
}
export interface IUserCheckout {
  checkoutId: number;
  userId: number;
  userProductId: { [key: string]: number };
  userFullName: string;
  productPrice: number;
  productPriceAfterDiscount: number;
  promocode: string;
  paymentMethod: string;
  paymentStatus: string;
  wishOrderCode: string;
  orderSpecialInstructions: string;
  orderName: string;
  orderEmail: string;
  orderPhone: number;
  bringChange: number;
  deliveryStatus: string;
}

export interface Icheckout {
  userId: number;
  userProductId: { [key: string]: number };
  promocode: string;
  paymentMethod: string;
  whishCodeLength: string;
  specialInstructions: string;
  orderName: string;
  orderEmail: string;
  orderPhone: number;
  bringChange: number;
}

export interface Icart {
  cartId: number;
  userID: number;
  username: string;
  cartTotal: number;
  cartItemsNumber: number;
}

export interface Iproduct {
  collectionId: number;
  productDescription: string;
  productId: number;
  btoghetherId: number;
  variantId: number;
  reviewsId: number;
  productOrigin: string;
  productPicture: string;
  productSecondPicture: string;
  productThirdPicture: string;
  productFourthPicure: string;
  productPrice: number;
  productRating: number;
  productSeason: string;
  productStock: number;
  productTitle: string;

  productAbout: string;
}

export interface Icollection {
  collectionId: number;
  collectionTitle: string;
  collectionDescription: string;
  collectionPicture: string;
}

export interface IcollectionProduct {
  collectionProductId: number;
  productId: number;
  collectionId: number;
}

export interface IuserProduct {
  userProductId: number;
  userId: number;
  productId: number;
  productPicture: string | null;
  productTitle: string;
  productDescription: string | null;
  productPrice: number;
  qty: number;
}

export interface Istatistics {
  statId: number;
  totalEarnings: number;
  totalUsers: number;
  totalProducts: number;
  totalPurchases: number;
}

export interface Ireviews {
  reviewId: number;
  productId: number;
  userPfp: string | null;
  username: string;
  rating: number;
  message: string;
}
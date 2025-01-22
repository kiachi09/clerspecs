import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productCreateOffersReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
  productSpecListReducer,
  productGogglesListReducer,
  productContactlensListReducer,
  // productEyeGlassBrandsListReducer,
  // productSunGlassBrandsListReducer,
  // productsBrandsEyeglassListReducer,
  // productsBrandsSunglassListReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userGoogleLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListAdminReducer,
  userDeleteAdminReducer,
  userUpdateAdminReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderUserListReducer,
  orderAdminListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const intialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  productList: productListReducer,
  // productBrandsEyeGlassList: productsBrandsEyeglassListReducer,
  // productBrandsSunGlassList: productsBrandsSunglassListReducer,
  // productEyeGlassBrandsList: productEyeGlassBrandsListReducer,
  // productSunGlassBrandsList: productSunGlassBrandsListReducer,
  productSpecList: productSpecListReducer,
  productGogglesList: productGogglesListReducer,
  productContactlensList: productContactlensListReducer,

  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productCreateOffers: productCreateOffersReducer,

  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userGoogleLogin: userGoogleLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userListAdmin: userListAdminReducer,
  userDeleteAdmin: userDeleteAdminReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderUserList: orderUserListReducer,
  orderAdminList: orderAdminListReducer,
  orderDeliver: orderDeliverReducer,
});

export default configureStore({
  reducer,
  preloadedState: intialState,
});

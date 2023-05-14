import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	productTopRatedReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListAdminReducer,
	userDeleteAdminReducer,
	userUpdateAdminReducer,
} from './reducers/userReducers';

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderUserListReducer,
	orderAdminListReducer,
	orderDeliverReducer,
} from './reducers/orderReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
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
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
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

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers';

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderUserListReducer,
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
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderUserList: orderUserListReducer,
});

export default configureStore({
	reducer,
	preloadedState: intialState,
});

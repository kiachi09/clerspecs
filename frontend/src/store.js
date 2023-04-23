import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
} from './reducers/userReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const intialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
});

export default configureStore({
	reducer,
	preloadedState: intialState,
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const intialState = {
	cart: { cartItems: cartItemsFromStorage },
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

export default configureStore({
	reducer,
	preloadedState: intialState,
});

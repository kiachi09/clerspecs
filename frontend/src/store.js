import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productListReducer } from './reducers/productReducer';

const reducer = combineReducers({
	productList: productListReducer,
});

export default configureStore({
	reducer,
});

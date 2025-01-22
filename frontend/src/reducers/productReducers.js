import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_OFFERS_REQUEST,
  PRODUCT_CREATE_OFFERS_SUCCESS,
  PRODUCT_CREATE_OFFERS_FAIL,
  PRODUCT_CREATE_OFFERS_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_SPEC_LIST_REQUEST,
  PRODUCT_SPEC_LIST_SUCCESS,
  PRODUCT_SPEC_LIST_FAIL,
  PRODUCT_GOGGLES_LIST_REQUEST,
  PRODUCT_GOGGLES_LIST_SUCCESS,
  PRODUCT_GOGGLES_LIST_FAIL,
  PRODUCT_CONTACTLENS_LIST_REQUEST,
  PRODUCT_CONTACTLENS_LIST_SUCCESS,
  PRODUCT_CONTACTLENS_LIST_FAIL,

  // PRODUCT_EYEGLASS_BRANDS_LIST_REQUEST,
  // PRODUCT_EYEGLASS_BRANDS_LIST_FAIL,
  // PRODUCT_EYEGLASS_BRANDS_LIST_SUCCESS,
  // PRODUCT_SUNGLASS_BRANDS_LIST_REQUEST,
  // PRODUCT_SUNGLASS_BRANDS_LIST_SUCCESS,
  // PRODUCT_SUNGLASS_BRANDS_LIST_FAIL,
  // PRODUCT_BRANDS_EYEGLASS_LIST_REQUEST,
  // PRODUCT_BRANDS_EYEGLASS_LIST_SUCCESS,
  // PRODUCT_BRANDS_EYEGLASS_LIST_FAIL,
  // PRODUCT_BRANDS_SUNGLASS_LIST_FAIL,
  // PRODUCT_BRANDS_SUNGLASS_LIST_SUCCESS,
  // PRODUCT_BRANDS_SUNGLASS_LIST_REQUEST,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const productEyeGlassBrandsListReducer = (state = { brands: [] }, action) => {
// 	switch (action.type) {
// 		case PRODUCT_EYEGLASS_BRANDS_LIST_REQUEST:
// 			return { loading: true, brands: [] };
// 		case PRODUCT_EYEGLASS_BRANDS_LIST_SUCCESS:
// 			return { loading: false, brands: action.payload};
// 		case PRODUCT_EYEGLASS_BRANDS_LIST_FAIL:
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export const productSunGlassBrandsListReducer = (state = { brands: [] }, action) => {
// 	switch (action.type) {
// 		case PRODUCT_SUNGLASS_BRANDS_LIST_REQUEST:
// 			return { loading: true, brands: [] };
// 		case PRODUCT_SUNGLASS_BRANDS_LIST_SUCCESS:
// 			return { loading: false, brands: action.payload};
// 		case PRODUCT_SUNGLASS_BRANDS_LIST_FAIL:
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export const productsBrandsEyeglassListReducer = (state = {products: []}, action) => {
// 	switch(action.type) {
// 		case PRODUCT_BRANDS_EYEGLASS_LIST_REQUEST:
// 			return {loading: true, products: []};
// 		case PRODUCT_BRANDS_EYEGLASS_LIST_SUCCESS:
// 			return {loading: false, products: action.payload};
// 		case PRODUCT_BRANDS_EYEGLASS_LIST_FAIL:
// 			return {loading: false, error: action.payload};
// 		default:
// 			return state;
// 	}
// }

// export const productsBrandsSunglassListReducer = (state = {products: []}, action) => {
// 	switch(action.type) {
// 		case PRODUCT_BRANDS_SUNGLASS_LIST_REQUEST:
// 			return {loading: true, products: []};
// 		case PRODUCT_BRANDS_SUNGLASS_LIST_SUCCESS:
// 			return {loading: false, products: action.payload};
// 		case PRODUCT_BRANDS_SUNGLASS_LIST_FAIL:
// 			return {loading: false, error: action.payload};
// 		default:
// 			return state;
// 	}
// }

export const productSpecListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SPEC_LIST_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_SPEC_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_SPEC_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productContactlensListReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CONTACTLENS_LIST_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_CONTACTLENS_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_CONTACTLENS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productGogglesListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_GOGGLES_LIST_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_GOGGLES_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_GOGGLES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productCreateOffersReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_OFFERS_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_OFFERS_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_OFFERS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_OFFERS_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

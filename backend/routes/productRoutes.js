import express from "express";

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductOffers,
  createProductReview,
  getTopProducts,
  getSpecsProducts,
  getGogglesProducts,
  getContactlensProducts,
  // getEyeGlassBrands,
  // getSunGlassBrands,
  // getEyeglassesFromBrands,
  // getSunglassesFromBrands,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/Offers")
  .get(getProducts)
  .post(protect, admin, createProductOffers);

router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.get("/specs", getSpecsProducts);
router.get("/goggles", getGogglesProducts);
router.get("/Contactlens", getContactlensProducts);

// router.get('/brands/specs', getEyeGlassBrands);
// router.get('/brands/goggles', getSunGlassBrands);
// router.get('/specs/:brand', getEyeglassesFromBrands);
// router.get('/goggles/:brand', getSunglassesFromBrands);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

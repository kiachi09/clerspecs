import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    // specification: [specificationSchema],
    // feature: [featureSchema],
    // LensSpecs: [LensSpecsSchema],
    rating: {
      type: String,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    similarIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    frameIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    OffersIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    soldSoFar: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    shape: {
      type: String,
    },
    colour: {
      type: String,
    },
    usage: {
      type: String,
    },
    offerName: {
      type: String,
      default: "Offer Name",
    },
    offerValue: {
      type: Number,
      default: 0,
    },
    offerDesc: {
      type: String,
      default: "Offer Description",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

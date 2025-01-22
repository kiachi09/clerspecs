import mongoose from "mongoose";

const manualValuesSchema = mongoose.Schema({
  od_sph: {
    type: Number,
  },
  od_cyl: {
    type: Number,
  },
  od_axis: {
    type: Number,
  },
  os_sph: {
    type: Number,
  },
  os_cyl: {
    type: Number,
  },
  os_axis: {
    type: Number,
  },
  Add_Power: {
    type: Number,
  },
  pd_type: {
    type: String,
  },
  pd_value: {
    type: Number,
  },
  PrescriptionImage: {
    type: String,
  },
});
const appliedOfferSchema = mongoose.Schema({
  appliedOfferId: {
    type: String,
    default: null,
  },
  appliedOfferValue: {
    type: Number,
    default: 0,
  },
});

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, required: true },
        prescriptionType: { type: String },
        lens: { type: String },
        lensprice: { type: Number },
        onlyFrame: { type: String, required: true },
        manualValues: [manualValuesSchema],
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    appliedOffer: [appliedOfferSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    lensPrice: {
      type: Number,
      default: 0.0,
    },
    discountPrice: {
      type: Number,

      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import mg from "../config/emailConfig.js";

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    lensPrice,
    taxPrice,
    shippingPrice,
    discountPrice,
    totalPrice,
    appliedOffer,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      lensPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
      appliedOffer,
    });

    const createdOrder = await order.save();

    if (createdOrder && user) {
      const data = {
        from: '"Clerspecs" <sales@clerspecs.com>',
        to: user.email,
        subject: "Order Created - Clerspecs",
        text: `Hi, ${user.name} Your Order has been created, we are happy that you liked our product.

  We will start the shipping process once the payment is complete and done. Please ignore if already done.
  
  Best regards,
  The Clerspecs Team`,
      };
      await mg.messages().send(data);
    }

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrdertoPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    const user = await User.findById(order.user);
    console.log(user);
    if (user && order.appliedOffer[0].appliedOfferId !== null) {
      user.appliedOffers.push(order.appliedOffer[0]);
      await user.save();
      console.log("Applied offers updated for the user.");
    } else {
      console.log("User not found or No offer In the Order.");
    }

    // console.log(updatedOrder);
    // yaha par I am adding the code to update the count in stock for products and framelens if bought, well the correct way will be making a new dispatch and redux variable calling a new backend api but

    // but jab yaha par 100 percent identical situation mein hai iss point pe order se data nikal ke product update yaha par
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      product.countInStock -= item.quantity;
      product.soldSoFar += item.quantity;
      await product.save();

      // Check if the item has a lens product
      if (
        item.lens &&
        item.lens.trim() !== "" &&
        (await Product.exists({ _id: item.lens }))
      ) {
        const lensProduct = await Product.findById(item.lens);
        lensProduct.countInStock -= item.quantity;
        lensProduct.soldSoFar += item.quantity;
        await lensProduct.save();
      }
    }

    if (updatedOrder && user) {
      const data = {
        from: '"Clerspecs" <sales@clerspecs.com>',
        to: user.email,
        subject: "Payment Done - Clerspecs",
        text: `Hi, ${user.name} Your payment for order - ${req.params.id} is done, we are happy that you liked our product.

  The shipping Process has been started, so Sit back and relax you will get your product very soon. you can check the your dashboard for updates.
  
  Best regards,
  The Clerspecs Team`,
      };
      await mg.messages().send(data);
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// desc Get logged in user orders
// route GET /api/orders/myorders
// access Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// desc Get all orders
// route GET /api/orders
// access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// desc Update order to  delivered
// route GET /api/orders/:id/deliver
// access Private/Admin
const updateOrdertoDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    console.log(order.deliveredAt);
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  getUserOrders,
  getOrders,
  updateOrdertoDelivered,
};

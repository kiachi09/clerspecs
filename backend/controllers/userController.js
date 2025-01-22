import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import mg from "../config/emailConfig.js";

// @desc Auth user and get token
// @route POST /api/users/login
// @access PUBLIC

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const data = {
      // from: `"Clerspecs" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      from: '"Clerspecs" <sales@clerspecs.com>',

      to: user.email,
      subject: "Welcome To Clerspecs",
      text: `Congratulations, ${user.name}! You have just joined the Clerspecs family.We are thrilled to have you on board and can't wait to provide you with a one-stop solution for all your eyewear needs. Whether it's glasses, sunglasses, or contact lenses, we've got you covered.

At Clerspecs, we believe in delivering exceptional quality and unparalleled customer service. Our team of experts is dedicated to helping you find the perfect frames and lenses that not only enhance your vision but also complement your unique style.

We hope you'll enjoy exploring our extensive collection and discovering the perfect piece to suit your personal taste. If you have any questions or need assistance, please don't hesitate to reach out to us.

Welcome aboard, and we look forward to being a part of your journey!

Best regards,
The Clerspecs Team`,
    };
    await mg.messages().send(data);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Login through Google
// @route POST /api/users/googlelogin
// @access Public
const googleLogin = asyncHandler(async (req, res) => {
  const { name, email, password, signInGoogle } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.signInGoogle === true) {
      res.json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        isAdmin: userExists.isAdmin,
        signInGoogle: userExists.signInGoogle,
        token: generateToken(userExists._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    const user = await User.create({
      name,
      email,
      password,
      signInGoogle,
    });
    if (user) {
      const data = {
        // from: `"Clerspecs" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        from: '"Clerspecs" <sales@clerspecs.com>',
        to: user.email,
        subject: "Welcome To Clerspecs",
        text: `Congratulations, ${user.name}! You have just joined the Clerspecs family.We are thrilled to have you on board and can't wait to provide you with a one-stop solution for all your eyewear needs. Whether it's glasses, sunglasses, or contact lenses, we've got you covered.
  
  At Clerspecs, we believe in delivering exceptional quality and unparalleled customer service. Our team of experts is dedicated to helping you find the perfect frames and lenses that not only enhance your vision but also complement your unique style.
  
  We hope you'll enjoy exploring our extensive collection and discovering the perfect piece to suit your personal taste. If you have any questions or need assistance, please don't hesitate to reach out to us.
  
  Welcome aboard, and we look forward to being a part of your journey!
  
  Best regards,
  The Clerspecs Team`,
      };
      await mg.messages().send(data);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        signInGoogle: user.signInGoogle,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      signInGoogle: user.signInGoogle,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // Doesn't return the password
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  authUser,
  registerUser,
  googleLogin,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

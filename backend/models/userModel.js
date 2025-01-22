import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    signInGoogle: {
      type: Boolean,
      required: true,
      default: false,
    },
    appliedOffers: [appliedOfferSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // salt is required to hash the password asynchronously
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import similarityIndexEyeglasses from "./config/similarityIndexEyeglasses.js";
import similarityIndexSunglasses from "./config/similarityIndexSunglasses.js";
import similarityIndexContactlens from "./config/similarityIndexContactlens.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import staticuploadRoutes from "./routes/staticuploadRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

import { protect, admin } from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/staticupload", staticuploadRoutes);
app.use("/api/email", emailRoutes);

app.get("/api/ResetSimilarityEyeglasses", protect, admin, async (req, res) => {
  try {
    const result = await similarityIndexEyeglasses();
    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
});
app.get("/api/ResetSimilaritySunglasses", protect, admin, async (req, res) => {
  try {
    const result = await similarityIndexSunglasses();
    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
});
app.get("/api/ResetSimilarityContactlens", protect, admin, async (req, res) => {
  try {
    const result = await similarityIndexContactlens();
    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
});

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  "/staticuploads",
  express.static(path.join(__dirname, "/staticuploads"))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

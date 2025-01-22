import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/product
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a product by id
// @route DELETE /api/product/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a product
// @route POST /api/product
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Recycle",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc Create a product - offer which will be used to mark offers in a product had to save it in the product database
// @route POST /api/product
// @access Private/Admin
const createProductOffers = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "No Name(see offerName)",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "No Brand",
    category: "Offers",
    countInStock: 0,
    numReviews: 0,
    description: "No Description Here (see offerDesc)",
  });

  const createdProductOffers = await product.save();
  res.status(201).json(createdProductOffers);
});

// @desc Update a product
// @route PUT /api/product/:id
// @access Private/Admin
// updation of countinstock happening in order routes to be specific in order pay.
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    gender,
    shape,
    colour,
    Offername,
    Offervalue,
    Offerdescription,
    usage,
    frameIds,
    offersIds,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    if (
      product.category === "Eyeglasses" ||
      product.category === "Sunglasses"
    ) {
      product.gender = gender;
      product.shape = shape;
      product.frameIds = frameIds;
      product.OffersIds = offersIds;
    }
    if (
      product.category === "Contactlens" ||
      product.category === "Framelens"
    ) {
      product.colour = colour;
      product.usage = usage;
      product.OffersIds = offersIds;
    }
    if (product.category === "Offers") {
      product.offerName = Offername;
      product.offerValue = Offervalue;
      product.offerDesc = Offerdescription;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new review
// @route POST /api/product/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Get top rated products
// @route GET /api/product/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc Get only spectacle products
// @route GET /api/specs
// @access Public
const getSpecsProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Eyeglasses" });

  res.json(products);
});

// @desc Get only sunglasses products
// @route GET /api/googles
// @access Public
const getGogglesProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Sunglasses" });

  res.json(products);
});
// @desc Get only Contactlens products
// @route GET /api/specs
// @access Public
const getContactlensProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: "Contactlens" });

  res.json(products);
});

// @desc Get a list of brands
// @route GET /api/brands
// @access Public
// const getEyeGlassBrands = asyncHandler(async (req, res) => {
// 	const products = await Product.find({ category: 'Eyeglasses' });
// 	let brands = [...new Set(products.map(product => product.brand))];
// 	res.json(brands);
// });

// const getSunGlassBrands = asyncHandler(async (req, res) => {
// 	const products = await Product.find({ category: 'Sunglasses' });
// 	let brands = [...new Set(products.map(product => product.brand))];
// 	res.json(brands);
// });

// const getEyeglassesFromBrands = asyncHandler(async (req, res) => {
// 	const brand = req.params.brand ? {
// 		brand: {
// 		$regex: req.params.brand,
// 		$options: 'i',
// 		},
// 	}: {};
// 	try {
// 		const products = await Product.find({...brand, category: 'Eyeglasses'});
// 		res.json(products)
// 	} catch(error) {
// 		res.status(500).json({message: 'Server Error', error});
// 	}
// });
// const getSunglassesFromBrands = asyncHandler(async (req, res) => {
// 	const brand = req.params.brand ? {
// 		brand: {
// 		$regex: req.params.brand,
// 		$options: 'i',
// 		},
// 	}: {};
// 	try {
// 		const products = await Product.find({...brand, category: 'Sunglasses'});
// 		res.json(products);
// 	}
// 	catch (error) {
// 		res.status(500).json({ message: 'Server Error', error });
// 	}
// });

// Export all functions
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  createProductOffers,
  updateProduct,
  createProductReview,
  getTopProducts,
  getSpecsProducts,
  getGogglesProducts,
  getContactlensProducts,
  // getEyeGlassBrands,
  // getSunGlassBrands,
  // getEyeglassesFromBrands,
  // getSunglassesFromBrands,
};

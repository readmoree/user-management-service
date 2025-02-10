const db = require("../config/db");
const { snakeToCamelCase, undefinedOrValue } = require("../utils/miscUtils");
require("dotenv").config();
const axios = require("axios");
const sendInvoiceEmail = require("../utils/InvoiceService");

const stripe = require("stripe")(
  "sk_test_51QoHczGgebrKK2S2RAIdj5rJqzRVgIb61IkzdhMVeUQ2UOXhsAQJs67X6K2dSnowMZGAvYT3m3Cq8warpF4dWM3K00AlNn6Vwt"
);

const getCartBooks = async (req, res) => {
  try {
    console.log("IN the getCartBooks method");
    const { customerId } = req.user; // Extract customerId from user object

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/cart/${customerId}`;

    console.log(apiUrl);
    // Make the request to the Cart service
    const response = await axios.get(apiUrl);

    // Return the data received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching cart data:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBookFromCart = async (req, res) => {
  try {
    console.log("In the deleteBook method");
    const { customerId } = req.user; // Extract customerId from user object
    console.log("req-param " + req.params);
    const { bookId } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/remove-cart/${customerId}/${bookId}`;

    console.log(`Deleting book from cart: ${apiUrl}`);

    // Make the DELETE request to the Cart service
    const response = await axios.delete(apiUrl);

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error deleting book from cart:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBookFromWishlist = async (req, res) => {
  try {
    console.log("In the deleteBook method");
    const { customerId } = req.user; // Extract customerId from user object
    console.log("req-param " + req.params);
    const { bookId } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Wishlist/remove-wishlist/${customerId}/${bookId}`;

    console.log(`Deleting book from Wishlist: ${apiUrl}`);

    // Make the DELETE request to the Cart service
    const response = await axios.delete(apiUrl);

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error deleting book from cart:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWishlistBooks = async (req, res) => {
  try {
    console.log("IN the getWishlist method");
    const { customerId } = req.user; // Extract customerId from user object

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Wishlist/wishlist/${customerId}`;

    console.log(apiUrl);
    // Make the request to the Cart service
    const response = await axios.get(apiUrl);

    // Return the data received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching cart data:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const moveBookToWishlist = async (req, res) => {
  try {
    console.log("user request ", req.user.customerId);
    const { customerId } = req.user; // Extract customerId from user object
    console.log("req-param " + req.params);
    const { bookId } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/transfer-to-wishlist/${customerId}/${bookId}`;

    console.log(`Deleting book from Wishlist: ${apiUrl}`);

    // Make the DELETE request to the Cart service
    const response = await axios.post(apiUrl);

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error moving book from cart to wishlist:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const moveBookToCart = async (req, res) => {
  try {
    console.log("user request ", req.user.customerId);
    const { customerId } = req.user; // Extract customerId from user object
    console.log("req-param " + req.params);
    const { bookId } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Wishlist/transfer-to-cart/${customerId}/${bookId}`;

    // Make the DELETE request to the Cart service
    const response = await axios.post(apiUrl);

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error moving book from wishlist to cart:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBookQuantity = async (req, res) => {
  try {
    const { customerId } = req.user; // Extract customerId from user object

    const { bookId } = req.params; // Extract bookId from request parameters

    const { quantity } = req.body; // Extract quantity from request

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/update-quantity/${customerId}/${bookId}/${quantity}`;

    // Make the DELETE request to the Cart service
    const response = await axios.put(apiUrl, {});

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in Updating book quantity:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPaymentPage = async (req, res) => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys

  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/order-confirmation",
    cancel_url: "http://localhost:3000/order-confirmation",
  });
  res.json({ id: session.id });
};

const makeCartEmpty = async (req, res) => {
  try {
    const { customerId } = req.user; // Extract customerId from user object

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/delete-all-cart/${customerId}`;

    // Make the DELETE request to the Cart service
    const response = await axios.delete(apiUrl, {});

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in Deleting Cart:", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendInvoices = async (req, res) => {
  try {
    console.log("In the send invoice");

    const { firstName, lastName, email } = req.user;
    const invoiceDetails = req.body;

    if (!invoiceDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice details are required." });
    }

    const orderDetails = {
      ...invoiceDetails,
      customerName: `${firstName} ${lastName}`,
      email: email,
    };

    await sendInvoiceEmail(orderDetails, email);

    res
      .status(200)
      .json({ success: true, message: "Invoice sent successfully." });
  } catch (error) {
    console.error("Error sending invoice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send invoice. Please try again later.",
    });
  }
};
const addBookToCart = async (req, res) => {
  try {
    const { customerId } = req.user; // Extract customerId from user object

    const { bookId, quantity } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Cart/add-cart/${customerId}/${bookId}/${quantity}`;

    // Make the DELETE request to the Cart service
    const response = await axios.post(apiUrl);

    // Return the response received from the Cart service
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in Adding Book to Cart", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBookToWishlist = async (req, res) => {
  try {
    console.log("in the add to wishlist service");
    const { customerId } = req.user; // Extract customerId from user object

    const { bookId } = req.params; // Extract bookId from request parameters

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Construct the API URL
    const apiUrl = `${process.env.CART_SERVICE_URL}/api/Wishlist/add-wishlist/${customerId}/${bookId}`;

    // Make the DELETE request to the Cart service
    const response = await axios.post(apiUrl);

    // Return the response received from the Cart service

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in Adding Book to Wishlist", error.message);

    // Handle errors gracefully
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCartBooks,
  deleteBookFromCart,
  deleteBookFromWishlist,
  getWishlistBooks,
  moveBookToWishlist,
  moveBookToCart,
  updateBookQuantity,
  getPaymentPage,
  makeCartEmpty,
  sendInvoices,
  addBookToCart,
  addBookToWishlist,
};

// // Send the Email

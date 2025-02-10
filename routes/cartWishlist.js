const express = require("express");
const {
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
} = require("../controllers/cartWishlistController");
require("dotenv").config();

const router = express.Router();

router.get("/cart", getCartBooks);
router.post("/cart/:bookId/:quantity", addBookToCart);
router.get("/wishlist", getWishlistBooks);
router.post("/wishlist/:bookId", addBookToWishlist);
router.delete("/cart/:bookId", deleteBookFromCart);
router.delete("/wishlist/:bookId", deleteBookFromWishlist);
router.put("/cart/:bookId", updateBookQuantity);
router.post("/transfer-to-wishlist/:bookId", moveBookToWishlist);
router.post("/transfer-to-cart/:bookId", moveBookToCart);
router.delete("/cart", makeCartEmpty);

router.post("/send-invoice", sendInvoices);

router.post("/create-checkout-session", getPaymentPage);

module.exports = router;

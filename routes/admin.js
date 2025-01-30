/* Vivek@30/01 on VSCode */

const express = require("express");
const {
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById,
} = require("../controllers/adminController");
const { getUser } = require("../controllers/userController");
require("dotenv").config();

const router = express.Router();

/*
    METHOD: GET
    Get details of the currently logged in user/admin
    example endpoint: https://localhost:4000/admin
*/
router.get("/", getUser);

/*
    METHOD: GET
    Get all users
    example endpoint: https://localhost:4000/admin/users
*/
router.get("/users", getAllUsers);

/*
    METHOD: GET
    Get details of a single user using Id
    example endpoint: https://localhost:4000/user/1
*/
router.get("/user/:id", getUserById);

/*
    METHOD: PATCH
    Update a single user using Id
    example endpoint: https://localhost:4000/user/1

    Request body fields: {
      email, firstName, lastName, mobile, gender
    }
*/
router.patch("/user/:id", updateUserById);

/*
    METHOD: DELETE
    Delete a single user using Id (Admin cannot delete himself via this endpoint)
    example endpoint: https://localhost:4000/user/1
*/
router.delete("/user/:id", deleteUserById);

module.exports = router;

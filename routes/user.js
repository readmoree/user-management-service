/* Vivek@28/01 on VSCode  */

const express = require("express");
const db = require("../config/db");
const { snakeToCamelCase, undefinedOrValue } = require("../utils/miscUtils");
const {
  getAllAddressForAnUser,
  addNewAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
require("dotenv").config();

const router = express.Router();

/*
    METHOD: GET
    Gets details for the currently logged in user
    example endpoint: https://localhost:4000/user
*/
router.get("/", getUser);

router.patch("/", updateUser);
/*
    METHOD: DELETE
    Deletes currently logged in user
    example endpoint: https://localhost:4000/user
*/
router.delete("/", deleteUser);
/*
    METHOD: GET
    Lists all address for a logged in user
    example endpoint: https://localhost:4000/user/address
*/
router.get("/address", getAllAddressForAnUser);

/*
    METHOD: POST
    Adds a new address for a particular user
    example endpoint: https://localhost:4000/user/address

    Request body fields: { 
      flatNo, buildingName, locality, area, city, district, pincode, state, country
    }
*/
router.post("/address", addNewAddress);

/*
    METHOD: GET
    Fetches a single address by an Id
    example endpoint: https://localhost:4000/user/address/1
*/
router.get("/address/:id", getAddressById);

/*
    METHOD: PATCH
    Updates a single address by an Id
    example endpoint: https://localhost:4000/user/address/1

    Request body fields: {
      flatNo, buildingName, locality, area, city, district, pincode, state, country
    }
*/
router.patch("/address/:id", updateAddressById);

/*
    METHOD: DELETE
    Deletes a single address by an Id
    example endpoint: https://localhost:4000/user/address/1
*/
router.delete("/address/:id", deleteAddressById);

module.exports = router;

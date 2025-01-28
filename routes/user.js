/* Vivek@28/01 on VSCode  */

const express = require("express");
const db = require("../config/db");
const { snakeToCamelCase } = require("../utils/miscUtils");
require("dotenv").config();

const router = express.Router();

/*
    METHOD: GET
    lists all address for a particular user
    example endpoint: https://localhost:4000/user/1/address
*/
router.get("/:id/address", async (req, res) => {
  try {
    const { id } = req.params;

    // check if the given user exists or not
    const [user] = await db.query(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User with the given ID does not exist!",
      });
    }

    const [addresses] = await db.query(
      "SELECT * FROM address WHERE customer_id = ?",
      [id]
    );

    return res.status(200).json({
      status: "success",
      data: addresses.map(snakeToCamelCase, addresses),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/*
    METHOD: POST
    Adds a new address for a particular user
    example endpoint: https://localhost:4000/1/address

    Request body fields: { 
      flatNo, buildingName, locality, area, city, district, pincode, state, country
    }
*/
router.post("/:id/address", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      flatNo,
      buildingName,
      locality,
      area,
      city,
      district,
      pincode,
      state,
      country,
    } = req.body;

    // check if the given user exists or not
    const [user] = await db.query(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User with the given ID does not exist!",
      });
    }

    // if exists, insert new address into the table
    await db.query(
      "INSERT INTO address(customer_id, flat_no, building_name, locality, area, city, district, pincode, state, country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user[0].customer_id,
        flatNo,
        buildingName,
        locality,
        area,
        city,
        district,
        pincode,
        state,
        country,
      ]
    );

    return res.status(201).json({
      status: "success",
      message: "Address added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/*
    METHOD: GET
    Fetches a single address by an Id
    example endpoint: https://localhost:4000/user/address/1
*/
router.get("/address/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // check if the address with the given id exists or not
    const [address] = await db.query(
      "SELECT * FROM address WHERE address_id = ?",
      [id]
    );

    if (address.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Requested address does not exist",
      });
    }

    return res.status(200).json({
      status: "success",
      data: snakeToCamelCase(address[0]),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;

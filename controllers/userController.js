/* Vivek@29/10 on VSCode */

const db = require("../config/db");
const { snakeToCamelCase, undefinedOrValue } = require("../utils/miscUtils");
require("dotenv").config();

const getAllAddressForAnUser = async (req, res) => {
  try {
    const { customerId } = req.user;

    const [addresses] = await db.query(
      "SELECT * FROM address WHERE customer_id = ?",
      [customerId]
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
};

const addNewAddress = async (req, res) => {
  try {
    const { customerId } = req.user;
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

    // insert new address into the table
    await db.query(
      "INSERT INTO address(customer_id, flat_no, building_name, locality, area, city, district, pincode, state, country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        customerId,
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
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId } = req.user;

    // check if the address with the given id exists or not
    const [address] = await db.query(
      "SELECT * FROM address WHERE address_id = ? AND customer_id = ?",
      [id, customerId]
    );

    if (address.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Requested address does not exist for this user",
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
};

const updateAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId } = req.user;
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

    // check if the address with the given id exists or not
    const [address] = await db.query(
      "SELECT * FROM address WHERE address_id = ? AND customer_id = ?",
      [id, customerId]
    );

    if (address.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Requested address does not exist for this user",
      });
    }

    await db.query(
      "UPDATE address SET flat_no = ?, building_name = ?, locality = ?, area = ?, city = ?, district = ?, pincode = ?, state = ?, country = ? WHERE address_id = ? AND customer_id = ?",
      [
        undefinedOrValue(address[0].flat_no, flatNo),
        undefinedOrValue(address[0].building_name, buildingName),
        undefinedOrValue(address[0].locality, locality),
        undefinedOrValue(address[0].area, area),
        undefinedOrValue(address[0].city, city),
        undefinedOrValue(address[0].district, district),
        undefinedOrValue(address[0].pincode, pincode),
        undefinedOrValue(address[0].state, state),
        undefinedOrValue(address[0].country, country),
        id,
        customerId,
      ]
    );

    return res.status(200).json({
      status: "success",
      message: "Address successfully updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId } = req.user;

    // check if the address with the given id exists or not
    const [address] = await db.query(
      "SELECT * FROM address WHERE address_id = ? AND customer_id = ?",
      [id, customerId]
    );

    if (address.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Requested address does not exist for this user",
      });
    }

    await db.query(
      "DELETE FROM address WHERE address_id = ? AND customer_id = ?",
      [id, customerId]
    );

    return res.status(200).json({
      status: "success",
      message: "Address successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAddressById,
  getAllAddressForAnUser,
  addNewAddress,
  deleteAddressById,
  updateAddressById,
};

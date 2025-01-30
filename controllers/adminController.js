/* Vivek@30/01 on VSCode */

const db = require("../config/db");
const { snakeToCamelCase, undefinedOrValue } = require("../utils/miscUtils");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT customer_id, first_name, last_name, mobile, email, dob, gender, role, status FROM customer",
      []
    );

    return res.status(200).json({
      status: "success",
      data: users.map(snakeToCamelCase),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await db.query(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );

    const {
      customerId,
      email,
      firstName,
      lastName,
      mobile,
      dob,
      gender,
      role,
      status,
    } = snakeToCamelCase(user[0]);

    return res.status(200).json({
      status: "success",
      data: {
        customerId,
        email,
        firstName,
        lastName,
        mobile,
        dob,
        gender,
        role,
        status,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, mobile, gender } = req.body;

    const [user] = await db.query(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );
    if (user.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Requested user does not exist",
      });
    }

    await db.query(
      "UPDATE customer SET email = ?, first_name = ?, last_name = ?, mobile = ?, gender = ? WHERE customer_id = ?",
      [
        undefinedOrValue(user[0].email, email),
        undefinedOrValue(user[0].first_name, firstName),
        undefinedOrValue(user[0].last_name, lastName),
        undefinedOrValue(user[0].mobile, mobile),
        undefinedOrValue(user[0].gender, gender),
        id,
      ]
    );

    return res.status(200).json({
      status: "success",
      message: "User updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM customer WHERE customer_id = ? AND customer_id != ?",
      [id, req.user.customerId]
    );

    if (result.affectedRows === 0) {
      return res.status(id == req.user.customerId ? 400 : 404).json({
        status: "error",
        message:
          id == req.user.customerId
            ? "Admin cannot be self deleted"
            : "Requested user does not exist",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User deleted",
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
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

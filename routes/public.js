/* Vivek@03/02 on VSCode */

const express = require("express");
const db = require("../config/db");
require("dotenv").config();

const router = express.Router();

/*
    METHOD: GET
    List all users with given Ids
    example endpoint: https://localhost:4000/user/users?ids=1,2
*/
router.get("/users", async (req, res) => {
  try {
    const query = req.query.ids;

    if (typeof query === undefined || query === null) {
      return res.status(400).json({
        status: "error",
        message: "Ids required",
      });
    }

    const [users] = await db.query(
      `SELECT customer_id, first_name, last_name FROM customer WHERE customer_id IN(${query})`,
      []
    );
    const userData = users.map((user) => ({
      customerId: user.customer_id,
      firstName: user.first_name,
      lastName: user.last_name,
    }));

    console.log(userData);

    // const jsonData = {};
    // for (let i = 0; i < users.length; i++) {
    //   const { first_name: firstName, last_name: lastName } = users[i];
    //   jsonData[users[i].customer_id] = { firstName, lastName };
    // }

    return res.status(200).json({
      status: "success",
      data: userData,
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

const express = require("express");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const orders = require("../../models/Order");

//Get All Orders with the User Populated
router.get("/", (req, res) => {
  orders
    .find({})
    .lean()
    .populate("user", ["name", "avatar", "email", "date"])
    .then((data) => res.send(data));
});

router.post(
  "/",
  // [
  //   check("name", "Name is required").not().isEmpty(),
  //   check("email", "Please enter a valid email address").isEmail(),
  //   check("phone", "Please enter a valid phone number ").not().isEmpty(),
  //   check(
  //     "location",
  //     "Please enter a delivery location, i.e. hotel name and room number"
  //   )
  //     .not()
  //     .isEmpty(),
  // ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, data } = req.body;
    try {
      const newOrder = await orders.create({
        user,
        data,
      });
      res.json(newOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//
router.put("/:orderId", auth, async (req, res) => {
  try {
    let order = await orders.findById(req.params.orderId);
    if (order) {
      order = await orders.findByIdAndUpdate(
        { _id: req.params.orderId },
        { status: req.body.status },
        { new: true }
      );
      return res.json(order);
    }
    return res.send("ORDER NOT FOUND");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

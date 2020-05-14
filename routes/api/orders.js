const express = require("express");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Order = require("../../models/Order");

//Get All Orders with the User Populated
router.get("/", async (req, res) => {
  try {
    const order = await Order.find().populate({
      path: "user",
      select: "name email avatar date isAdmin",
    });
    if (order) {
      return res.json(order);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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
      const newOrder = await Order.create({
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
    let order = await Order.findById(req.params.orderId);
    if (order) {
      order = await Order.findByIdAndUpdate(
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

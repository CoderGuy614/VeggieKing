const router = require("express").Router();
// const express = require('express');
// const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
// const cors = require('cors');

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "veggiekingdelivery@gmail.com",
      pass: "VeggieKing69",
    },
  });

  //   const mailOptionsCustomer = {
  //     from: "CamboCraftClothing@gmail.com",
  //     to: data.email,
  //     subject: "CamboCraft Clothing -- ORDER CONFIRMATION --",
  //     html:
  //       `<h2> Hello ${data.name}!</h2>
  //         <h2>Thank you for your order!  We have received your information and will contact you to arrange a convenient delivery.</h2>

  //         <h3> Your Order Contains ${numOfItems} Items </h3>

  //         <ul>` +
  //       items.map((i) => `<li>` + i + `</li>` + `</ul>`) +
  //       `<h3>Your Order Total is: $ ${data.totalPrice}</h3>

  //         <h3> Your Contact Information:  </h3>

  //         <p> Name: ${data.name} </p>
  //         <p> Email: ${data.email}</p>
  //         <p> Phone: ${data.phone}</p>
  //         <p> Location: ${data.location}</p>

  //         <h3> Thank You </h3>`,
  //   };

  const mailOptionsSeller = {
    from: "veggiekingdelivery@gmail.com",
    to: "veggiekingdelivery@gmail.com",
    subject: "NEW ORDER RECEIVED",
    html:
      `<h4> Customer Name: ${data.user.name}</h4>,
    <h4> Customer Email: ${data.user.email}</h4>
    <h4> Customer Phone: ${data.profile.phone}</h4>
    <h4> Customer Location:${data.profile.location}</h4>
    <h4> Delivery Notes: ${data.profile.deliveryNotes} </h4>
    <h4> ORDER ITEMS: </h4>
    <ul>` +
      data.data.map(
        (item) =>
          `<li>` +
          item.name +
          " " +
          item.qty +
          " " +
          item.price +
          " " +
          item.pricePer +
          " " +
          item.total +
          `</li>` +
          `</ul>`
      ) +
      `<h3>Your Order Total is:</h3>`,
  };

  //   smtpTransport.sendMail(mailOptionsCustomer, (error, response) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       res.send("Success");
  //     }
  //     smtpTransport.close();
  //   });

  smtpTransport.sendMail(mailOptionsSeller, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});

module.exports = router;

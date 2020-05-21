const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
  const data = req.body;
  const totalPrice = data.data.reduce((a, b) => a + b.total, 0);
  const totalPriceUSD = totalPrice / 4000;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "veggiekingdelivery@gmail.com",
      pass: "VeggieKing69",
    },
  });

  const mailOptionsCustomer = {
    from: "CamboCraftClothing@gmail.com",
    to: data.user.email,
    subject: "VeggieKing Delivery -- ORDER CONFIRMATION --",
    html:
      `<h2> Hello ${data.user.name}!</h2>
          <h2>Thank you for your order!  We have received your information and will contact you to arrange a convenient delivery.</h2>

          <h4> ORDER ITEMS: </h4>
          <ul>` +
      data.data.map(
        (item, index) =>
          `<li>` +
          (index + 1) +
          ": " +
          item.name +
          ", " +
          item.qty +
          ", " +
          item.pricePer +
          ", " +
          item.price +
          " KHR, total:" +
          item.total +
          "KHR " +
          `</li>` +
          `</ul>`
      ) +
      `<h3>Your Order Total is: ${totalPrice}  KHR / $ ${totalPriceUSD} USD </h3>

            <h3> Your Contact Information:  </h3>

            <p> Email: ${data.user.email}</p>
            <p> Phone: ${data.user.profile.phone}</p>
            <p> Location: ${data.user.profile.location}</p>
            <p> Delivery Instructions: ${data.user.profile.deliveryNotes}
          

          <h3> Thank You </h3>`,
  };

  const mailOptionsSeller = {
    from: "veggiekingdelivery@gmail.com",
    to: "veggiekingdelivery@gmail.com",
    subject: "NEW ORDER RECEIVED",
    html:
      `<h4> Customer Name: ${data.user.name}</h4>,
    <h4> Customer Email: ${data.user.email}</h4>
    <h4> Customer Phone: ${data.user.profile.phone}</h4>
    <h4> Customer Location:${data.user.profile.location}</h4>
    <h4> Delivery Notes: ${data.user.profile.deliveryNotes} </h4>
    <h4> ORDER ITEMS: </h4>
    <ul>` +
      data.data.map(
        (item, index) =>
          `<li>` +
          (index + 1) +
          ": " +
          item.name +
          ", " +
          item.qty +
          ", " +
          item.pricePer +
          ", " +
          item.price +
          " KHR, total:" +
          item.total +
          "KHR " +
          `</li>` +
          `</ul>`
      ) +
      `<h3>Your Order Total is: ${totalPrice}  KHR / $ ${totalPriceUSD} USD </h3>`,
  };

  smtpTransport.sendMail(mailOptionsCustomer, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });

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

const ordermodel = require("../models/ordersmodel");

const addOrders = async (req, res) => {
  try {
    const formerror = {};
    if (req.body.user_id === undefined) {
      formerror.user_id = "User ID is required";
    }
    if (req.body.brand === undefined) {
      formerror.brand = "brand required";
    }
    if (req.body.model === undefined) {
      formerror.model = "model is required";
    }
    if (req.body.userName === undefined) {
      formerror.userName = "userName is required";
    }
    if (req.body.contactNo === undefined) {
      formerror.contactNo = "contactNo is required";
    }
    if (req.body.email === undefined) {
      formerror.email = "email is required";
    }
    if (req.body.address === undefined) {
      formerror.address = "address is required";
    }
    if (req.body.pincode === undefined) {
      formerror.pincode = "pincode is required";
    }
    if (req.body.totalPrice === undefined) {
      formerror.totalPrice = "Total price is required";
    }
    if (Object.keys(formerror).length !== 0) {
      res.send(formerror);
    }
    const getOrders = {
      user_id: req.body.user_id,
      brand: req.body.brand,
      model: req.body.model,
      userName: req.body.userName,
      contactNo: req.body.contactNo,
      email: req.body.email,
      address: req.body.address,
      pincode: req.body.pincode,
      totalPrice: req.body.totalPrice,
      discount: req.body.discount,
      priceAfterDiscount: req.body.totalPrice - req.body.discount,
      order_id: "FLIPK-" + Date.now(),
    };

    const orders = new ordermodel(getOrders);
    await orders.save();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { addOrders };

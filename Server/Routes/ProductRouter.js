const express = require("express");
const ensureAuthenticated = require("../Middleware/Auth");
const router = express.Router();

router.get("/", ensureAuthenticated , (req, res) => {
    console.log("---logged in user detail---",req.user);
  res.status(200).json([
    {
      name: "Mobile",
      price: 10000,
    },
    {
      name: "TV",
      price: 20000,
    },
  ]);
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const delt = require("./models/models");
const AuthRouter = require("./Routes/AuthRoute")
const ProductRouter= require("./Routes/ProductRouter")
require('dotenv').config();


const PORT = process.env.PORT || 2003
const MONGO_URL = process.env.MONGO_URL


const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth',AuthRouter )
app.use('/products',ProductRouter )

mongoose.connect(MONGO_URL).then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => {
    console.log("Server running on",PORT);
  });
});

app.get("/get", async (req, res) => {
  const response = await delt.find();
  res.status(200).json(response);
});

app.post("/submit", async (req, res) => {
  const response = await delt.create(req.body);
  res.status(200).json(response);
});

app.delete("/clear", async (req, res) => {
  await delt.deleteMany({});
  res.status(200).json({ message: "deleted all" });
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await delt.findByIdAndDelete(id);
  res.status(200).json(response);
});


app.get('/ping', (req,res)=>{
  res.send("PONG")
})


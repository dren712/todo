const mongoose = require("mongoose")

const todos = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const delt = mongoose.model("Todo",todos)
module.exports=delt
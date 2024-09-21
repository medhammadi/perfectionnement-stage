const mongoose = require("mongoose");
const hardskilsSchema = mongoose.Schema({
  descriptionhardskils: {
    type: String,
    required: "description is required",
  },
});
module.exports = mongoose.model("hardskils", hardskilsSchema);

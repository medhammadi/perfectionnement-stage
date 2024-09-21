const mongoose = require("mongoose");
const langageSchema = mongoose.Schema({
  longueDescription: {
    type: String,
    required: "description is required",
  }
  
});
module.exports = mongoose.model("longue", langageSchema);

const mongoose = require("mongoose");
const comptenceTechniqueSchema = mongoose.Schema({
  descriptioncomptenceTechnique: {
    type: String,
    required: "description is required",
  },
 
});
module.exports = mongoose.model("conpetanceTechnique", comptenceTechniqueSchema);

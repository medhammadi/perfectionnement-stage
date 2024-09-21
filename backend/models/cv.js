const mongoose = require("mongoose");
const cvSchema = mongoose.Schema({
  cvCondidat: String,
  nom:String,
  prenom:String,
  adresse:String,
  telephone:String,
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comptenceTechniqueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conpetanceTechnique",
  },
  hardskilsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hardskils",
  },
  longueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "longue",
  },
});
module.exports = mongoose.model("cv", cvSchema);

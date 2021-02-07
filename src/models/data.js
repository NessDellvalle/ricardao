const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  name: String,
  userID: String,
  lb: String,
  money: Number,
  daily: Number,
  stealTime: Number,
  securityLevel: Number,
  stealLevel: Number,
  xp: Number,
  xpLevel: Number,
  workTime: Number,
  weekly: Number,
});

module.exports = mongoose.model("Data", dataSchema);

const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
playerSchema.index({
  fullname: "text",
  sport: "text",
  state: "text",
  role: "text",
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;

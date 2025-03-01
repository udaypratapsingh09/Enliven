const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
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
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});
coachSchema.index({
  fullname: "text",
  sport: "text",
  state: "text",
  role: "text",
});

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;

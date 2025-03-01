const Coach = require("../models/coaches");
const Player = require("../models/players");

module.exports.getAll = async (req, res) => {
  const results = await Profile.find().limit(20);
  if (!results) return res.status(404).send("No results found");
  res.json(results);
};

module.exports.filter = async (req, res) => {
  const filters = req.body;
  const { text } = filters;
  const players = await Player.find({ $text: { $search: text } }).limit(20);
  const coaches = await Coach.find({ $text: { $search: text } }).limit(20);
  const results = { players, coaches };
  res.status(200).json(results);
};

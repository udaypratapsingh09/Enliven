const Coach = require("../models/coaches");
const Player = require("../models/players");

module.exports.getAll = async (req, res) => {
  console.log("get all");
  const players = await Player.find({}).limit(20);
  const coaches = await Coach.find({}).limit(20);
  if (!players.length && !coaches.length)
    return res.json({ success: false, message: "No results were found" });
  const results = players.concat(coaches);
  console.log(results);
  res.status(200).json({ success: true, message: "Found results", results });
};

module.exports.filter = async (req, res) => {
  console.log("filter");
  console.log(req.body);
  const { searchString } = req.body;
  if (!searchString)
    res.json({ success: false, message: "Search text not found" });
  const players = await Player.find({ $text: { $search: searchString } }).limit(
    20
  );
  const coaches = await Coach.find({ $text: { $search: searchString } }).limit(
    20
  );
  if (!players.length && !coaches.length)
    return res.json({ success: false, message: "No results were found" });
  const results = players.concat(coaches);
  res.status(200).json({ success: true, message: "Found results", results });
};

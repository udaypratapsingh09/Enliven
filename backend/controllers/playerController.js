const Player = require("../models/players");
const User = require("../models/user");
const AppError = require("../utils/AppError");

module.exports.create = async (req, res, next) => {
  const { userId } = req.body;
  const foundUser = await Player.findOne({ owner: userId });
  if (foundUser)
    return res.json({
      success: false,
      message: "This user already exists. Update profile instead",
    });
  if (!userId) return next(new AppError("User not found", 404));
  const player = await Player.create({
    ...req.body,
    owner: userId,
  });
  await player.save();
  res.status(201).json({
    success: true,
    message: "Profile created successfully",
  });
};

module.exports.update = async (req, res, next) => {
  const { userId } = req.body;
  const foundPlayer = await Player.findOne({ owner: userId });
  if (!foundPlayer)
    return next(new AppError("Could not find this player", 404));
  await foundPlayer.updateOne({ ...req.body });
  await foundPlayer.save();
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
};

const Player = require("../models/players");
const User = require("../models/user");
const AppError = require("../utils/AppError");

module.exports.create = async (req, res, next) => {
  console.log("create route hit");
  const { userId } = req.body;
  console.log(req.body);
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

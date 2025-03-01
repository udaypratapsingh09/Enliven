const Coach = require("../models/coaches");
const AppError = require("../utils/AppError");

module.exports.create = async (req, res, next) => {
  console.log("create route hit");
  const { userId } = req.body;
  console.log(req.body);
  const foundUser = await Coach.findOne({ owner: userId });
  if (foundUser)
    return res.json({
      success: false,
      message: "This user already exists. Update profile instead",
    });
  if (!userId) return next(new AppError("User not found", 404));
  const coach = await Coach.create({
    ...req.body,
    owner: userId,
  });
  await coach.save();
  res.status(201).json({
    success: true,
    message: "Profile created successfully",
  });
};

module.exports.update = async (req, res, next) => {
  const { userId } = req.body;
  const foundCoach = await Coach.findOne({ owner: userId });
  if (!foundCoach) return next(new AppError("Could not find this coach", 404));
  await foundCoach.updateOne({ ...req.body });
  await foundCoach.save();
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
};

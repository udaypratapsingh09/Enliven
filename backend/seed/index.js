const { players } = require("./players");
const { coaches } = require("./coaches");
const Player = require("../models/players");
const Coach = require("../models/coaches");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlayers() {
  await Player.deleteMany({});
  for (const player of players) {
    player.role = "player";
    const newPlayer = await Player.create({ ...player });
    await newPlayer.save();
  }
}

async function seedCoaches() {
  await Coach.deleteMany({});
  for (const coach of coaches) {
    coach.role = "coach";
    const newCoach = await Coach.create({ ...coach });
    await newCoach.save();
  }
}
seedPlayers().then(console.log("players seeded"));
seedCoaches().then(() => {
  console.log("coaches seeded");
  mongoose.connection.close();
});

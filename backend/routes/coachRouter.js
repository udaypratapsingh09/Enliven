const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");

router.post("/create", coachController.create);
module.exports = router;

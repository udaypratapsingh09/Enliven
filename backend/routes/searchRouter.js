const express = require("express");
const User = require("../models/user");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.post("/", searchController.getAll);
router.post("/filter", searchController.filter);
module.exports = router;

const express = require("express");
const User = require("../models/user");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/", searchController.getAll);
router.get("/filter", searchController.filter);
module.exports = router;

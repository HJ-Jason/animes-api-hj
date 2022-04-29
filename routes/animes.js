var express = require("express");
var router = express.Router();

// Controller
var anime_controller = require("../controllers/anime");

router.get("/", anime_controller.getAll);

router.get("/:id", anime_controller.getById);

router.post("/", anime_controller.create);

router.put("/:id", anime_controller.update);

router.delete("/:id", anime_controller.delete);

module.exports = router;

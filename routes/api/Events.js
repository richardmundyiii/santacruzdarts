const express = require("express");
const router = express.Router();
const eventCtrl = require("../../controllers/Events");

router.get("/", eventCtrl.index);

router.post("/", eventCtrl.createEvent);

router.put("/:id", eventCtrl.updateEvent);

router.delete("/:id", eventCtrl.deleteEvent);

module.exports = router;

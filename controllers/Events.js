const Event = require("../models/Event");

module.exports = {
  index,
  createEvent,
  updateEvent,
  deleteEvent,
};

async function index(req, res) {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createEvent(req, res) {
  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function updateEvent(req, res) {
  try {
    const updateEvent = await Event.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateEvent);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteEvent(req, res) {
  try {
    const deletePost = await Event.findOneAndReplace({ _id: req.params.id });
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(400).json(error);
  }
}

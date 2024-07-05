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
  const { id } = req.params;
  const { title, details, date } = req.body;

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id },
      { title, details, date },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(400).json({ error: "Failed to update event" });
  }
}

async function deleteEvent(req, res) {
  try {
    const deletePost = await Event.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(400).json(error);
  }
}

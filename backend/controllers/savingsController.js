const Saving = require("../models/Saving");

exports.getEntries = async (req, res) => {
  try {
    const entries = await Saving.find({ user: req.user._id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};

exports.addEntry = async (req, res) => {
  try {
    const entry = new Saving({ ...req.body, user: req.user._id });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error("Add entry error:", err);
    res.status(500).json({ message: "Failed to add entry" });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const updated = await Saving.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Update entry error:", err);
    res.status(500).json({ message: "Failed to update entry" });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await Saving.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
};
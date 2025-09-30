const Expense = require("../models/Expense");

exports.getEntries = async (req, res) => {
  const entries = await Expense.find({ user: req.user._id });
  res.json(entries);
};

exports.addEntry = async (req, res) => {
  const entry = new Expense({ ...req.body, user: req.user._id });
  await entry.save();
  res.status(201).json(entry);
};

exports.updateEntry = async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteEntry = async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Deleted" });
};
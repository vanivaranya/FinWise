const express = require("express");
const router = express.Router();
const {
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry,
} = require("../controllers/expensesController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getEntries);
router.post("/", auth, addEntry);
router.put("/:id", auth, updateEntry);
router.delete("/:id", auth, deleteEntry);

module.exports = router;
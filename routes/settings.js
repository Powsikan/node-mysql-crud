// routes/settings.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new setting
router.post("/", async (req, res) => {
  const { name, description, currency } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO Settings (name, description, currency) VALUES (?, ?, ?)",
      [name, description, currency]
    );
    res.status(201).json({ id: result.insertId, name, description, currency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all settings
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Settings");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single setting by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM Settings WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a setting by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, currency } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE Settings SET name = ?, description = ?, currency = ? WHERE id = ?",
      [name, description, currency, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ id, name, description, currency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a setting by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM Settings WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

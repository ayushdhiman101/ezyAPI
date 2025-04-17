const express = require("express");
const router = express.Router();
const redis = require("../redis");
const generateID = require("../utils/idGenerator");

// POST /mock
router.post("/", async (req, res) => {
  const { data } = req.body;
  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  const id = generateID();
  await redis.setex(`mock:${id}`, 172800, JSON.stringify(data)); // TTL = 48 hours
  res.json({ url: `${process.env.BASE_URL}/api/${id}` });
});

// GET /api/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const raw = await redis.get(`mock:${id}`);
  if (!raw) return res.status(404).json({ error: "Mock not found or expired" });

  res.json(JSON.parse(raw));
});

module.exports = router;

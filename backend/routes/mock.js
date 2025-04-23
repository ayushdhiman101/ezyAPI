const express = require("express");
const router = express.Router();
const redis = require("../redis");
const generateID = require("../utils/idGenerator");

// POST /mock
router.post("/", async (req, res) => {
  const { data } = req.body;
  try {
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Data must be an array of JSON objects" });
    }

    for (const item of data) {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return res
          .status(400)
          .json({ error: "Each item must be a valid JSON object" });
      }
    }

    const id = generateID(); // Create one ID for the entire array

    await redis.setex(`mock:${id}`, 172800, JSON.stringify(data)); // TTL = 48 hours

    const mockUrl = `${process.env.BASE_URL}/api/${id}`;
    res.json({ success: true, url: mockUrl });
  } catch (err) {
    console.error("Error creating mock:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const raw = await redis.get(`mock:${id}`);
  if (!raw) return res.status(404).json({ error: "Mock not found or expired" });

  res.json(JSON.parse(raw));
});

module.exports = router;

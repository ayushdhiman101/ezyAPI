const express = require("express");
const router = express.Router();
const redis = require("../redis");
const generateID = require("../utils/idGenerator");

// POST /mock
router.post("/", async (req, res) => {
  const { data } = req.body;

  // Validate that data is an array
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ error: "Data must be an array of JSON objects" });
  }

  const urls = [];

  // Process each JSON object in the array
  for (const jsonData of data) {
    if (typeof jsonData !== "object") {
      return res
        .status(400)
        .json({ error: "Each item in the array must be a valid JSON object" });
    }

    const id = generateID();
    await redis.setex(`mock:${id}`, 172800, JSON.stringify(jsonData)); // TTL = 48 hours
    urls.push(`${process.env.BASE_URL}/api/${id}`);
  }

  // Return the list of URLs for the generated mocks
  res.json({ urls });
});

// GET /api/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const raw = await redis.get(`mock:${id}`);
  if (!raw) return res.status(404).json({ error: "Mock not found or expired" });

  res.json(JSON.parse(raw));
});

module.exports = router;

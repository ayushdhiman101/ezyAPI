const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const mockRoutes = require("./routes/mock");

app.use(cors());
app.use(express.json());

app.use("/mock", mockRoutes); // POST
app.use("/api", mockRoutes); // GET

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`EzyAPI backend running on port ${PORT}`));

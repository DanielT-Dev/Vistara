const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const logger = require("./utils/logger");
const requestLogger = require("./middleware/requestLogger");
const connectDB = require("./db/connect");

const apiRoutes = require("./routes");

dotenv.config();

const app = express();

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// -----------------------------------------------------------------------------
// Static images
// -----------------------------------------------------------------------------

app.use(
  "/paintings",
  express.static(
    path.join(__dirname, "../frontend/public/paintings")
  )
);

// -----------------------------------------------------------------------------
// API Routes (clean + scalable)
// -----------------------------------------------------------------------------

app.use("/api", apiRoutes);

// -----------------------------------------------------------------------------
// Static frontend (optional)
// -----------------------------------------------------------------------------

app.use(express.static(path.join(__dirname)));

// -----------------------------------------------------------------------------
// Fake authentication (temporary)
// -----------------------------------------------------------------------------

const users = [];

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  logger.info(`Signup attempt: ${email}`);

  const exists = users.find((u) => u.email === email);

  if (exists) {
    logger.warn(`Signup failed - user already exists: ${email}`);

    return res.status(400).json({
      message: "User already exists",
    });
  }

  users.push({ email, password });

  logger.info(`User created: ${email}`);

  res.json({
    message: "User created",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  logger.info(`Login attempt: ${email}`);

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    logger.warn(`Login failed: ${email}`);

    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  logger.info(`Login successful: ${email}`);

  res.json({
    message: "Login successful",
  });
});

// -----------------------------------------------------------------------------
// Global error handler
// -----------------------------------------------------------------------------

app.use((err, req, res, next) => {
  logger.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// -----------------------------------------------------------------------------
// Start server
// -----------------------------------------------------------------------------

connectDB()
  .then(() => {
    logger.info("Connected to MongoDB");

    app.listen(5000, () => {
      logger.info("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB");
    logger.error(err);
  });
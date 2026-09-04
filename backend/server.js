
// Load environment variables FIRST
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down the server for handling uncaught exception");
  process.exit(1);
});

// Start server after database connection
const startServer = async () => {
  try {
    // Connect database FIRST
    await connectDatabase();

    // Create server
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 8000}`
      );
    });

    // Unhandled promise rejection
    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled Rejection: ${err.message}`);

      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

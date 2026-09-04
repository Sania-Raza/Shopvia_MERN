
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    // Agar connection already active hai to dobara connect na karein
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    // Error ko caller ko handle karne dein
    throw error;
  }
};

module.exports = connectDatabase;


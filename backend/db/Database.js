const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB connected with server`);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

module.exports = connectDatabase;

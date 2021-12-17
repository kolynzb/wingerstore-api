const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to database");
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connection established"))
    .catch((err) => console.log(err.message))
    .finally(() =>
      console.log("Database connected successfully with no errors")
    );
};

module.exports = connectDB;

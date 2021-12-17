const connectDB = require("../Config/connectDB");
const PORT = process.env.PORT || 5000;

const startServer = async (app) => {
  await connectDB();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

module.exports = startServer;

// Import the dotenv package
require("dotenv").config();

// import the mongoose package, which allows us to work with MongoDB using JavaScript.
const mongoose = require("mongoose");

const dbConnect = async () => {
  // Connect to MongoDB using mongoose.connect() method.
  // It takes two arguments: the connection string and an object of options.
  //  We will use the connection string from the .env file and pass in the options object.
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log(`Error occurred while connecting to MongoDB: ${err.message}`)
  });
}

// Export the database connection for use in other parts of your application
module.exports = dbConnect;
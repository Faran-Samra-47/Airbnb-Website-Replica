// init/index.js

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  // Ensure that each image property is formatted as an object
  const listings = initData.data.map(listing => ({
    ...listing,
    image: {
      filename: listing.image.filename,
      url: listing.image.url
    }
  }));
  await Listing.insertMany(listings);
  console.log("data was initialized");
};

initDB();

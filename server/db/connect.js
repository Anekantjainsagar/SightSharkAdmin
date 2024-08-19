const { default: mongoose } = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectToDb;

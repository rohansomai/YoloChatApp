const mongoose = require('mongoose');
async function connectToDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected: ', connection.connection.host);
  } catch (Error) {
    console.error(Error);
    process.exit();
  }
}
module.exports = { connectToDB };

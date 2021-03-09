import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    // return handler(req, res);
    // console.log("Connected!")
  }
  // Use new db connection
  return mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  // return handler(req, res);
};

export default connectDB;
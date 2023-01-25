import mongoose from 'mongoose';

const connectDB = (url) => {
    // useful for search functionality
    mongoose.set('strictQuery', true);

    // connecting our database
    mongoose.connect(url).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));
}

export default connectDB;
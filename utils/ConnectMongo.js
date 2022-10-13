import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGOURI);

export default connectMongo;
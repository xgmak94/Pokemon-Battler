import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.NEXT_PUBLIC_MONGOURI);

export default connectMongo;
import mongoose from 'mongoose';

export const connect = async () => {
    const MONGODB_URL = process.env.MONGODB_URL

    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`DB CONNECTED SUCCESSFULLY`);
    } catch (error) {
        console.log(`DB CONNECTION FAILED`);
        console.error(error);
        process.exit(1);
    }
};

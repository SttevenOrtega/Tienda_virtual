import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

export const connectDB = async () => {
    try {
        const dbUri = process.env.DATABASE_URL;
        if (!dbUri) {
            throw new Error('DATABASE_URL is not defined in the environment variables');
        }

        await mongoose.connect(dbUri);
        console.log(">>> DB is connected");
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
};

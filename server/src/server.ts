import app from './app';
import sequelize from './config/database';
import { connectRedis } from './config/redis';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to Database
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync Database (use force: false to preserve data, alter: true for updates)
        // In production, use migrations. For this MVP, sync is okay for now.
        // await sequelize.sync({ alter: true }); 

        // Connect to Redis (Optional for dev)
        try {
            await connectRedis();
        } catch (e) {
            console.warn('Redis connection failed, caching disabled.');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();

import { app } from "./app.js";
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import logger from "./utils/logger.js";
dotenv.config({
    path: './src/.env'
})


const PORT = process.env.PORT || 8080

connectDB().then(
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`)
    })
).catch((error) => {
    logger.error("MongoDB connection error", error)
})
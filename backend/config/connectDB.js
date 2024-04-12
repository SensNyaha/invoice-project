import chalk from "chalk";
import mongoose from "mongoose";
import {systemLogs} from "../utils/Logger.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const connectToDB = async () => {
    try {
        const connectionParams = {
            dbName: process.env.DB_NAME
        };

        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams
        );
        console.log(`${chalk.blue.bold(`Mongo connected to ${connect.connection.host} with collection: ${connectionParams.dbName}`)}`);
        systemLogs.info(`Mongo connected to ${connect.connection.host}`)
    } catch (error) {
        console.error(`${chalk.red.bold(`Error: ${error.message}`)}`)
        process.exit(1);
    }
}

export default connectToDB;
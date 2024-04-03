import { configDotenv } from "dotenv";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../helpers/emailTransport";
import { systemLogs } from "./Logger";

configDotenv({path: path.join(process.cwd(), "..", "..", ".env")})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async(email ,subj, payload, template) => {
    try {
        const sourceDirectory = fs.readFileSync(
            path.join(__dirname, template),
            "utf-8"
        );

        const compiledTemplate = handlebars.compile(sourceDirectory);

        const emailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subj,
            html: compiledTemplate(payload)
        };

        await transporter.sendEmail(emailOptions);
    } catch (error) {
        systemLogs.error(`Email doesnt send: ${error}`)
    }
}

export default sendEmail;
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const {combine, timestamp, prettyPrint} = format;

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/combined-%DATE%.log",
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d"
})

export const systemLogs = createLogger({
    level: "http",
    format: combine(
        timestamp({
            format: "hh:mm:ss DD-MM-YYYY"
        }),
        prettyPrint()
    ),
    transports: [
        fileRotateTransport,
        new transports.File({
            level:"error",
            filename:"logs/error.log"
        })
    ],
    exceptionHandlers: [
        new transports.File({filename:"logs/exceses.log"})
    ],
    rejectionHandlers: [
        new transports.File({filename:"logs/rejections.log"})
    ]
});



export const morganMiddleware = morgan(
    function (tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: Number.parseFloat(tokens.status(req, res)),
            content_length: tokens.res(req, res, "content-length"),
            response_time: Number.parseFloat(tokens["response-time"](req, res))
        })
    },
    {
        stream: {
            write: (mes) => {
                const data = JSON.parse(mes);
                systemLogs.http("incoming-request", data)
            }
        }
    }
)
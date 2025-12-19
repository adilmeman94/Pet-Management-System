const winston = require("winston");
const { format } = require("winston");

const LOG_LEVEL = "info";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: format.combine(format.colorize(), format.simple()),
            level: LOG_LEVEL,
        }),
    ],
});

module.exports = logger;
import winston from "winston";
import {LoggerConfig, LogLevel} from "./types";
import {getNamespace} from "cls-hooked";


class Logger {
    private static instance: Logger;
    private readonly logger: winston.Logger;

    // Private constructor to enforce singleton
    private constructor(config?: LoggerConfig) {
        this.logger = this.createLogger(config);
    }

    public static init(config?: LoggerConfig): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(config);
        } else {
            Logger.instance.logger.configure({ level: config?.level})
        }
        
        return Logger.instance;
    }

    private createLogger(config?: LoggerConfig): winston.Logger {
        return winston.createLogger({
            levels: {
                critical: 0,
                error: 1,
                warn: 2,
                info: 3,
                debug: 4,
                test: 5,
            },
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    const cid = getNamespace("BYTE-LOGGER")?.get("cid");
                    return JSON.stringify({
                        ...(cid ? { cid } : {}),
                        level,
                        message: {
                            log: message,
                            timestamp,
                        },
                    });
                })
            ),
            transports: [new winston.transports.Console()],
            level: config.level || LogLevel.INFO,
        });
    }

    public static getLogger(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(level: string, message: string): void {
        if (this.logger) {
            this.logger.log({ level, message });
        }
    }

    public critical(message: string): void {
        this.log(LogLevel.CRITICAL, message);
    }

    public info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    public warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    public error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    public debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    public test(message: string): void {
        this.log(LogLevel.TEST, message);
    }
}

export const logger = Logger.init();

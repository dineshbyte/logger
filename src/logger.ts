import winston from 'winston';
import {LoggerConfig} from './types';
import {getCorrelationId} from './cls-storage';

class Logger {
    private static instance: Logger;
    private logger: winston.Logger | null = null;

    private constructor() {
        // private constructor to prevent instantiation
    }

    public init(config: LoggerConfig): void {
        if (!this.logger) {
            this.logger = this.createLogger(config);
        }
    }

    private createLogger(config: LoggerConfig): winston.Logger {
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
                winston.format.printf(({level, message, timestamp}) => {
                    const cid = getCorrelationId();
                    return JSON.stringify({
                        ...(cid ? {cid} : {}),
                        level,
                        message: {
                            log: message,
                            timestamp
                        }
                    });
                })
            ),
            transports: [new winston.transports.Console()],
            level: config.level || 'info',
        });
    }

    public static getLogger(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        if (!Logger.instance.logger) {
            throw new Error('Logger is not initialized. Please call logger.init() first.');
        }

        return Logger.instance;
    }

    public log(level: string, message: string): void {
        if (this.logger) {
            this.logger.log({level, message});
        }
    }

    public info(message: string): void {
        this.log('info', message);
    }

    public warn(message: string): void {
        this.log('warn', message);
    }

    public error(message: string): void {
        this.log('error', message);
    }

    public debug(message: string): void {
        this.log('debug', message);
    }
}

export const logger = Logger.getLogger();
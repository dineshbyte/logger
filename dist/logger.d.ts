import { LoggerConfig } from "./types";
declare class Logger {
    private static instance;
    private readonly logger;
    private constructor();
    static init(config?: LoggerConfig): Logger;
    private createLogger;
    static getLogger(): Logger;
    log(level: string, message: string): void;
    critical(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    test(message: string): void;
}
export declare const logger: Logger;
export {};

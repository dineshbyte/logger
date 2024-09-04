import { LoggerConfig } from './types';
declare class Logger {
    private static instance;
    private logger;
    private constructor();
    init(config: LoggerConfig): void;
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

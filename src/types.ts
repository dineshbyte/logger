export interface LoggerConfig {
    level?: string;
}

export enum LogLevel {
    CRITICAL = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4,
    TEST = 5
}
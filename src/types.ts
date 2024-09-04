export interface LoggerConfig {
    level?: string;
}

export enum LogLevel {
    CRITICAL = 'critical',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    TEST = 'test'
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const types_1 = require("./types");
const helper_1 = require("./helper");
class Logger {
    // Private constructor to enforce singleton
    constructor(config) {
        this.logger = this.createLogger(config);
    }
    static init(config) {
        if (!Logger.instance) {
            Logger.instance = new Logger(config);
        }
        else {
            Logger.instance.logger.configure({ level: config === null || config === void 0 ? void 0 : config.level });
        }
        return Logger.instance;
    }
    createLogger(config) {
        return winston_1.default.createLogger({
            levels: {
                critical: 0,
                error: 1,
                warn: 2,
                info: 3,
                debug: 4,
                test: 5,
            },
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => {
                const cid = (0, helper_1.getTraceId)();
                return JSON.stringify(Object.assign(Object.assign({}, (cid ? { cid } : {})), { level, message: {
                        log: message,
                        timestamp,
                    } }));
            })),
            transports: [new winston_1.default.transports.Console()],
            level: (config === null || config === void 0 ? void 0 : config.level) || types_1.LogLevel.INFO,
        });
    }
    log(level, message) {
        if (this.logger) {
            this.logger.log({ level, message });
        }
    }
    critical(message) {
        this.log(types_1.LogLevel.CRITICAL, message);
    }
    info(message) {
        this.log(types_1.LogLevel.INFO, message);
    }
    warn(message) {
        this.log(types_1.LogLevel.WARN, message);
    }
    error(message) {
        this.log(types_1.LogLevel.ERROR, message);
    }
    debug(message) {
        this.log(types_1.LogLevel.DEBUG, message);
    }
    test(message) {
        this.log(types_1.LogLevel.TEST, message);
    }
}
exports.logger = Logger.init();

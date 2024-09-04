"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const types_1 = require("./types");
const cls_hooked_1 = require("cls-hooked");
class Logger {
    constructor() {
        this.logger = null;
        // private constructor to prevent instantiation
    }
    init(config) {
        if (!this.logger) {
            this.logger = this.createLogger(config);
        }
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
                var _a;
                const cid = (_a = (0, cls_hooked_1.getNamespace)('BYTE-LOGGER')) === null || _a === void 0 ? void 0 : _a.get('cid');
                return JSON.stringify(Object.assign(Object.assign({}, (cid ? { cid } : {})), { level, message: {
                        log: message,
                        timestamp
                    } }));
            })),
            transports: [new winston_1.default.transports.Console()],
            level: config.level || types_1.LogLevel.INFO,
        });
    }
    static getLogger() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        if (!Logger.instance.logger) {
            throw new Error('Logger is not initialized. Please call logger.init() first.');
        }
        return Logger.instance;
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
exports.logger = Logger.getLogger();
//# sourceMappingURL=logger.js.map
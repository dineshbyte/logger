"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraceId = void 0;
const cls_hooked_1 = require("cls-hooked");
const getTraceId = () => {
    const session = (0, cls_hooked_1.getNamespace)('BYTE_LOGGER');
    return session ? session.get('traceId') : undefined;
};
exports.getTraceId = getTraceId;

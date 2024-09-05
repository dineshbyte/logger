import {getNamespace} from "cls-hooked";

export const getTraceId = (): string | undefined => {
    const session = getNamespace('BYTE_LOGGER');
    return session ? session.get('traceId') : undefined;
};

import { createNamespace } from 'cls-hooked';

const session = createNamespace('BYTE-LOGGER');

export const setCorrelationId = (cid: string): void => {
    session.set('cid', cid);
};

export const getCorrelationId = (): string | undefined => {
    return session.get('cid');
};
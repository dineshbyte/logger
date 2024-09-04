import {NextFunction, Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import {createNamespace} from 'cls-hooked';

const session = createNamespace('tracing-namespace');

export const setCorrelationId = (cid: string): void => {
    session.set('cid', cid);
};

export const getCorrelationId = (): string | undefined => {
    return session.get('cid');
};

// Rename the middleware function to requestTracingMiddleware
export const requestTracingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const cid = uuidv4(); // Generate a unique correlation ID
    session.run(() => {
        setCorrelationId(cid); // Store CID for this request
        next();
    });
};
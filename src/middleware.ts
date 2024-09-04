
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { setCorrelationId } from './cls-storage';

/**
 * Middleware to track requests
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const requestTrackingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const cid = uuidv4();
    setCorrelationId(cid);
    next();
};
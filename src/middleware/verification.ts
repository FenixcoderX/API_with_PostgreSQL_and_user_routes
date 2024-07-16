import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware function to verify the validity of an authentication token and add the decoded token to the request body
 *
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The next middleware function
 */
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        res.json('Access denied, invalid token, jwt token must be provided');
      }
      req.body.decoded = decoded;
      next();
    });
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token, jwt token must be provided');
  }
};

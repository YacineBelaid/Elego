import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';

export class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      logger.info(`ID of the session :  ${req.session.id}`);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;

import { NextFunction, Request, Response } from 'express';
import { Session } from '@prisma/client';
import { SessionDto } from '@dtos/session.dto';
import sessionService from '@services/session.service';

class SessionsController {
  public sessionService = new sessionService();

  public getSessions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllsessionsData: Session[] =
        await this.sessionService.findAllsession();

      res.status(200).json({ data: findAllsessionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSessionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = String(req.session.id);
      const findOnesessionData: Session =
        await this.sessionService.findsessionById(sessionId);

      res.status(200).json({ data: findOnesessionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionData: SessionDto = req.body.session;
      const createsessionData: Session =
        await this.sessionService.createsession(sessionData);

      res.status(201).json({ data: createsessionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionData: SessionDto = req.body.session;
      const updatesessionData: Session =
        await this.sessionService.updatesession(sessionData);

      res.status(200).json({ data: updatesessionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = String(req.session.id);
      const deletesessionData: Session =
        await this.sessionService.deletesession(sessionId);

      res.status(200).json({ data: deletesessionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SessionsController;

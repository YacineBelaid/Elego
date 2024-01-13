import { NextFunction, Request, Response } from 'express';
import { Filtre } from '@prisma/client';
import { FiltreDto } from '@dtos/filtre.dto';
import FiltreService from '@/services/filtre.service';
import { getSessionIdFromRequest } from '@/utils/sessionIdGetter';

class FiltresController {
  public filtreService = new FiltreService();

  public getFiltres = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllfiltresData: FiltreDto[] =
        await this.filtreService.findAllfiltre();

      res.status(200).json({ data: findAllfiltresData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getFiltreById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = getSessionIdFromRequest(req);
      const findOnefiltreData: FiltreDto = await this.filtreService.findfiltreById(sessionId);

      res.status(200).json({ data: findOnefiltreData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createFiltre = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = getSessionIdFromRequest(req);
      const filtreData: FiltreDto = req.body.filtre;
      const createfiltreData: FiltreDto = await this.filtreService.createfiltre(
        sessionId,
        filtreData
      );

      res.status(201).json({ data: createfiltreData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatefiltre = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
        const sessionId = getSessionIdFromRequest(req);
      const filtreData: FiltreDto = req.body.filtre;
      const updatefiltreData: FiltreDto = await this.filtreService.updatefiltre(
        sessionId,
        filtreData
      );

      res.status(200).json({ data: updatefiltreData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFiltre = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = String(req.session.id);
      const deletefiltreData: FiltreDto = await this.filtreService.deletefiltre(
        sessionId
      );

      res.status(200).json({ data: deletefiltreData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FiltresController;

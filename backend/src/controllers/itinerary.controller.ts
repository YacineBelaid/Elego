import { NextFunction, Request, Response } from 'express';
import { Itinerary } from '@prisma/client';
import { ItineraryDto } from '@dtos/itinerary.dto';
import ItineraryService from '@services/Itinerary.service';

class ItinerarysController {
  public ItineraryService = new ItineraryService();

  public getAllUsersItineraries = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllItinerarysData: Itinerary[] =
        await this.ItineraryService.findAllItinerary();

      res.status(200).json({ data: findAllItinerarysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getItineraryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryData: ItineraryDto = req.body.Itinerary;
      const findOneItineraryData: Itinerary =
        await this.ItineraryService.findItineraryById(ItineraryData);

      res.status(200).json({ data: findOneItineraryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createItinerary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryData: ItineraryDto = req.body.Itinerary;
      const createItineraryData: Itinerary =
        await this.ItineraryService.createItinerary(ItineraryData);

      res.status(201).json({ data: createItineraryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateItinerary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryData: ItineraryDto = req.body.Itinerary;
      const updateItineraryData: Itinerary =
        await this.ItineraryService.updateItinerary(ItineraryData);

      res.status(200).json({ data: updateItineraryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteItinerary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryData: ItineraryDto = req.body.Itinerary;
      const deleteItineraryData: Itinerary =
        await this.ItineraryService.deleteItinerary(ItineraryData);

      res.status(200).json({ data: deleteItineraryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ItinerarysController;

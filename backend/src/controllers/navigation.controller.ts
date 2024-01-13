import { NextFunction, Request, Response } from 'express';
import { navigation, Itinerary } from '@prisma/client';
import { NavigationDto } from '@dtos/navigation.dto';
import NavigationService from '@services/navigation.service';

class NavigationsController {
  public NavigationService = new NavigationService();

  public getNavigations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllNavigationsData: navigation[] =
        await this.NavigationService.findAllNavigation();

      res
        .status(200)
        .json({ data: findAllNavigationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getUserNavigations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const sessionId = String(req.session.id);
      const findAllNavigationsData: navigation[] =
        await this.NavigationService.findAllUserNavigation(sessionId);

      res
        .status(200)
        .json({ data: findAllNavigationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNavigationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryId = Number(req.body.Navigation.Itinerary.id);
      const sessionId = String(req.session.id);
      const NavigationData: NavigationDto = req.body;
      const findOneNavigationData: navigation =
        await this.NavigationService.findNavigationById(sessionId, ItineraryId);

      res.status(200).json({ data: findOneNavigationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNavigation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryId = Number(req.body.Navigation.Itinerary.id);
      const sessionId = String(req.session.id);
      const NavigationData: NavigationDto = req.body;
      const createNavigationData: navigation =
        await this.NavigationService.createNavigation(
          sessionId,
          ItineraryId,
          NavigationData
        );

      res.status(201).json({ data: createNavigationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNavigation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryId = Number(req.body.Navigation.Itinerary.id);
      const sessionId = String(req.session.id);
      const NavigationData: NavigationDto = req.body;
      const updateNavigationData: navigation =
        await this.NavigationService.updateNavigation(
          sessionId,
          ItineraryId,
          NavigationData
        );

      res.status(200).json({ data: updateNavigationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNavigation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ItineraryId = Number(req.body.Navigation.Itinerary.id);
      const sessionId = String(req.session.id);
      const NavigationData: NavigationDto = req.body;
      const deleteNavigationData: navigation =
        await this.NavigationService.deleteNavigation(
          sessionId,
          ItineraryId,
          NavigationData
        );

      res.status(200).json({ data: deleteNavigationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default NavigationsController;

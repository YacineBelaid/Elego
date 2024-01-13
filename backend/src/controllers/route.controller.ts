import { NextFunction, Request, Response } from 'express';
import { Route } from '@prisma/client';
import { RouteDto } from '@dtos/route.dto';
import RouteService from '@services/route.service';

class RoutesController {
  public RouteService = new RouteService();

  public getRoutes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllRoutesData: Route[] = await this.RouteService.findAllRoute();

      res.status(200).json({ data: findAllRoutesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRouteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const departureLong = Number(req.body.route.departure.longi);
      const departureLat = Number(req.body.route.departure.lat);
      const arrivalLong = Number(req.body.route.arrival.longi);
      const arrivalLat = Number(req.body.route.arrival.lat);
      const RouteData: RouteDto = req.body;
      const findOneRouteData: Route = await this.RouteService.findRouteById(
        departureLong,
        departureLat,
        arrivalLong,
        arrivalLat
      );

      res.status(200).json({ data: findOneRouteData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const departureLong = Number(req.body.route.departure.longi);
      const departureLat = Number(req.body.route.departure.lat);
      const arrivalLong = Number(req.body.route.arrival.longi);
      const arrivalLat = Number(req.body.route.arrival.lat);
      const RouteData: RouteDto = req.body;
      const createRouteData: Route = await this.RouteService.createRoute(
        departureLong,
        departureLat,
        arrivalLong,
        arrivalLat,
        RouteData
      );

      res.status(201).json({ data: createRouteData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const departureLong = Number(req.body.route.departure.longi);
      const departureLat = Number(req.body.route.departure.lat);
      const arrivalLong = Number(req.body.route.arrival.longi);
      const arrivalLat = Number(req.body.route.arrival.lat);
      const RouteData: RouteDto = req.body;
      const updateRouteData: Route = await this.RouteService.updateRoute(
        departureLong,
        departureLat,
        arrivalLong,
        arrivalLat,
        RouteData
      );

      res.status(200).json({ data: updateRouteData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const departureLong = Number(req.body.route.departure.longi);
      const departureLat = Number(req.body.route.departure.lat);
      const arrivalLong = Number(req.body.route.arrival.longi);
      const arrivalLat = Number(req.body.route.arrival.lat);
      const RouteData: RouteDto = req.body.route;
      const deleteRouteData: Route = await this.RouteService.deleteRoute(
        departureLong,
        departureLat,
        arrivalLong,
        arrivalLat,
        RouteData
      );

      res.status(200).json({ data: deleteRouteData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RoutesController;

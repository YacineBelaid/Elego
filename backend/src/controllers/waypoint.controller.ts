import { NextFunction, Request, Response } from 'express';
import { Waypoint } from '@prisma/client';
import { WaypointDto } from '@dtos/waypoint.dto';
import waypointService from '@services/waypoint.service';

class waypointsController {
  public waypointService = new waypointService();

  public getwaypoints = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllwaypointsData: Waypoint[] =
        await this.waypointService.findAllwaypoint();

      res.status(200).json({ data: findAllwaypointsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getwaypointById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const longi = Number(req.body.waypoint.longi);
      const lat = Number(req.body.waypoint.lat);
      const waypointData: WaypointDto = req.body.waypoint;
      const findOnewaypointData: Waypoint =
        await this.waypointService.findwaypointById(longi, lat);

      res.status(200).json({ data: findOnewaypointData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createwaypoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const longi = Number(req.body.waypoint.longi);
      const lat = Number(req.body.waypoint.lat);
      const waypointData: WaypointDto = req.body.waypoint;
      const createwaypointData: Waypoint =
        await this.waypointService.createwaypoint(longi, lat, waypointData);

      res.status(201).json({ data: createwaypointData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatewaypoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const longi = Number(req.body.waypoint.longi);
      const lat = Number(req.body.waypoint.lat);
      const waypointData: WaypointDto = req.body.waypoint;
      const updatewaypointData: Waypoint =
        await this.waypointService.updatewaypoint(longi, lat, waypointData);

      res.status(200).json({ data: updatewaypointData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletewaypoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const longi = Number(req.body.waypoint.longi);
      const lat = Number(req.body.waypoint.lat);
      const deletewaypointData: Waypoint =
        await this.waypointService.deletewaypoint(longi, lat);

      res.status(200).json({ data: deletewaypointData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default waypointsController;

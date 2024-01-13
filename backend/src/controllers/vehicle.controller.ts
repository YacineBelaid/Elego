import { NextFunction, Request, Response } from 'express';
import { Vehicle } from '@prisma/client';
import vehicleService from '@services/vehicle.service';
import { VehicleDto } from '@dtos/vehicle.dto';

class VehiclesController {
  public vehicleService = new vehicleService();

  public getVehicles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllvehiclesData: VehicleDto[] =
        await this.vehicleService.findAllvehicle();
      res.status(200).json(findAllvehiclesData);
    } catch (error) {
      next(error);
    }
  };

  public getVehicleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicle.id);
      const findOnevehicleData: Vehicle =
        await this.vehicleService.findvehicleById(vehicleId);

      res.status(200).json({ data: findOnevehicleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createVehicle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleData: Vehicle = req.body.vehicle;
      const createvehicleData: Vehicle =
        await this.vehicleService.createvehicle(vehicleData);

      res.status(201).json({ data: createvehicleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateVehicle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicle.id);
      const vehicleData: Vehicle = req.body.vehicle;
      const updatevehicleData: Vehicle =
        await this.vehicleService.updatevehicle(vehicleId, vehicleData);

      res.status(200).json({ data: updatevehicleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVehicle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicle.id);
      const deletevehicleData: Vehicle =
        await this.vehicleService.deletevehicle(vehicleId);

      res.status(200).json({ data: deletevehicleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VehiclesController;

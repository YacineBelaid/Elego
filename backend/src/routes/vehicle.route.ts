import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import VehiclesController from '../controllers/vehicle.controller';
import { VehicleDto } from '@/dtos/vehicle.dto';
import validationMiddleware from '@middlewares/validation.middleware';
import { Vehicle } from '@prisma/client';
class VehicleRoute implements Routes {
  public path = '/vehicules';
  public router = Router();
  public vehicleController = new VehiclesController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.vehicleController.getVehicles);
    this.router.post(
      `${this.path}`,
      validationMiddleware(VehicleDto, 'body'),
      this.vehicleController.createVehicle
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(VehicleDto, 'body'),
      this.vehicleController.updateVehicle
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.vehicleController.deleteVehicle
    );
  }
}
export default VehicleRoute;

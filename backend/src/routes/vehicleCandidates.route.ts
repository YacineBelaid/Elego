import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import VehicleCandidatessController from '@/controllers/vehicleCandidates.controller';

class VehicleCandidatesRoute implements Routes {
  public path = '/vehicle-candidates'
  public router = Router();
  public vehicleCandidatessController;

  constructor() {
    this.vehicleCandidatessController = new VehicleCandidatessController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.vehicleCandidatessController.getVehicleCandidatesById);
  }
}

export default VehicleCandidatesRoute;

import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import filtresController from '@/controllers/filtre.controller';

class FiltreRoute implements Routes {
  public path = '/filters';
  public router = Router();
  public filtreController: filtresController

  constructor() {
    this.filtreController = new filtresController()
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.filtreController.getFiltreById);
    this.router.post(`${this.path}`, this.filtreController.updatefiltre);
}
}

export default FiltreRoute;

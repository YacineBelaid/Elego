import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import GeoCodingController, {
  GeoCodingCoordinatesRequest,
} from '../controllers/geocoding.controller';
import validationMiddleware from '@middlewares/validation.middleware';

class GeoCodingRoute implements Routes {
  public path = '/geocoding';
  public router = Router();

  private controller = new GeoCodingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(GeoCodingCoordinatesRequest, 'body'),
      this.controller.search
    );
  }
}

export default GeoCodingRoute;

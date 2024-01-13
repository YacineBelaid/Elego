import App from '@/app';
import validateEnv from '@utils/envValidation';
import IndexRoute from '@/routes/index.route';
import { Routes } from './interfaces/routes.interface';
import VehiculeRoute from '@routes/vehicle.route';
import GeoCodingRoute from '@routes/geocoding.route';
import VehicleCandidatesRoute from './routes/vehicleCandidates.route';
import FiltreRoute from './routes/filtre.route';

validateEnv();
let routes = new Array<Routes>();

routes.push(new GeoCodingRoute());
routes.push(new IndexRoute());
routes.push(new FiltreRoute());
routes.push(new VehicleCandidatesRoute());
routes.push(new VehiculeRoute());

const app = new App(routes);

app.listen();

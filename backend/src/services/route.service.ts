import { PrismaClient, Route } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RouteDto } from '@dtos/route.dto';

class RouteService {
  public Route = new PrismaClient().route;

  public async findAllRoute(): Promise<Route[]> {
    const allRoute: Route[] = await this.Route.findMany();
    return allRoute;
  }

  public async findRouteById(
    departureLat: number,
    departureLong: number,
    arrivalLong: number,
    arrivalLat: number
  ): Promise<Route> {
    const RouteId = { departureLat, departureLong, arrivalLong, arrivalLat };
    if (isEmpty(RouteId)) throw new HttpException(400, 'RouteId is empty');

    const findRoute: Route = await this.Route.findUnique({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
    });
    if (!findRoute) throw new HttpException(409, "Route doesn't exist");

    return findRoute;
  }

  public async createRoute(
    departureLat: number,
    departureLong: number,
    arrivalLong: number,
    arrivalLat: number,
    RouteData: RouteDto
  ): Promise<Route> {
    const RouteId = { departureLat, departureLong, arrivalLong, arrivalLat };
    if (isEmpty(RouteData)) throw new HttpException(400, 'RouteData is empty');
    const findRoute: Route = await this.Route.findUnique({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
    });
    if (findRoute)
      throw new HttpException(409, `This Route : "${RouteId}" already exists`);

    const createRouteData: Route = await this.Route.create({
      data: { ...RouteData },
    });
    return createRouteData;
  }

  public async updateRoute(
    departureLat: number,
    departureLong: number,
    arrivalLong: number,
    arrivalLat: number,
    RouteData: RouteDto
  ): Promise<Route> {
    const RouteId = { departureLat, departureLong, arrivalLong, arrivalLat };
    if (isEmpty(RouteData)) throw new HttpException(400, 'RouteData is empty');
    const findRoute: Route = await this.Route.findUnique({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
    });
    if (!findRoute) throw new HttpException(409, "Route doesn't exist");

    const updateRouteData = await this.Route.update({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
      data: { ...RouteData },
    });
    return updateRouteData;
  }

  public async deleteRoute(
    departureLat: number,
    departureLong: number,
    arrivalLong: number,
    arrivalLat: number,
    RouteData: RouteDto
  ): Promise<Route> {
    const RouteId = { departureLat, departureLong, arrivalLong, arrivalLat };
    if (isEmpty(RouteData))
      throw new HttpException(400, "RouteId doesn't exist");

    const findRoute: Route = await this.Route.findUnique({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
    });
    if (!findRoute) throw new HttpException(409, "Route doesn't exist");

    const deleteRouteData = await this.Route.delete({
      where: { departureLat_departureLong_arrivalLong_arrivalLat: RouteId },
    });
    return deleteRouteData;
  }
}

export default RouteService;

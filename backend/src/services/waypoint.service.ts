import { PrismaClient, Waypoint } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { WaypointDto } from '@dtos/waypoint.dto';

class waypointService {
  public waypoint = new PrismaClient().waypoint;

  public async findAllwaypoint(): Promise<Waypoint[]> {
    const allwaypoint: Waypoint[] = await this.waypoint.findMany();
    return allwaypoint;
  }

  public async findwaypointById(longi: number, lat: number): Promise<Waypoint> {
    const waypointId = { longi, lat };
    if (isEmpty(waypointId))
      throw new HttpException(400, 'waypointId is empty');

    const findwaypoint: Waypoint = await this.waypoint.findUnique({
      where: { longi_lat: waypointId },
    });
    if (!findwaypoint) throw new HttpException(409, "waypoint doesn't exist");

    return findwaypoint;
  }

  public async createwaypoint(
    longi: number,
    lat: number,
    waypointData: WaypointDto
  ): Promise<Waypoint> {
    if (isEmpty(waypointData))
      throw new HttpException(400, 'waypointData is empty');
    const waypointId = { longi, lat };
    const findwaypoint: Waypoint = await this.waypoint.findUnique({
      where: { longi_lat: waypointId },
    });
    if (findwaypoint)
      throw new HttpException(
        409,
        `This waypoint : "${waypointData.adress}" already exists`
      );

    const createwaypointData: Waypoint = await this.waypoint.create({
      data: { ...waypointData },
    });
    return createwaypointData;
  }

  public async updatewaypoint(
    longi: number,
    lat: number,
    waypointData: WaypointDto
  ): Promise<Waypoint> {
    if (isEmpty(waypointData))
      throw new HttpException(400, 'waypointData is empty');
    const waypointId = { longi, lat };
    const findwaypoint: Waypoint = await this.waypoint.findUnique({
      where: { longi_lat: waypointId },
    });
    if (!findwaypoint) throw new HttpException(409, "waypoint doesn't exist");

    const updatewaypointData = await this.waypoint.update({
      where: { longi_lat: waypointId },
      data: { ...waypointData },
    });
    return updatewaypointData;
  }

  public async deletewaypoint(longi: number, lat: number): Promise<Waypoint> {
    const waypointId = { longi, lat };
    if (isEmpty(waypointId))
      throw new HttpException(400, "waypointId doesn't exist");

    const findwaypoint: Waypoint = await this.waypoint.findUnique({
      where: { longi_lat: waypointId },
    });
    if (!findwaypoint) throw new HttpException(409, "waypoint doesn't exist");

    const deletewaypointData = await this.waypoint.delete({
      where: { longi_lat: waypointId },
    });
    return deletewaypointData;
  }
}

export default waypointService;

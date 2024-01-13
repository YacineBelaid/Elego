import { PrismaClient, Vehicle } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { VehicleDto } from '@dtos/vehicle.dto';
import { mockVehicules } from '@utils/mockData';

class vehicleService {
  public vehicle = new PrismaClient().vehicle;

  public async findAllvehicle(): Promise<VehicleDto[]> {
    return mockVehicules;
  }

  public async findvehicleById(vehicleId: number): Promise<Vehicle> {
    if (isEmpty(vehicleId)) throw new HttpException(400, 'vehicleId is empty');

    const findvehicle: Vehicle = await this.vehicle.findUnique({
      where: { vehicleId: vehicleId },
    });
    if (!findvehicle) throw new HttpException(409, "vehicle doesn't exist");

    return findvehicle;
  }

  public async createvehicle(vehicleData: VehicleDto): Promise<Vehicle> {
    if (isEmpty(vehicleData))
      throw new HttpException(400, 'vehicleData is empty');

    const findvehicle: Vehicle = await this.vehicle.findUnique({
      where: { vehicleId: vehicleData.vehicleId },
    });
    if (findvehicle)
      throw new HttpException(
        409,
        `This id ${vehicleData.vehicleId} already exists`
      );

    const createvehicleData: Vehicle = await this.vehicle.create({
      data: { ...vehicleData },
    });
    return createvehicleData;
  }

  public async updatevehicle(
    vehicleId: number,
    vehicleData: VehicleDto
  ): Promise<Vehicle> {
    if (isEmpty(vehicleData))
      throw new HttpException(400, 'vehicleData is empty');

    const findvehicle: Vehicle = await this.vehicle.findUnique({
      where: { vehicleId: vehicleId },
    });
    if (!findvehicle) throw new HttpException(409, "vehicle doesn't exist");

    const updatevehicleData = await this.vehicle.update({
      where: { vehicleId: vehicleId },
      data: { ...vehicleData },
    });
    return updatevehicleData;
  }

  public async deletevehicle(vehicleId: number): Promise<Vehicle> {
    if (isEmpty(vehicleId))
      throw new HttpException(400, "vehicleId doesn't exist");

    const findvehicle: Vehicle = await this.vehicle.findUnique({
      where: { vehicleId },
    });
    if (!findvehicle) throw new HttpException(409, "vehicle doesn't exist");

    const deletevehicleData = await this.vehicle.delete({
      where: { vehicleId },
    });
    return deletevehicleData;
  }
}

export default vehicleService;
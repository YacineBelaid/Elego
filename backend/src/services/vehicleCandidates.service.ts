import { PrismaClient, Vehicle, VehicleCandidates } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { VehicleCandidateDto } from '@dtos/vehicleCandidate.dto';
import { VehicleResultDto } from '@/dtos/vehicleResult.dto';

class vehicleCandidateservice {
  public vehicleCandidates = new PrismaClient().vehicleCandidates;
  public vehicle = new PrismaClient().vehicle;

  public async findAllvehicleCandidates(): Promise<VehicleCandidates[]> {
    const allvehicleCandidates: VehicleCandidates[] =
      await this.vehicleCandidates.findMany();
    return allvehicleCandidates;
  }

  public async findvehicleCandidatesById(
    vehicleId: number,
    sessionId: string
  ): Promise<VehicleCandidates> {
    const vehicleCandidatesId = { vehicleId, sessionId };
    if (isEmpty(vehicleCandidatesId))
      throw new HttpException(400, 'vehicleCandidatesId is empty');

    const findvehicleCandidates: VehicleCandidates =
      await this.vehicleCandidates.findUnique({
        where: { vehicleId_sessionId: vehicleCandidatesId },
      });
    if (!findvehicleCandidates)
      throw new HttpException(409, "vehicleCandidates doesn't exist");

    return findvehicleCandidates;
  }

  public async findvehicleCandidatesBySessionId(sessionId: string ): Promise<Array<VehicleResultDto>> {
    if (isEmpty(sessionId)) throw new HttpException(400, "sessionId is empty");

    const findvehicleCandidates: Array<VehicleCandidates> = await this.vehicleCandidates.findMany({ where: { sessionId : sessionId } });
    
    let vehicleCandidatesIds: Array<number> = [];
    findvehicleCandidates.forEach(element => {
      vehicleCandidatesIds.push(element.vehicleId);
    });

    const findVehicles: Array<Vehicle> = await this.vehicle.findMany({
      where: {
        vehicleId: {
          in: vehicleCandidatesIds
        }
      }
    });

    let findVehicleResults: Array<VehicleResultDto> = [];

    findvehicleCandidates.forEach((candidateElement,candidateIndex,candidateArray) => {
      findVehicles.forEach((vehicleElement,vehicleIndex,vehicleArray) => {
        if(candidateElement.vehicleId == vehicleElement.vehicleId){
          findVehicleResults.push({vehicle: vehicleElement,candidacy: candidateElement});
        }
      });
    });

    return findVehicleResults;       
  }

  public async createvehicleCandidates(vehicleId: number,sessionId: string, vehicleCandidatesData: VehicleCandidateDto): Promise<VehicleCandidates> {
    const vehicleCandidatesId = {vehicleId , sessionId}
    if (isEmpty(vehicleCandidatesData)) throw new HttpException(400, "vehicleCandidatesData is empty");
    const findvehicleCandidates: VehicleCandidates = await this.vehicleCandidates.findUnique({ where: { vehicleId_sessionId: vehicleCandidatesId }});
    if (findvehicleCandidates) throw new HttpException(409, `This id ${vehicleCandidatesData} already exists`);
    
    const createvehicleCandidatesData: VehicleCandidates = await this.vehicleCandidates.create({ data: { ...vehicleCandidatesData,} });
    return createvehicleCandidatesData;
  }

  public async updatevehicleCandidates(
    vehicleId: number,
    sessionId: string,
    vehicleCandidatesData: VehicleCandidateDto
  ): Promise<VehicleCandidates> {
    if (isEmpty(vehicleCandidatesData))
      throw new HttpException(400, 'vehicleCandidatesData is empty');
    const vehicleCandidatesId = { vehicleId, sessionId };
    const findvehicleCandidates: VehicleCandidates =
      await this.vehicleCandidates.findUnique({
        where: { vehicleId_sessionId: vehicleCandidatesId },
      });
    if (!findvehicleCandidates)
      throw new HttpException(409, "vehicleCandidates doesn't exist");

    const updatevehicleCandidatesData = await this.vehicleCandidates.update({
      where: { vehicleId_sessionId: vehicleCandidatesData },
      data: { ...vehicleCandidatesData },
    });
    return updatevehicleCandidatesData;
  }

  public async deletevehicleCandidates(
    vehicleId: number,
    sessionId: string
  ): Promise<VehicleCandidates> {
    const vehicleCandidatesId = { vehicleId, sessionId };
    if (isEmpty(vehicleCandidatesId))
      throw new HttpException(400, "vehicleCandidatesId doesn't exist");

    const findvehicleCandidates: VehicleCandidates =
      await this.vehicleCandidates.findUnique({
        where: { vehicleId_sessionId: vehicleCandidatesId },
      });
    if (!findvehicleCandidates)
      throw new HttpException(409, "vehicleCandidates doesn't exist");

    const deletevehicleCandidatesData = await this.vehicleCandidates.delete({
      where: { vehicleId_sessionId: vehicleCandidatesId },
    });
    return deletevehicleCandidatesData;
  }
}

export default vehicleCandidateservice;

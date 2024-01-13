import { NextFunction, Request, Response } from 'express';
import { VehicleCandidates } from '@prisma/client';
import { VehicleCandidateDto } from '@dtos/vehicleCandidate.dto';
import vehicleCandidatesService from '@services/vehicleCandidates.service';
import { getSessionIdFromRequest } from '@/utils/sessionIdGetter';
import { VehicleResultDto } from '@/dtos/vehicleResult.dto';

class VehicleCandidatessController {
  public vehicleCandidatesService = new vehicleCandidatesService();

  public getVehicleCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllvehicleCandidatessData: VehicleCandidates[] =
        await this.vehicleCandidatesService.findAllvehicleCandidates();

      res
        .status(200)
        .json({ data: findAllvehicleCandidatessData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getVehicleCandidatesById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
     const sessionId =  getSessionIdFromRequest(req);
     const vehicleCandidates: Array<VehicleResultDto> = await this.vehicleCandidatesService.findvehicleCandidatesBySessionId(sessionId);

      res.status(200).json({ data: vehicleCandidates, message: 'findMany' });
    } catch (error) {
      next(error);
    }
  };

  public createVehicleCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicleCandidate.id);
      const sessionId = String(req.session.id);
      const vehicleCandidatesData: VehicleCandidateDto =
        req.body.vehicleCandidates;
      const createvehicleCandidatesData: VehicleCandidates =
        await this.vehicleCandidatesService.createvehicleCandidates(
          vehicleId,
          sessionId,
          vehicleCandidatesData
        );

      res
        .status(201)
        .json({ data: createvehicleCandidatesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateVehicleCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicleCandidate.id);
      const sessionId = String(req.session.id);
      const vehicleCandidatesData: VehicleCandidateDto =
        req.body.vehicleCandidates;
      const updatevehicleCandidatesData: VehicleCandidates =
        await this.vehicleCandidatesService.updatevehicleCandidates(
          vehicleId,
          sessionId,
          vehicleCandidatesData
        );

      res
        .status(200)
        .json({ data: updatevehicleCandidatesData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVehicleCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const vehicleId = Number(req.body.vehicleCandidate.id);
      const sessionId = String(req.session.id);
      const deletevehicleCandidatesData: VehicleCandidates =
        await this.vehicleCandidatesService.deletevehicleCandidates(
          vehicleId,
          sessionId
        );

      res
        .status(200)
        .json({ data: deletevehicleCandidatesData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VehicleCandidatessController;

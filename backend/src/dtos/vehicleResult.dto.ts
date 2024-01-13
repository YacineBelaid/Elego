import { VehicleDto } from "./vehicle.dto";
import { VehicleCandidateDto } from "./vehicleCandidate.dto";

export class VehicleResultDto {
    vehicle: VehicleDto;
    candidacy: VehicleCandidateDto;
}
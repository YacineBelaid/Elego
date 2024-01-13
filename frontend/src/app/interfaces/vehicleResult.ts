import { VehicleCandidates } from "./vehicleCandidate";
import { Vehicule } from "./Vehicule";

export interface VehicleResult {
    vehicle: Vehicule;
    candidacy: VehicleCandidates;
}
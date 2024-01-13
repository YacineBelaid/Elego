import sinon from 'sinon';
import { expect } from 'chai';
import vehicleCandidateservice from '@/services/vehicleCandidates.service';
import { VehicleCandidateDto } from '@dtos/vehicleCandidate.dto';
import { VehicleCandidates } from '@prisma/client';
import { Vehicle } from '@prisma/client';
import { VehicleResultDto } from '@/dtos/vehicleResult.dto';
import { assert } from 'console';

let vehicleCandidateA : VehicleCandidates = {
    vehicleId: 1,
    sessionId: "1",
    autonomyRank: 1,
    priceRank: 1,
    created_at: undefined,
    updated_at: undefined
};

let vehicleCandidateB : VehicleCandidates = {
    vehicleId: 2,
    sessionId: "1",
    autonomyRank: 2,
    priceRank: 2,
    created_at: undefined,
    updated_at: undefined
};

let vehicleA : Vehicle = {
    vehicleId: 1,
    brand: "Volskwagen",
    year: 2010,
    model: "Jetta",
    category: "Sport",
    type: "Electric",
    autonomy: 400,
    chargingTime: 30,
    seatsCount: 5,
    price: 30000,
    imageUrl: "nothing",
    batteryCapacity: 300,
    maxChargingPower: 200,
    created_at: undefined,
    updated_at: undefined
};

let vehicleB : Vehicle = {
    vehicleId: 2,
    brand: "Toyota",
    year: 2023,
    model: "Corolla",
    category: "Sport",
    type: "Electric",
    autonomy: 300,
    chargingTime: 20,
    seatsCount: 4,
    price: 20000,
    imageUrl: "nothing",
    batteryCapacity: 250,
    maxChargingPower: 210,
    created_at: undefined,
    updated_at: undefined
};

let vehicleC : Vehicle = {
    vehicleId: 3,
    brand: "Blank",
    year: 2000,
    model: "blank",
    category: "Sport",
    type: "Electric",
    autonomy: 400,
    chargingTime: 30,
    seatsCount: 5,
    price: 30000,
    imageUrl: "nothing",
    batteryCapacity: 300,
    maxChargingPower: 200,
    created_at: undefined,
    updated_at: undefined
};

let vehicleCandidateDTO : VehicleCandidateDto = {
    vehicleId: 1,
    sessionId: "1",
    autonomyRank: 1,
    priceRank: 1,
};

let vehicleCandidateList : Array<VehicleCandidates> = [vehicleCandidateA,vehicleCandidateB];
let vehicleList: Array<Vehicle> = [vehicleA,vehicleB,vehicleC];

class PrismaClientMockVehicleCandidate{
    public findUnique(a: any) {
        return {}
    }

    public findMany(a: any) {
        return {}
    }

    public create(a: any) {
        return {}
    }

    public update(a: any) {
        return {}
    }
}

class PrismaClientMockVehicle{
    public findMany(a: any) {
        return {}
    }
}


describe('Testing VehicleCandidateService', () => {

  it("should find no existing vehicleCandidate", async () => {
    const vcService = new vehicleCandidateservice();
    vcService.vehicleCandidates = new PrismaClientMockVehicleCandidate() as any;
    vcService.vehicle = new PrismaClientMockVehicle() as any;
    const vehicleCandidates = vcService.vehicleCandidates;
    const vehicle = vcService.vehicle;

    const findManyCandidates = sinon.stub(vehicleCandidates,"findMany").callsFake(
        () => {return [] as any});
    
    const findManyVehicle = sinon.stub(vehicle,"findMany").callsFake(
        () => {return vehicleList as any});

    let responseVc = await vcService.findvehicleCandidatesBySessionId("1")
    
    expect(responseVc.length).to.be.equal(0);

    sinon.assert.calledOnce(findManyCandidates);
    sinon.assert.calledOnce(findManyVehicle);
  });

  it("should find several existing vehicleCandidate by session id", async () => {
    const vcService = new vehicleCandidateservice();
    vcService.vehicleCandidates = new PrismaClientMockVehicleCandidate() as any;
    vcService.vehicle = new PrismaClientMockVehicle() as any;
    const vehicleCandidates = vcService.vehicleCandidates;
    const vehicle = vcService.vehicle;

    const findManyCandidates = sinon.stub(vehicleCandidates,"findMany").callsFake(
        () => {return vehicleCandidateList as any});
    
    const findManyVehicle = sinon.stub(vehicle,"findMany").callsFake(
        () => {return vehicleList as any});

    let responseVc = await vcService.findvehicleCandidatesBySessionId("1")
    
    expect(responseVc.length).to.be.equal(2);

    expect(responseVc[0].candidacy).to.be.eql(vehicleCandidateA);
    expect(responseVc[0].vehicle).to.be.eql(vehicleA);

    expect(responseVc[1].candidacy).to.be.eql(vehicleCandidateB);
    expect(responseVc[1].vehicle).to.be.eql(vehicleB);


    sinon.assert.calledOnce(findManyCandidates);
    sinon.assert.calledOnce(findManyVehicle);
  });

  it("should add a vehicleCandidate to a session", async () => {
    const vcService = new vehicleCandidateservice();
    vcService.vehicleCandidates = new PrismaClientMockVehicleCandidate() as any;
    vcService.vehicle = new PrismaClientMockVehicle() as any;
    const vehicleCandidates = vcService.vehicleCandidates

    const findUnique = sinon.stub(vehicleCandidates,"findUnique").callsFake(
        () => {return undefined});

    const create = sinon.stub(vehicleCandidates,"create").callsFake(
        () => {return vehicleCandidateA as any});

    await vcService.createvehicleCandidates(1,"1",vehicleCandidateDTO)

    sinon.assert.calledOnce(create);
    sinon.assert.calledOnce(findUnique);
  });

  it("should not add a vehicleCandidate to a session if it is already in it", async () => {
    const vcService = new vehicleCandidateservice();
    vcService.vehicleCandidates = new PrismaClientMockVehicleCandidate() as any;
    vcService.vehicle = new PrismaClientMockVehicle() as any;
    const vehicleCandidates = vcService.vehicleCandidates

    const findUnique = sinon.stub(vehicleCandidates,"findUnique").callsFake(
        () => {return vehicleCandidateA as any});

    const create = sinon.stub(vehicleCandidates,"create").callsFake(
        () => {return vehicleCandidateA as any});

    let httpExceptionThrown = false;
    try {
        await vcService.createvehicleCandidates(1,"1",vehicleCandidateDTO)
    } catch(HttpException) {
        httpExceptionThrown = true;
    }

    expect(httpExceptionThrown).to.be.true;

    sinon.assert.notCalled(create);
    sinon.assert.calledOnce(findUnique);
  });
});
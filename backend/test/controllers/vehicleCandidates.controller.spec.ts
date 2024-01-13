import request from 'supertest';
import App from '@/app';
import sinon from 'sinon';
import { expect } from 'chai';
import VehicleCandidatesRoute from '@/routes/vehicleCandidates.route';
import { VehicleCandidateDto } from '@/dtos/vehicleCandidate.dto';
import vehicleCandidateservice from '@/services/vehicleCandidates.service';
import { VehicleCandidates } from '@prisma/client';
import { Vehicle } from '@prisma/client';
import { VehicleResultDto } from '@/dtos/vehicleResult.dto'

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

let vehicleCandidateDTO : VehicleCandidateDto = {
    vehicleId: 1,
    sessionId: "1",
    autonomyRank: 1,
    priceRank: 1,
};

let vehicleResultList : Array<VehicleResultDto> = [{candidacy: vehicleCandidateA, vehicle: vehicleA},{candidacy: vehicleCandidateB, vehicle: vehicleB}];


describe('Testing vehicleCandidateRoute', () => {
    describe('[GET] /', () =>  {
        it("Should return a 200 status code when getting vehicleCandidates", async (): Promise<void> => {
            const vcRoute = new VehicleCandidatesRoute();
            const app = new App([vcRoute]);
            const vcService: vehicleCandidateservice = vcRoute.vehicleCandidatessController.vehicleCandidatesService;
            
            const getStub = sinon.stub(vcService,"findvehicleCandidatesBySessionId").resolves(vehicleResultList);
            
            let req = request(app.getServer()).get(`${vcRoute.path}`);

            const response = await req.send().expect(200);

            expect(response.body).to.be.an('object').and.to.have.property("data");
            expect(response.body.data).to.be.an('array');
            
            expect(response.body.data[0].vehicle.vehicleId).to.eql(1)
            expect(response.body.data[1].vehicle.vehicleId).to.eql(2)

            expect(response.body.data[0].candidacy.vehicleId).to.eql(1)
            expect(response.body.data[1].candidacy.vehicleId).to.eql(2)

            sinon.assert.calledOnce(getStub);
            getStub.restore();
        })
    })
})
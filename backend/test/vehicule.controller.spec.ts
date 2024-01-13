import request from 'supertest';
import App from '@/app';
import VehicleRoute from '@routes/vehicle.route';
import sinon from 'sinon';
import { expect } from 'chai';
import { VehicleDto } from '../src/dtos/vehicle.dto';

describe('Testing vehicleRoute', () => {
  describe('[POST] /', () => {
    it('should return a 201 status code when adding a vehicle', async (): Promise<void> => {
      const vehicleRoute = new VehicleRoute();
      const app = new App([vehicleRoute]);
      const vehicleService = vehicleRoute.vehicleController.vehicleService;
      const vehicleData: VehicleDto = {
        vehicleId: 1,
        brand: 'Tesla',
        year: 2021,
        price: 25000,
        model: 'Model 3',
        category: 'Compact',
        type: 'Electric',
        autonomy: 500,
        batteryCapacity: 75,
        maxChargingPower: 11,
        chargingTime: 8,
        seatsCount: 5,
        imageUrl: 'none',
      };

      const createStub = sinon.stub(vehicleService, 'createvehicle').resolves({
        ...vehicleData,
        created_at: undefined,
        updated_at: undefined,
      });

      await request(app.getServer())
        .post(`${vehicleRoute.path}`)
        .send(vehicleData)
        .expect(201);

      sinon.assert.calledWith(createStub, undefined);
      createStub.restore();
    });

    describe('[GET] /', () => {
      it('should return a 200 status code and an array of vehicles', async (): Promise<void> => {
        const vehicleRoute = new VehicleRoute();
        const app = new App([vehicleRoute]);
        const vehicleService = vehicleRoute.vehicleController.vehicleService;
        const vehicleData: VehicleDto[] = [
          {
            vehicleId: 2,
            brand: 'Tesla',
            year: 2021,
            price: 25000,
            model: 'Model 3',
            category: 'Compact',
            type: 'Electric',
            autonomy: 500,
            batteryCapacity: 75,
            maxChargingPower: 11,
            chargingTime: 8,
            seatsCount: 5,
            imageUrl: 'none',
          },
          {
            vehicleId: 3,
            brand: 'BMW',
            year: 2022,
            price: 30000,
            model: 'iX',
            category: 'SUV',
            type: 'Electric',
            autonomy: 600,
            batteryCapacity: 90,
            maxChargingPower: 22,
            chargingTime: 10,
            seatsCount: 7,
            imageUrl: 'none',
          },
        ];

        const findManyStub = sinon
          .stub(vehicleService, 'findAllvehicle')
          .resolves([{ ...vehicleData[0] }, { ...vehicleData[1] }]);

        const response = await request(app.getServer())
          .get(`${vehicleRoute.path}`)
          .expect(200);

        expect(response.body)
          .that.has.lengthOf(vehicleData.length);
        for (let i = 0; i < vehicleData.length; i++) {
          expect(response.body[i]).to.eql(vehicleData[i]);
        }
        sinon.assert.calledOnce(findManyStub);
      });
    });
  });
});

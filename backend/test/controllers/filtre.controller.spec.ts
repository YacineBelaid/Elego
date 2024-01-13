import request from 'supertest';
import App from '@/app';
import UserFiltersRoute from '@/routes/filtre.route';
import sinon from 'sinon';
import { expect } from 'chai';
import { FiltreDto } from '@/dtos/filtre.dto';
import FiltreService from '@/services/filtre.service';

const filtreData: FiltreDto = {
    sessionId: "1",
    price_min: 0,
    price_max: 42,
    valid_seat_count: [2,4],
    valid_categories: ['SUV'],
    valid_types: ['Hybride']
};

describe('Testing filtreRoute', () => {
    describe('[POST] /', () =>  {
        it("Should return a 200 status code when adding a filtre", async (): Promise<void> => {
            const filtreRoute = new UserFiltersRoute();
            const app = new App([filtreRoute]);
            const filtreService = filtreRoute.filtreController.filtreService;
            
            const updateStub = sinon.stub(filtreService,"updatefiltre").resolves({...filtreData});

            const response = await request(app.getServer()).post(`${filtreRoute.path}`).send(filtreData).expect(200);
            
            expect(response.body).to.be.an("object").and.to.have.property("data");
            expect(response.body.data.price_max).to.eql(42);

            sinon.assert.calledOnce(updateStub)
            updateStub.restore();
        })
    })

    describe('[GET] /', () =>  {
        it("Should return a 200 status code when getting a filtre", async (): Promise<void> => {
            const filtreRoute = new UserFiltersRoute();
            const app = new App([filtreRoute]);
            const filtreService = filtreRoute.filtreController.filtreService;
            
            const getStub = sinon.stub(filtreService,"findfiltreById").resolves({...filtreData});
            
            let req = request(app.getServer()).get(`${filtreRoute.path}`);

            const response = await req.send().expect(200);

            expect(response.body).to.be.an('object').and.to.have.property("data");
            expect(response.body.data).to.be.an('object');
            expect(response.body.data).to.eql(filtreData)

            sinon.assert.calledOnce(getStub);
            getStub.restore();
        })
    })
})
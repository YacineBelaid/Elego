import FiltreService from '@/services/filtre.service';
import sinon from 'sinon';
import { Filtre } from '@prisma/client';
import { expect } from 'chai';
import { FiltreDto } from '@/dtos/filtre.dto';

const filtreDataDB: Filtre = {
    sessionId: "1",
    price_min: 0,
    price_max: 42,
    valid_seat_count: "[2,4]",
    valid_categories: `["SUV"]`,
    valid_types: `["Hybride"]`,
    created_at: undefined,
    updated_at: undefined
};

class PrismaClientMock{
    public findUnique(a: any) {
        return {}
    }

    public create(a: any) {
        return {}
    }
}

describe('Testing FiltreService', () => {

  it("should find an existing filtre by session id", async () => {
    const filtreService = new FiltreService();
    filtreService.filtre = new PrismaClientMock() as any;
    const filtre = filtreService.filtre

    const findFiltreById = sinon.stub(filtre,"findUnique").callsFake(
        () => {return filtreDataDB as any});

    let responseFilter : FiltreDto = await filtreService.findfiltreById("1");
    
    expect(responseFilter.price_max).to.be.equal(filtreDataDB.price_max)

    expect(responseFilter.valid_seat_count).to.be.eql(JSON.parse(filtreDataDB.valid_seat_count))
    sinon.assert.calledOnce(findFiltreById)
  });

  it("should create a new filtre from a new session id", async () => {
    const filtreService = new FiltreService();
    filtreService.filtre = new PrismaClientMock() as any;
    const filtre = filtreService.filtre

    const findFiltreById = sinon.stub(filtre,"findUnique").callsFake(
        () => {return undefined});
    const create = sinon.stub(filtre,"create").callsFake(
            () => {return filtreDataDB as any});

    let responseFilter: FiltreDto = await filtreService.findfiltreById("1");

    expect(responseFilter.price_max).to.be.equal(filtreDataDB.price_max)
    expect(responseFilter.valid_seat_count).to.be.eql(JSON.parse(filtreDataDB.valid_seat_count))
    sinon.assert.called(findFiltreById)
    sinon.assert.calledOnce(create)
  });
  
});
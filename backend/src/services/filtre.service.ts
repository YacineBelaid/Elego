import { PrismaClient, Filtre } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { FiltreDto } from '@dtos/filtre.dto';

class FiltreService {
  public filtre = new PrismaClient().filtre;

  //Converti un Filtre en FiltreDto. Implémente la conversion d'un string en array pour la lecture des données.
  private filtreToDto(filtre: Filtre): FiltreDto {
    let filtreDto: FiltreDto ={
      price_max: undefined,
      price_min: undefined,
      sessionId: undefined,
      valid_seat_count: undefined,
      valid_categories: undefined,
      valid_types: undefined
    };

    if(filtre.price_max !== undefined)
      filtreDto.price_max = filtre.price_max;

    if(filtre.price_min !== undefined)
      filtreDto.price_min = filtre.price_min;

    if(filtre.sessionId !== undefined)
      filtreDto.sessionId = filtre.sessionId;


    if(filtre.valid_seat_count !== undefined) {
      filtreDto.valid_seat_count = JSON.parse(filtre.valid_seat_count);
    }

    if(filtre.valid_categories !== undefined)
      filtreDto.valid_categories = JSON.parse(filtre.valid_categories);

    if(filtre.valid_types !== undefined)
      filtreDto.valid_types = JSON.parse(filtre.valid_types);

    return filtreDto;
  }

  //Converti un FiltreDto en Filtre. Implémente la conversion d'un array en string pour stockage dans la BD.
  private dtoToFiltre(filtreDto: Partial<FiltreDto>): Partial<Filtre> {
    let filtre: Partial<Filtre> = {};
    if(filtreDto.price_max !== undefined)
      filtre.price_max = filtreDto.price_max;

    if(filtreDto.price_min !== undefined)
      filtre.price_min = filtreDto.price_min;

    if(filtreDto.sessionId !== undefined)
      filtre.sessionId = filtreDto.sessionId;

    if(filtreDto.valid_seat_count !== undefined)
      filtre.valid_seat_count = JSON.stringify(filtreDto.valid_seat_count);

    if(filtreDto.valid_categories !== undefined)
      filtre.valid_categories = JSON.stringify(filtreDto.valid_categories);

    if(filtreDto.valid_types !== undefined)
      filtre.valid_types = JSON.stringify(filtreDto.valid_types);

    return filtre;
  }

  public async findAllfiltre(): Promise<FiltreDto[]> {
    const allfiltre: Filtre[] = await this.filtre.findMany();
    let allFiltreDto: FiltreDto[];
    allfiltre.forEach(element => {
      allFiltreDto.push(this.filtreToDto(element));
    });

    return allFiltreDto;
  }

  public async findfiltreById(sessionId: string): Promise<FiltreDto> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'sessionId is empty');
    let findPromise = await this.filtre.findUnique({ where: { sessionId:sessionId } });
    let findFiltre: Filtre = await findPromise;
    
    if (!findFiltre) {
      let findfiltreDto = await this.createfiltre(sessionId,{});
      return findfiltreDto;
    }

    let findfiltreDto: FiltreDto = this.filtreToDto(findFiltre);
    return findfiltreDto;
  }

  public async createfiltre(sessionId:string,filtreData: Partial<FiltreDto>): Promise<FiltreDto> {

    const findfiltre: Filtre = await this.filtre.findUnique({ where: {  sessionId: sessionId  } });
    if (findfiltre) throw new HttpException(409, `This filtre : "${sessionId }" already exists`);
    
    const filtre = this.dtoToFiltre(filtreData)
    const createfiltreData: Filtre = await this.filtre.create({ data: { ...filtre,sessionId: sessionId} });

    return this.filtreToDto(createfiltreData);
  }

  public async updatefiltre(sessionId : string,filtreData: FiltreDto): Promise<FiltreDto> {
    if (isEmpty(filtreData)) throw new HttpException(400, "filtreData is empty");
    const findfiltre: Filtre = await this.filtre.findUnique({ where: {  sessionId:sessionId  } });
    if (!findfiltre) {
      return await this.createfiltre(sessionId,filtreData)
    }

    const filtre = this.dtoToFiltre(filtreData);
    const updatefiltreData = await this.filtre.update({ where: {  sessionId: sessionId  }, data: { ...filtre} });
    return this.filtreToDto(updatefiltreData);
  }

  public async deletefiltre(sessionId: string): Promise<FiltreDto> {
    if (isEmpty(sessionId))
      throw new HttpException(400, "sessionId doesn't exist");

    const findfiltre: Filtre = await this.filtre.findUnique({
      where: { sessionId: sessionId },
    });
    if (!findfiltre) throw new HttpException(409, "filtre doesn't exist");

    const deletefiltreData = await this.filtre.delete({
      where: { sessionId: sessionId },
    });
    return this.filtreToDto(deletefiltreData);
  }
}

export default FiltreService;

import { PrismaClient, Itinerary } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ItineraryDto } from '@dtos/itinerary.dto';

class itineraryService {
  public itinerary = new PrismaClient().itinerary;

  public async findAllItinerary(): Promise<Itinerary[]> {
    const allitinerary: Itinerary[] = await this.itinerary.findMany();
    return allitinerary;
  }

  public async findItineraryById(
    itineraryData: ItineraryDto
  ): Promise<Itinerary> {
    if (isEmpty(itineraryData.id))
      throw new HttpException(400, 'itineraryId is empty');

    const finditinerary: Itinerary = await this.itinerary.findUnique({
      where: { id: itineraryData.id },
    });
    if (!finditinerary) throw new HttpException(409, "itinerary doesn't exist");

    return finditinerary;
  }

  public async createItinerary(
    itineraryData: ItineraryDto
  ): Promise<Itinerary> {
    if (isEmpty(itineraryData))
      throw new HttpException(400, 'itineraryData is empty');
    const finditinerary: Itinerary = await this.itinerary.findUnique({
      where: { id: itineraryData.id },
    });
    if (finditinerary)
      throw new HttpException(
        409,
        `This itinerary : "${itineraryData.id}" already exists`
      );

    const createitineraryData: Itinerary = await this.itinerary.create({
      data: { ...itineraryData },
    });
    return createitineraryData;
  }

  public async updateItinerary(
    itineraryData: ItineraryDto
  ): Promise<Itinerary> {
    if (isEmpty(itineraryData))
      throw new HttpException(400, 'itineraryData is empty');
    const finditinerary: Itinerary = await this.itinerary.findUnique({
      where: { id: itineraryData.id },
    });
    if (!finditinerary) throw new HttpException(409, "itinerary doesn't exist");

    const updateitineraryData = await this.itinerary.update({
      where: { id: itineraryData.id },
      data: { ...itineraryData },
    });
    return updateitineraryData;
  }

  public async deleteItinerary(
    itineraryData: ItineraryDto
  ): Promise<Itinerary> {
    if (isEmpty(itineraryData))
      throw new HttpException(400, "itineraryId doesn't exist");

    const finditinerary: Itinerary = await this.itinerary.findUnique({
      where: { id: itineraryData.id },
    });
    if (!finditinerary) throw new HttpException(409, "itinerary doesn't exist");

    const deleteitineraryData = await this.itinerary.delete({
      where: { id: itineraryData.id },
    });
    return deleteitineraryData;
  }
}

export default itineraryService;

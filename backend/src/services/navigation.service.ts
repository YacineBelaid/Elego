import { PrismaClient, navigation } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { NavigationDto } from '@dtos/navigation.dto';

class navigationService {
  public navigation = new PrismaClient().navigation;

  public async findAllNavigation(): Promise<navigation[]> {
    const allnavigation: navigation[] = await this.navigation.findMany();
    return allnavigation;
  }

  public async findAllUserNavigation(sessionId: string): Promise<navigation[]> {
    const allnavigation: navigation[] = await this.navigation.findMany({
      where: { sessionId: sessionId },
    });
    return allnavigation;
  }

  public async findNavigationById(
    sessionId: string,
    ItineraryId: number
  ): Promise<navigation> {
    const navId = { ItineraryId, sessionId };
    if (isEmpty(navId)) throw new HttpException(400, 'navigationId is empty');

    const findnavigation: navigation = await this.navigation.findUnique({
      where: { ItineraryId_sessionId: navId },
    });
    if (!findnavigation)
      throw new HttpException(409, "navigation doesn't exist");

    return findnavigation;
  }

  public async createNavigation(
    sessionId: string,
    ItineraryId: number,
    navigationData: NavigationDto
  ): Promise<navigation> {
    const navId = { ItineraryId, sessionId };
    if (isEmpty(navigationData))
      throw new HttpException(400, 'navigationData is empty');
    const findnavigation: navigation = await this.navigation.findUnique({
      where: { ItineraryId_sessionId: navId },
    });
    if (findnavigation)
      throw new HttpException(
        409,
        `This navigation : "${navigationData.sessionId}" already exists`
      );

    const createnavigationData: navigation = await this.navigation.create({
      data: { ...navigationData },
    });
    return createnavigationData;
  }

  public async updateNavigation(
    sessionId: string,
    ItineraryId: number,
    navigationData: NavigationDto
  ): Promise<navigation> {
    const navId = { ItineraryId, sessionId };
    if (isEmpty(navigationData))
      throw new HttpException(400, 'navigationData is empty');
    const findnavigation: navigation = await this.navigation.findUnique({
      where: { ItineraryId_sessionId: navId },
    });
    if (!findnavigation)
      throw new HttpException(409, "navigation doesn't exist");

    const updatenavigationData = await this.navigation.update({
      where: { ItineraryId_sessionId: navId },
      data: { ...navigationData },
    });
    return updatenavigationData;
  }

  public async deleteNavigation(
    sessionId: string,
    ItineraryId: number,
    navigationData: NavigationDto
  ): Promise<navigation> {
    const navId = { sessionId, ItineraryId };
    if (isEmpty(navigationData))
      throw new HttpException(400, "navigationId doesn't exist");

    const findnavigation: navigation = await this.navigation.findUnique({
      where: { ItineraryId_sessionId: navId },
    });
    if (!findnavigation)
      throw new HttpException(409, "navigation doesn't exist");

    const deletenavigationData = await this.navigation.delete({
      where: { ItineraryId_sessionId: navId },
    });
    return deletenavigationData;
  }
}

export default navigationService;

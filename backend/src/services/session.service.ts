import { PrismaClient, Session } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SessionDto } from '@dtos/session.dto';

class sessionService {
  public session = new PrismaClient().session;

  public async findAllsession(): Promise<Session[]> {
    const allsession: Session[] = await this.session.findMany();
    return allsession;
  }

  public async findsessionById(sessionId: string): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'sessionId is empty');

    const findsession: Session = await this.session.findUnique({
      where: { session_id: sessionId },
    });
    if (!findsession) throw new HttpException(409, "session doesn't exist");

    return findsession;
  }

  public async createsession(sessionData: SessionDto): Promise<Session> {
    if (isEmpty(sessionData))
      throw new HttpException(400, 'sessionData is empty');
    const findsession: Session = await this.session.findUnique({
      where: { session_id: sessionData.sessionId },
    });
    if (findsession)
      throw new HttpException(
        409,
        `This session : "${sessionData.sessionId}" already exists`
      );

    const createsessionData: Session = await this.session.create({
      data: { ...sessionData },
    });
    return createsessionData;
  }

  public async updatesession(sessionData: SessionDto): Promise<Session> {
    if (isEmpty(sessionData))
      throw new HttpException(400, 'sessionData is empty');
    const findsession: Session = await this.session.findUnique({
      where: { session_id: sessionData.sessionId },
    });
    if (!findsession) throw new HttpException(409, "session doesn't exist");

    const updatesessionData = await this.session.update({
      where: { session_id: sessionData.sessionId },
      data: { ...sessionData },
    });
    return updatesessionData;
  }

  public async deletesession(sessionId: string): Promise<Session> {
    if (isEmpty(sessionId))
      throw new HttpException(400, "sessionId doesn't exist");

    const findsession: Session = await this.session.findUnique({
      where: { session_id: sessionId },
    });
    if (!findsession) throw new HttpException(409, "session doesn't exist");

    const deletesessionData = await this.session.delete({
      where: { session_id: sessionId },
    });
    return deletesessionData;
  }
}

export default sessionService;

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import ExpressSession from 'express-session';
import ExpressMySqlSession from 'express-mysql-session';
import { v4 } from 'uuid';
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  SECRET,
  STORE_SESSIONS_IN_MYSQL,
  SECURE_SESSION_COOKIE,
  ORIGIN,
  CREDENTIALS,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  EXPRESS_TRUST_PROXY,
} from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // Utiliser les headers 'X-Forwarded-*' du reverse proxy dans 'req.ip' et autres.
    if (EXPRESS_TRUST_PROXY === 'true') {
      this.app.set('trust proxy', true);
    }

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  //Configuration of the middlewares
  private initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.configureCors();
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.configureSession();
  }

  private configureCors() {
    // Only used in development.
    if (!ORIGIN) {
      return;
    }

    this.app.use(
      cors({
        origin: ORIGIN,
        credentials: CREDENTIALS === 'true',
      })
    );
  }

  //Configuration of the cookie session
  private configureSession() {
    // equivalent to 2 weeks in milliseconds
    const MAX_AGE_MS = 1209600000;

    let sessionStore: ExpressSession.Store = null;
    if (STORE_SESSIONS_IN_MYSQL === 'true') {
      const storeOptions: ExpressMySqlSession.Options = {
        host: DB_HOST || 'localhost',
        port: DB_PORT ? parseInt(DB_PORT) : 3306,
        user: DB_USER || 'root',
        password: DB_PASSWORD || '',
        database: DB_NAME || 'SSVE',
        expiration: MAX_AGE_MS,
        createDatabaseTable: false, // Use the one in the Prisma schema.
        schema: {
          tableName: 'Session',
          columnNames: {
            session_id: 'session_id',
            data: 'data',
            expires: 'expires',
          },
        },
      };

      const expressSessionModule = require('express-session');
      const MySQLStore = ExpressMySqlSession(expressSessionModule);
      sessionStore = new MySQLStore(storeOptions);
    }

    const cookieOptions: ExpressSession.CookieOptions = {
      // equivalent to 30 days in milliseconds
      maxAge: MAX_AGE_MS,
    };

    if (SECURE_SESSION_COOKIE === 'true') {
      cookieOptions.secure = true;
    }

    const sessionOptions: ExpressSession.SessionOptions = {
      store: sessionStore,
      genid: function (req) {
        return v4();
      },
      secret: SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: cookieOptions,
    };

    this.app.use(ExpressSession(sessionOptions));
  }

  //Initialisation of the base router
  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  //Configuration of the swagger documentation
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'SSVE API documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  //Configuration of the error handler
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

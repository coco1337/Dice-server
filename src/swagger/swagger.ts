import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, {Options} from 'swagger-jsdoc';

const options: Options = {
  swaggerDefinition: {
    info: {
      title: 'Dice Game API',
      version: `${process.env.appVersion}`,
      description: process.env.description,
    },
    host: process.env.host,
    basePath: process.env.basePath,
  },
  apis: [
    './api/v1/*.ts',
    './swagger/*',
  ],
};

const specs = swaggerJsdoc(options);

export {
  swaggerUi,
  specs,
};

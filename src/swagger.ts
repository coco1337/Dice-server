import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, {Options} from 'swagger-jsdoc';
import 'dotenv/config';

const options: Options = {
  swaggerDefinition: {
    info: {
      title: 'Dice Game API',
      version: `v${process.env.appVersion}`,
      description: process.env.description,
    },
    host: process.env.host,
    basePath: process.env.basePath,
  },
  apis: [
    '**/*.ts',
  ],
};

const specs = swaggerJsdoc(options);

export {
  swaggerUi,
  specs,
};

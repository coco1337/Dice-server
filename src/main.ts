import 'dotenv/config';
import 'reflect-metadata';
import './controller/v1/authController';
import {createConnection} from 'typeorm';
import {BootStrap} from '@src/appCode/bootStrap';
import {DiContainer} from '@src/appCode/diContainer';
import {Routes} from '@src/Routes';
import {T_Member} from '@src/entities/T_Member';

createConnection({
  type: 'mssql',
  host: process.env.DBHost,
  port: 1433,
  username: process.env.DBUser,
  password: process.env.DBPass,
  database: process.env.DBName,
  entities: [
    T_Member,
  ],
  synchronize: true,
  logging: true,
  extra: {
    validateConnection: false,
    trustServerCertificate: true
  }
}).then(async connection => {
  const express = new BootStrap(new DiContainer().diContainer.resolve<Routes>(Routes)).express;

  express.listen(process.env.port, () => {
    console.info(`Server is listening on port => ${process.env.port}`);
    console.info(`docs: http://${process.env.host}/api-docs`);
  });
}).catch(error => console.error(error));


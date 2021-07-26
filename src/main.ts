import express, {Application, NextFunction, Request, Response} from 'express';
import {swaggerUi, specs} from './swagger/swagger';
import swagger from 'swagger-express-ts';
import {createServer, Server} from 'http';

import 'dotenv/config';
import 'reflect-metadata';
import './controller/v1/authController';
import {createConnection} from 'typeorm';
import {BootStrap} from '@src/appCode/bootStrap';
import {DiContainer} from '@src/appCode/diContainer';
import {Routes} from '@src/routes/Routes';
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
  options: {
    encrypt: true,
  },
}).then(async connection => {
  const express = new BootStrap(new DiContainer().diContainer.resolve<Routes>(Routes)).express;

  express.listen(process.env.port, () => {
    console.info(`Server is listening on port => ${process.env.port}`);
  });
}).catch(error => console.error(error));


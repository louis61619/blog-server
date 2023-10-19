/* eslint valid-jsdoc: "off" */
'use strict';
require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + process.env.SECRET_KEY;

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    myHost: process.env.SERVER_URL,
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: process.env.DB_HOST,
      // port
      port: process.env.DB_PORT,
      // username
      user: process.env.DB_USERNAME,
      // password
      password: process.env.DB_PASSWORD,
      // database
      database: process.env.DB,
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.multipart = {
    mode: 'file',
    fileSize: '1mb',
  };

  config.jwt = {
    secret: process.env.SECRET_KEY,
  };

  config.cluster = {
    listen: {
      port: Number(process.env.START_PORT),
    },
  };

  // config.session = {
  //   key: 'EGG_SESS',
  //   maxAge: 24 * 3600 * 1000, // 1 天
  //   httpOnly: true,
  //   encrypt: true,
  //   secure: true,
  //   sameSite: 'none',
  // };

  return {
    ...config,
    ...userConfig,
  };
};

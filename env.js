'use strict';

require('dotenv').config();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const SLACK_TOKEN = 'FILL_IN_LATER'; // TODO
const DATABASE_URL = 'postgresql://localhost/standup_bot_development';
const PORT = 3333;
const TIMEZONE = 'America/New_York';
const LOG_LEVEL = 10;

const knownEnvs = [
  'SLACK_TOKEN',
  'TIMEZONE',
  'URL'
];

if (appEnv.getServices() && Object.keys(appEnv.getServices()).length) {
  // If running on Cloud Foundry
  for (const env of knownEnvs) {
    process.env[env] = appEnv.getServiceCreds('standup-bot-cups')[env];
  }
}

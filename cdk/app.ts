#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from './lib/infraStack';
import { SendEmailStack } from './lib/sendEmailStack';
import { appConfig } from './app-config';

const app = new cdk.App();
new InfraStack(app, `${appConfig.PREFIX}InfraStack${appConfig.SUFFIX}`, {
  env: { account: appConfig.ACCOUNT, region: appConfig.REGION },
  stage: appConfig.STAGE,
  prefix: appConfig.PREFIX,
  suffix: appConfig.SUFFIX,
});
new SendEmailStack(app, `${appConfig.PREFIX}SendEmailStack${appConfig.SUFFIX}`, {
  env: { account: appConfig.ACCOUNT, region: appConfig.REGION },
  stage: appConfig.STAGE,
  prefix: appConfig.PREFIX,
  suffix: appConfig.SUFFIX,
});
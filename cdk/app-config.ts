import { Environment } from "aws-cdk-lib";

export namespace appConfig {
  export const ACCOUNT: Environment['account'] = process.env.CDK_DEFAULT_ACCOUNT;
  export const REGION: string = 'us-east-1';

  export enum Stage {
    DEV = 'dev',
    BETA = 'beta',
    PROD = 'prod'
  }
}
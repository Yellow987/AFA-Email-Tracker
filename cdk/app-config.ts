import { Environment } from "aws-cdk-lib";

export namespace appConfig {
  export enum Stage {
    DEV = 'dev',
    BETA = 'beta',
    PROD = 'prod'
  }

  export const ACCOUNT: Environment['account'] = process.env.CDK_DEFAULT_ACCOUNT;
  export const REGION: string = 'us-east-1';
  export const STAGE: Stage = (Stage as any)[process.env.STAGE || 'DEV'] as Stage;
  export const PREFIX: string = 'afa-';
  export const SUFFIX: string = '-' + STAGE;
}
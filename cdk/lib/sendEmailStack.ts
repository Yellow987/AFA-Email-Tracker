import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { appConfig } from '../app-config';

export interface SendEmailStackProps extends cdk.StackProps {
  readonly stage: appConfig.Stage;
  readonly prefix: string;
  readonly suffix: string;
}

export class SendEmailStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SendEmailStackProps) {
    super(scope, id, props);

    //Create Cognito User Pool
    const userPool = new cognito.UserPool(this, `${props.prefix}UserPool${props.suffix}`, {
      userPoolName: `${props.prefix}UserPool${props.suffix}`,
      selfSignUpEnabled: true,
      //accountRecovery: 
      autoVerify: {
        email: false
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireSymbols: true,
        requireUppercase: true,
      }
    });
  }


}

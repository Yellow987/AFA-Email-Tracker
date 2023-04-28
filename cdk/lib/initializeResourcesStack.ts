import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as path from 'path';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import { appConfig } from '../app-config';

export interface InfraStackProps extends cdk.StackProps {
  readonly stage: appConfig.Stage;
  readonly prefix: string;
  readonly suffix: string;
  readonly trackingPixelsBucket: s3.Bucket;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    //Deploy Reference trackingPixel PNG
    const pngFilePath = path.resolve(__dirname, '..', 'resources');
    const deploymentRole = new iam.Role(this, 'DeploymentRole', {
      assumedBy: new iam.ServicePrincipal('codedeploy.amazonaws.com'),
      inlinePolicies: {
        s3Permissions: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: ['s3:PutBucketPolicy'],
            resources: [trackingPixelsBucket.bucketArn]
          })]
        })
      } 
    });
    new s3Deployment.BucketDeployment(this, 'DeployPNG', { 
      sources: [s3Deployment.Source.asset(pngFilePath)],
      destinationBucket: trackingPixelsBucket,
      role: deploymentRole 
    });
  }
}

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { appConfig } from '../app-config';
import { BucketAccessControl,  BlockPublicAccess } from 'aws-cdk-lib/aws-s3';

export interface InfraStackProps extends cdk.StackProps {
  readonly stage: appConfig.Stage;
  readonly prefix: string;
  readonly suffix: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    //Create S3
    const trackingPixelsBucket = new s3.Bucket(this, `${props.prefix}tracking-pixels${props.suffix}`, {
      bucketName: `${props.prefix}tracking-pixels${props.suffix}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.PUBLIC_READ,
    });
  }
}

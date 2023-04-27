import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const trackingPixelsBucket = new s3.Bucket(this, "TrackingPixels", {
      bucketName: 'tracking-pixels',
    });

  }
}

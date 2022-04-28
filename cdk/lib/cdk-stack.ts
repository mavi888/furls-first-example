import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Dynamodb table definition
    const exampleTable = new Table(this, "Hello", {
      partitionKey: { name: "name", type: AttributeType.STRING },
    });

    // lambda function
    const myFunction = new Function(this, "DynamoLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("functions"),
      handler: "function.handler",
      environment: {
        TABLE_NAME: exampleTable.tableName,
      } 
    });

    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      }
    });

    // permissions to lambda to dynamo table
    exampleTable.grantReadWriteData(myFunction);


    new CfnOutput(this, 'FunctionUrl', {
      value: myFunctionUrl.url,
    });
  }
}

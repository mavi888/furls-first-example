# LAMBDA FUNCTION URLS EXAMPLE

_Infrastructure as code framework used_: AWS SAM, AWS CDK
_AWS Services used_: AWS Lambda, AWS DynamoDB

## Summary of the demo

In this demo you will see:

- How to create a Lambda function URL with AWS SAM
- How to create a Lambda function URL with AWS CDK
- How to create a frontend that connects to the function URL using CORS

It is the same application with AWS SAM and CDK, just the infrastructure part changes.

This demo is part of a video posted in FooBar Serverless channel. You can check the video to see the whole demo.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the AWS Pricing page for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

- AWS CLI already configured with Administrator permission
- AWS SAM CLI installed - minimum version 1.46.0 (sam --version)
- AWS CDK CLI installed - minimum version 2.22.0 (cdk --version)
- NodeJS 14.x installed

## SAM application

In the `/sam` folder you will find all the CloudFormation resources to deploy this application with AWS SAM

We will be using AWS SAM and make sure you are running the latest version - at the time of writing, this was 1.46.0 (sam --version).

Deploy the project to the cloud:

```
sam deploy -g # Guided deployments
```

When asked about functions that may not have authorization defined, answer (y)es. The access to those functions will be open to anyone, so keep the app deployed only for the time you need this demo running.

Next times, when you update the code, you can build and deploy with:

```
sam deploy
```

Deploying outputs a function URL that you will need in your frontend project.

To delete the app:

```
sam delete
```

## CDK application

In the `/cdk` folder you will find all the CloudFormation resources to deploy this application with AWS CDK

We will be using AWS CDK and make sure you are running the latest version - at the time of writing, this was 2.22.0 (cdk --version).

Before deploying this project make sure that your account/region has been [bootstrapped with CDK](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).

Deploy the project to the cloud:

```
cdk deploy
```

Confirm the deployment and then your resources will get deployed.
Deploying outputs a function URL that you will need in your frontend project.

To delete the app:

```
cdk destroy
```

## Frontend application

In the `/client` folder you find the React - frontend application.

To get this working you need to copy the `aws-config_example.js` file with the name `aws-config.js`. And in the `greetingsEndpoint` add the function URL that you got when deploying any of the backend applications (CDK or SAM)

To start this locally:

```
npm install
npm start
```

## Links related to this code

- Video with more details:
- Launch blog post:

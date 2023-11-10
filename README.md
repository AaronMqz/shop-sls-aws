# shop-sls-aws

## Task 6

What was done?

- File `serverless.yml` contains configuration for `catalogBatchProcess` function
- File `serverless.yml` contains policies to allow lambda `catalogBatchProcess` function to interact with SNS and SQS
- File `serverless.yml` contains configuration for SQS `catalogItemsQueue`
- File `serverless.yml` contains configuration for SNS Topic `createProductTopic` and email subscription

## Additional tasks:

- `catalogBatchProcess` lambda is covered by **unit** tests
- set a Filter Policy for SNS `createProductTopic` in `serverless.yml` and create an additional email subscription to distribute messages to different emails depending on the filter for any product attribute

## Frontend, API endpoints:

- [FontendURL](https://d2c9ngqvx2bi1u.cloudfront.net/)

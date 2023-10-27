# shop-sls-aws

## Task 5

What was done?

- File serverless.yml contains configuration for importProductsFile function
- The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
- Frontend application is integrated with importProductsFile lambda
- The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda

## Additional tasks:

- async/await is used in lambda functions.
- importProductsFile lambda is covered by unit tests.
- At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called parsed, and then deleted from uploaded folder)

## Frontend, API endpoints:

- [FontendURL](https://d31vubhs0l2m6f.cloudfront.net/)

- [Import Products API](https://y0199mioek.execute-api.us-east-1.amazonaws.com/dev/import): https://y0199mioek.execute-api.us-east-1.amazonaws.com/dev/import

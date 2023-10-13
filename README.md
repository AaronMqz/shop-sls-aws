# shop-sls-aws

## Task 3

- [FontendURL](https://d31vubhs0l2m6f.cloudfront.net/)

## Additional (optional) tasks

- Async/await is used in lambda functions
- ES6 modules are used for Product Service implementation
- Custom Webpack/ESBuild/etc is manually configured for Product Service. Not applicable for preconfigured/built-in bundlers that come with templates, plugins, etc.
- SWAGGER documentation is created for Product Service
- Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- Main error scenarios are handled by API ("Product not found" error).

## API and swagger endpoints:

- [getProductsList](https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/products): GET - https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/products
- [Swagger](https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/swagger): GET - https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/swagger

## Some getProductsById examples:

- [Example1](https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80a1): GET - https://dbhzma9vy5.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80a1

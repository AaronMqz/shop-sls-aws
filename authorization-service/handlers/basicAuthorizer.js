export const basicAuthorizer = (event, ctx, cb) => {
  if (event["type"] != "TOKEN") {
    cb("Unauthorized");
  }

  try {
    const { authorizationToken } = event;
    const encodedCreds = authorizationToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const [username, password] = plainCreds;

    console.log(`USERNAME: ${username}, PASSWORD: ${password}`);

    const envPassword = process.env[username];

    const effect = envPassword && envPassword === password ? "Allow" : "Deny";

    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: event.methodArn,
        },
      ],
    };

    const authResponse = {
      principalId: username,
      policyDocument,
    };

    if (effect === "Allow") {
      cb(null, authResponse);
    } else {
      cb("Forbidden"); // HTTP 403
    }
  } catch (err) {
    cb(`Unauthorized: ${err.message}`);
  }
};

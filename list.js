import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

//Return list of all user notes
export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,

        //KeyConditionExpression defines condition for query
        // "userId = :userId" only returns items with matching userId
        //ExpressionAttributeValues defines the value in the condition
        // ":userId" defines userId to be the cognito identity pool identity id of authenticated user
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId" : event.requestContext.identity.cognitoIdentityId
        }
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});
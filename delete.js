import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event,context) => {
    const params = {
        TableName: process.env.tableName,

        //Defines the partition key and sort key of item to be deleted
        // userdId: Identity pool id of authenticated user
        // noteId: path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    await dynamoDb.delete(params);

    return {status : true};
});
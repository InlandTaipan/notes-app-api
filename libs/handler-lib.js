//Creating wrapper for lambda functions
export default function handler(lambda) {
    return function (event, context) {
        return Promise.resolve() //Account for function being async
        //Run lambda
        .then(() => lambda(event,context))
        //On success
        .then(responseBody => [200, responseBody])
        //On failure
        .catch(e => {
            return [500, {error: e.message}];
        })
        //Return http response
        .then(([statusCode, body]) => ({
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(body),
        }));
    };
}
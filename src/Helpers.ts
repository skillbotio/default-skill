export class Helpers {
    public static say(message: string, context: any, attributes?: any) {
        const response = {
            response: {
                outputSpeech: {
                    ssml: "<speak> " + message + " </speak>",
                    type: "SSML",
                },
                reprompt: {
                    outputSpeech: {
                        ssml: "<speak> " + message + " </speak>",
                        type: "SSML",
                    },
                },
                shouldEndSession: false,
            },
            sessionAttributes: attributes,
            version: "1.0",
        };
        context.succeed(response);
    }
}
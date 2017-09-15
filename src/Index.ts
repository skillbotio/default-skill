import * as bst from "bespoken-tools";
import {IntentMap} from "./IntentMap";

const alexa = (event: any, context: any) => {
    if (event.request.type === "IntentRequest") {
        const intentName = event.request.intent.name;
        const reply = IntentMap.forIntent(intentName);
        return say(reply);
    }
};

const say = (message: string) => {
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
        version: "1.0",
    };
    this.context.succeed(response);
};

exports.handler = bst.Logless.capture("37272b44-0a1e-4cd4-b2c5-55bc526463a2", alexa);

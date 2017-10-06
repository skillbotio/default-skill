import * as bst from "bespoken-tools";
import {IntentMap} from "./IntentMap";

const alexa = (event: any, context: any) => {
    console.log("Type: " + event.request.type);
    console.log("Data: " + JSON.stringify(event, null, 2));
    const intentName = event.request.intent ? event.request.intent.name : undefined;

    // Get the address if we do not have it yet
    if (event.skillbot && event.skillbot.onboarding) {
        console.log("Attributes: " + JSON.stringify(event.session.attributes, null, 2));

        if (event.session.attributes.state === "ONBOARDING_COUNTRY_CODE") {
            if (intentName === "CountryCode") {
                return say("And what is your zip code (postal code)?",
                    context,
                    {
                        state: "ONBOARDING_POSTAL_CODE",
                        // By convention, we will save off an data on the user object
                        user: {
                            country: event.request.intent.slots.countryCodeSlot.value,
                        },
                    },
                );
            } else {
                return say("Sorry - I didn't understand. Please enter your country:",
                    context,
                    {
                        state: "ONBOARDING_COUNTRY_CODE",
                    },
                );
            }
        } else if (event.session.attributes.state === "ONBOARDING_POSTAL_CODE") {
            if (intentName === "PostalCode") {
                return say("Thank you - welcome to SkillBot! Take a look around!",
                    context,
                    {
                        state: "ONBOARDING_COMPLETED",
                        // By convention, we will save off an data on the user object
                        user: {
                            postalCode: event.request.intent.slots.postalCodeSlot.value,
                        },
                    },
                );
            } else {
                return say("Sorry - I didn't understand. Please enter your postal code:",
                    context,
                    {
                        state: "ONBOARDING_POSTAL_CODE",
                    },
                );
            }
        } else {
            return say("Welcome to Skillbot. Just a couple questions before we get started!\n"
                + " First, can you tell me what country are you in?",
                context,
                { state: "ONBOARDING_COUNTRY_CODE" },
            );
        }

    }

    if (event.request.type === "IntentRequest") {
        // Special handling for the debug on and off intents
        if (intentName === "DebugOn") {
            return say("Debugging enabled. Just say \"Debug Off\" to turn it back off.",
                context,
                {
                    user: {
                        debugEnabled: true,
                    },
                },
            );
        } else if (intentName === "DebugOff") {
            return say("Debuging disabled.",
                context,
                {
                    user: {
                        debugEnabled: false,
                    },
                },
            );
        }
        const reply = IntentMap.forIntent(intentName);
        return say(reply, context);
    }
};

const say = (message: string, context: any, attributes?: any) => {
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
};

exports.handler = bst.Logless.capture("37272b44-0a1e-4cd4-b2c5-55bc526463a2", alexa);

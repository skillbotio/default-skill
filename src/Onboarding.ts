import {Helpers} from "./Helpers";

export class Onboarding {
    public handle(intentName: string, event: any, context: any) {
        console.log("Attributes: " + JSON.stringify(event.session.attributes, null, 2));

        if (event.session.attributes.state === "ONBOARDING_COUNTRY_CODE") {
            if (intentName === "CountryCode") {
                return Helpers.say("And what is your zip code (postal code)?",
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
                return Helpers.say("Sorry - I didn't understand. Please enter your country:",
                    context,
                    {
                        state: "ONBOARDING_COUNTRY_CODE",
                    },
                );
            }
        } else if (event.session.attributes.state === "ONBOARDING_POSTAL_CODE") {
            if (intentName === "PostalCode") {
                return Helpers.say("Thank you - welcome to SkillBot! Take a look around!",
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
                return Helpers.say("Sorry - I didn't understand. Please enter your postal code:",
                    context,
                    {
                        state: "ONBOARDING_POSTAL_CODE",
                    },
                );
            }
        } else {
            return Helpers.say("Welcome to Skillbot. Just a couple questions before we get started!\n"
                + " First, can you tell me what country are you in?",
                context,
                { state: "ONBOARDING_COUNTRY_CODE" },
            );
        }
    }
}
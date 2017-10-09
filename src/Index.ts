import * as bst from "bespoken-tools";
import {Helpers} from "./Helpers";
import {IntentMap} from "./IntentMap";
import {Onboarding} from "./Onboarding";
import {SlackBotAPI} from "./SlackBotAPI";

const alexa = async (event: any, context: any) => {
    console.log("Type: " + event.request.type);
    console.log("Data: " + JSON.stringify(event, null, 2));
    const intentName = event.request.intent ? event.request.intent.name : undefined;

    // Get the address if we do not have it yet
    if (event.skillbot && event.skillbot.onboarding) {
        return new Onboarding().handle(intentName, event, context);
    }

    if (event.request.type === "IntentRequest") {
        // Special handling for associate skill intent
        if (intentName === "AssociateSkill") {
            const skillSlot = event.request.intent.slots.skillID;
            if (!skillSlot.value) {
                return Helpers.say("No skill to associate specified. Please enter the skill ID.", context);
            }

            const skillID = skillSlot.value;
            return Helpers.say("Skill " + skillID + " associated. You can now debug with it.",
                context,
                {
                    user: {
                        skills: [skillID],
                    },
                },
            );
        } else if (intentName === "DebugOn") {
            // Special handling for the debug on intent
            return Helpers.say("Debugging enabled. Just say \"Debug Off\" to turn it back off.",
                context,
                {
                    user: {
                        debugEnabled: true,
                    },
                },
            );
        } else if (intentName === "DebugOff") {
            // Special handling for the debug off intent
            return Helpers.say("Debuging disabled.",
                context,
                {
                    user: {
                        debugEnabled: false,
                    },
                },
            );
        } else if (intentName === "Skills") {
            const skills = await new SlackBotAPI().skills();
            const skillNameList = [];
            for (const skillID of Object.keys(skills)) {
                const skill = skills[skillID];
                if (!skillID.startsWith("test") && skillID !== "skillbot default") {
                    skillNameList.push(skill.name);
                }
            }

            const skillsString = skillNameList.join(", ");
            // Special handling for the debug off intent
            return Helpers.say("Here are some of the skills I support: " + skillsString, context);
        } else if (intentName === "Version") {
            const version = await new SlackBotAPI().version();
            // Special handling for the debug off intent
            return Helpers.say("Version: " + version, context);
        }
        const reply = IntentMap.forIntent(intentName);
        return Helpers.say(reply, context);
    }
};

exports.handler = bst.Logless.capture("37272b44-0a1e-4cd4-b2c5-55bc526463a2", alexa);

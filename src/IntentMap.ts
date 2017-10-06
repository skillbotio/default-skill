export class IntentMap {
    public static forIntent(name: string): string {
        if (name in map) {
            const values = map[name];
            const index = Math.floor(Math.random() * values.length);
            return values[index];
        } else {
            return "Sorry, I can't help you with that";
        }
    }

}

const map: {[id: string]: string[]} = {
    "AMAZON.HelpIntent": ["Get a list of skills by saying skills, or open a skill by saying \"open SKILL_NAME\""],
    "Hello": ["Hi!", "Howdy!", "Hi there!"],
    "Skills": ["Here are some of the skills I support: Giftionary, Frizz Forecast"],
    "Who": ["I am SkillBot - I allow you to interact with Alexa skills from Slack, Twitter and other platforms"],
};

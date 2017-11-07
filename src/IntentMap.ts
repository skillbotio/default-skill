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
    "AMAZON.HelpIntent": [
        "Core Commands:\n" +
        "   open:\tLaunch a skill by saying \"open SKILL_NAME\"\n" +
        "\t\t\tSynonyms: ask, tell and launch\n" +
        "   skills:\tList skills that are available\n\n" +
        "Debug Commands:\n" +
        "   associate: Claim ownership a skill with \"associate SKILL_ID\"\n" +
        "   debug:     Enable debuging of skill - shows requests and responses\n" +
        "              Skill must be associated first\n" +
        "   debug off: Turn off debugging\n"],
    "Hello": ["Hi!", "Howdy!", "Hi there!"],
    "Who": ["I am SkillBot - I allow you to interact with Alexa skills from Slack"],
};

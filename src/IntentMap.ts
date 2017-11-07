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
        "\topen:\tLaunch a skill by saying \"open SKILL_NAME\"\n" +
        "\t\t\tSynonyms: ask, tell and launch\n" +
        "\tskills:\tList skills that are available\n\n" +
        "\tDebug Commands:\n" +
        "\tassociate:\tClaim ownership a skill with \"associate SKILL_ID\"\n" +
        "\tdebug:\t\tEnable debuging of skill - shows requests and responses\n" +
        "\t\t\tSkill must be associated first\n" +
        "\tdebug off: Turn off debugging\n"],
    "Hello": ["Hi!", "Howdy!", "Hi there!"],
    "Who": ["I am SkillBot - I allow you to interact with Alexa skills from Slack"],
};

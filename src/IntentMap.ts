export class IntentMap {
    public static forIntent(name: string): string {
        if (name in map) {
            return map[name][0];
        } else {
            return "Sorry, I can't help you with that";
        }
    }

}

const map: {[id: string]: string[]} = {
    "AMAZON.HelpIntent": [""],
    "Skills": ["Here are some of the skills I support: Giftionary, Frizz Forecast"],
};

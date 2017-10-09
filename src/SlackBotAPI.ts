import * as request from "request-promise-native";

export class SlackBotAPI {
    private skillbotURL = "https://skillbot.io";

    public version(): string {
        return (("package.json") as any).version;
    }

    public skills(): {[id: string]: any } {
        const url = this.skillbotURL + "/skills";
        const accessToken = process.env.SKILLBOT_API_TOKEN;

        const options = {
            headers: {
                "x-access-token": accessToken,
            },
            json: true,
            method: "GET",
            uri: url,
        };

        return request(options);
    }
}
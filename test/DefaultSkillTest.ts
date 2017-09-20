import {assert} from "chai";


describe("DefaultSkill Test", function() {
    this.timeout(10000);

    describe("Onboarding Tests", () => {
        it("Onboards succesfully", async () => {
            const bvd = require("virtual-alexa");
            const alexa = bvd.VirtualAlexa.Builder()
                .handler("lib/src/index.handler") // Lambda function file and name
                .interactionModelFile("./speechAssets/InteractionModel.json")
                .create();

            let response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("hi");

            assert.equal(response.sessionAttributes.state, "ONBOARDING_COUNTRY_CODE");

            response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("USA");

            assert.equal(response.sessionAttributes.user.country, "US");

            response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("19801");

            assert.equal(response.sessionAttributes.user.postalCode, "19801");

            response  = await alexa.filter((request: any) => {
                request.skillbot = undefined;
            }).utter("Hi");

            assert.isTrue(response.response.outputSpeech.ssml.indexOf("H") !== -1);

        });

        it("Onboards unsuccesfully", async () => {
            const bvd = require("virtual-alexa");
            const alexa = bvd.VirtualAlexa.Builder()
                .handler("lib/src/index.handler") // Lambda function file and name
                .interactionModelFile("./speechAssets/InteractionModel.json")
                .create();

            let response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("hi");

            assert.equal(response.sessionAttributes.state, "ONBOARDING_COUNTRY_CODE");

            response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("Zimbabwe");

            assert.isTrue(response.response.outputSpeech.ssml.indexOf("Sorry") !== -1);

            response  = await alexa.filter((request: any) => {
                request.skillbot = { onboarding: true };
            }).utter("US");

            assert.equal(response.sessionAttributes.user.country, "US");

        });
    });
});

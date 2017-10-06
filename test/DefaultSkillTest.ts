import {assert} from "chai";

describe("DefaultSkill Test", function() {
    this.timeout(10000);

    describe("Onboarding Tests", () => {
        it("Onboards successfully", async () => {
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

        it("Onboards unsuccessfully", async () => {
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

    describe("Debug Tests", () => {
        it("Debugs successfully", async () => {
            const bvd = require("virtual-alexa");
            const alexa = bvd.VirtualAlexa.Builder()
                .handler("lib/src/index.handler") // Lambda function file and name
                .interactionModelFile("./speechAssets/InteractionModel.json")
                .create();

            let response  = await alexa.filter().utter("debug");
            assert.equal(response.sessionAttributes.user.debugEnabled, true);

            response  = await alexa.filter().utter("debug off");
            assert.equal(response.sessionAttributes.user.debugEnabled, false);
        });
    });
});

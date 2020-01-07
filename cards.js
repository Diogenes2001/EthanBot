const { ActivityHandler, CardFactory } = require("botbuilder");
const ADAPTIVE_CARD_OPTIONS = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
    "body" : [
        {
            type: "TextBlock",
            size: "medium",
            color: "alert",
            spacing: "none"
        }
    ],
    "actions": []
};

function makeText(promptText, waitForResponse){

    
    let activity = ADAPTIVE_CARD_OPTIONS;
    activity.awaitUserResponse = waitForResponse,
    activity.body[0].text = promptText;
    return CardFactory.adaptiveCard(activity);
}

function makeButtons(promptText, options){
    let activity = ADAPTIVE_CARD_OPTIONS;
    activity.actions.length = 0;
    activity.awaitUserResponse = true,
    activity.body[0].text = promptText;
    for (let option of options) {
        activity.actions.push({
            type: "Action.Submit",
            title: option,
            button: option,
            data: option
        });
    }
    return CardFactory.adaptiveCard(activity);
}

module.exports.makeText = makeText;
module.exports.makeButtons = makeButtons;
const { ActivityHandler, CardFactory } = require("botbuilder");
const ADAPTIVE_CARD_OPTIONS = Object.freeze({
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
    "body" : [
    ],
    "actions": []
});

function addBlock(activity, text){
    let block = {
        text: text,
        type: "TextBlock",
        size: "default",
        spacing: "medium",
        wrap: true
    }
    activity.body.push(block);
    return activity;
}

function makeText(promptText, waitForResponse){

    
    let activity = ADAPTIVE_CARD_OPTIONS;
    activity.actions.length = 0;
    activity.body.length = 0;
    /*while('\n' in promptText){
        activity = addBlock(activity, promptText.substring(0, promptText.find('\n')))
        promptText = promptText.substring(promptText.find('\n'));
    }
    activity = addBlock(activity, promptText);
    */
   for(i = 0; i < promptText.length; ++i){
       activity = addBlock(activity, promptText[i]);
   }
    activity.awaitUserResponse = waitForResponse;
    return CardFactory.adaptiveCard(activity);
}

function makeButtons(promptText, options){
    let activity = ADAPTIVE_CARD_OPTIONS;
    activity.actions.length = 0;
    activity.body.length = 0;
    activity.awaitUserResponse = true;
    for(i = 0; i < promptText.length; ++i){
        activity = addBlock(activity, promptText[i]);
    }
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
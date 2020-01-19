// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { makeText, makeButtons } = require('../cards');
const chatJSON = require('../chat.json');
class DialogBot extends ActivityHandler {

    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     */
    constructor(conversationState, userState) {
        super();

        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.chat = chatJSON.body;
        let chat = this.chat;

        this.onMembersAdded(async (context, next) => {
            this.cardnum= 0;
            let cur = this.cardnum;
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const welcomeCard = makeButtons(chat[cur].text, chat[cur].buttons);
                    await context.sendActivity({ attachments: [welcomeCard] });
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            let str = context.activity.text.toLowerCase();
            let curCard = chat[this.cardnum];
            let card;
            if(str == 'back'){
                if(this.cardnum == 0){
                    card = makeText(["I can't go back any further!"], false);
                }else{
                    this.cardnum = curCard.last;
                    card = makeButtons(chat[this.cardnum].text, chat[this.cardnum].buttons);
                }
            }else if(str == 'main'){
                this.cardnum = 0;
                card = makeButtons(chat[this.cardnum].text, chat[this.cardnum].buttons);
            }else if(str in curCard.choices){
                this.cardnum = curCard.choices[str];
                card = makeButtons(chat[this.cardnum].text, chat[this.cardnum].buttons);
            }else{
                card = makeText(["Sorry, I didn't understand that."], false);
            }
            await context.sendActivity({ attachments: [card] });
            await next();
        });

    }

}

module.exports.DialogBot = DialogBot;

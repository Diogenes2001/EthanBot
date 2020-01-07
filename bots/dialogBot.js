// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { makeText, makeButtons } = require('../cards');
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

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const welcomeCard = makeText('aaaaaaaaaaaaaaaa', false);
                    await context.sendActivity({ attachments: [welcomeCard] });
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            const welcomeCard = makeButtons('pick something', ['apple', 'banana']);
            await context.sendActivity({ attachments: [welcomeCard] });
            await next();
        });

    }
}

module.exports.DialogBot = DialogBot;

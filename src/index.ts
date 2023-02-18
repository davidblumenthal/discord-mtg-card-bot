// See https://www.toptal.com/chatbot/how-to-make-a-discord-bot

import {loadTrie} from "./util/loadTrie";
import jsonBlob from "../nameAndImage.json";
import {canonicalizeInputToArray} from "./util/canonicalize";
import {CardType} from "./types";

const trie = loadTrie(jsonBlob);

import eris from 'eris';

const token = process.env.BOT_TOKEN;
if (!token) {
    console.error('BOT_TOKEN environment variable must be specified!');
    process.exit(1);
}

// Create a Client instance with our bot token.
const bot = new eris.Client(token);

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
    console.log('Connected and ready.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
    if (msg.author.bot) {
        return;
    }
    console.log(`msg=${JSON.stringify(msg, undefined, 4)}`);
    const messageText = msg.content;
    const mentionedCards = trie.getAllDataInPath(canonicalizeInputToArray(messageText)) as CardType[];
    console.log(`input from ${msg.author.username} = "${messageText}"`);
    if (mentionedCards.length) {
        try {
            for (const card of mentionedCards) {
                if (card.image) {
                    console.log(`matched ${card.name} as ${card.image}`);
                    await bot.createMessage(msg.channel.id, card.image);
                }
            }
        } catch (err) {
            // There are various reasons why sending a message may fail.
            // The API might time out or choke and return a 5xx status,
            // or the bot may not have permission to send the
            // message (403 status).
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }
});

bot.on('error', (err: unknown) => {
    console.warn(err);
});

bot.connect();

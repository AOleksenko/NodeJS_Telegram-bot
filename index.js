const TelegramBot = require('node-telegram-bot-api');
const _ = require ('lodash'); //функция для рандома
const request= require('request');
const TOKEN = '522735094:AAEWCVUByfkzYVgR7VAqbUewJaWqLJLwRcg'
const fs = require('fs'); //для подключения картинки
const bot = new TelegramBot(TOKEN, {
    polling: true
});
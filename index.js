const TelegramBot = require('node-telegram-bot-api');
const _ = require ('lodash'); //функция для рандома
const request= require('request');
const TOKEN = 'your token'
const fs = require('fs'); //для подключения картинки
const bot = new TelegramBot(TOKEN, {
    polling: true
});
const KB = {
	currency: 'Пройти тест',
	picture: 'Картинка',
	car: 'Авто',
	cat: 'Коты',
	back: 'Назад'
}	
const PicScrs = {
	[KB.car]: [
		'car1.jpg',
		'car2.png',
		'car3.jpg',
		'car4.jpg',
		'car5.jpg'
	],
	[KB.cat]: [
	'cat1.jpg',
	'cat2.jpg',
	'cat4.jpg',
	'cat5.jpg',
	'cat6.jpg'
	]
}

bot.onText(/\/start/, msg => {
 sendGreeting(msg)
});

bot.onText(/\/a/, msg => {
 sendGreeting(msg,false);
});

//прослушка на простое сообщение
bot.on('message', msg => {
 //свич позволяет нам понять к какой кнопке обращаются
 	switch (msg.text){ //в данном поле из-за текст хранится,тот текст который отправил пользователь
 		case KB.picture:
 			sendPictureScreen(msg.chat.id); //при нажатии на картинки, будет раюотать эта функция
 			break
 		case KB.currency:
 			newQuestion(msg);
 			break
 		case KB.back:
 			sendGreeting(msg,false);
 			break
 		case KB.car:
 		case KB.cat:
 		sendPictureByName (msg.chat.id, msg.text) //мсдж текст позволяет нам показать,на какую именно кнопку мы указываем
 			break
 	}
 });

bot.on('message', (msg) => {
var Hi = "привет";
if (msg.text.toString().toLowerCase().includes(Hi)) {
bot.sendMessage(msg.chat.id,"Добрый день");
}  
});

bot.on('message', (msg) => {
var bye = "пока";
if (msg.text.toString().toLowerCase().includes(bye)) {
bot.sendMessage(msg.chat.id, "Хорошего дня " + msg.from.first_name); 
}
});

bot.on('message', (msg) => {
var what = "дурак";
if (msg.text.includes(what)) {
bot.kickChatMember(msg.chat.id,  msg.from.id);
}
});

function sendPictureScreen (chatId){
	bot.sendMessage (chatId, `Выберите тип картинки:`,{
		reply_markup:{
			keyboard: [
				[KB.car,KB.cat],
				[KB.back]
			]
		}
	})
}

 function sendPictureByName(chatId,picName){
 	const srcs= PicScrs[picName] //пикнейм эта как раз,название или котика или машины
 	const src= srcs[_.random(0,srcs.length - 1)] 
 	bot.sendMessage(chatId, `Загружаю...`)
	 fs.readFile(`${__dirname}/picture/${src}`, (error,picture)=>{
 		if (error) throw new Error(error)
 		bot.sendPhoto(chatId,picture). then(()=>{
 			bot.sendMessage(chatId,`Отправлено!`)
 		})
 	})
 }

 function sendGreeting(msg, sayHello=true){
 	const text = sayHello
 	? `Приветствую, ${msg.from.first_name} \nЧто вы хотите сделать?`
	:`Что вы хотите сделать?`
	bot.sendMessage(msg.chat.id,text, {
		reply_markup:{
			 keyboard:[
				[KB.currency,KB.picture]
			]
		}
	})
 }

var questions = [
  {
    title:'1)Винни-Пух- это?',
    buttons: [
        [{ text: 'а) Поросенок.', callback_data: '0_1' }],
        [{ text: 'б) Свинья.', callback_data: '0_2' }],
        [{ text: 'в) Кабан.', callback_data: '0_3' }],
        [{ text: 'г) нет правильного ответа', callback_data: '0_4' }]
      ],
    right_answer: 4
  },
  {
    title:'2) На столе лежали три редиски и четыре яблока. Ребенок взял со стола одно яблоко. Сколько фруктов осталось на столе? ',
    buttons: [
        [{ text: 'а) 0', callback_data: '1_1' },
        { text: 'б) 1', callback_data: '1_2' },
        { text: 'в) 2', callback_data: '1_3' },
        { text: 'г) 3', callback_data: '1_4' }],
        [{ text: 'д) 4', callback_data: '1_5' },
        { text: 'е) 5', callback_data: '1_6' },
        { text: 'ж) 6', callback_data: '1_7' },
        { text: 'з) 7', callback_data: '1_8' }]

      ],
    right_answer: 4
  },
  {
    title:'3) Сколько раз встречается цифра 4 в целых числах от 1 до 50?',
    buttons: [
        [{ text: 'а) 1', callback_data: '2_1' },
        { text: 'б) 4',  callback_data: '2_2' },
        { text: 'в) 5',  callback_data: '2_3' },
        { text: 'г) 10', callback_data: '2_4' }],
        [{ text: 'д) 14', callback_data: '2_5' },
        { text: 'е) 15', callback_data: '2_6' },
        { text: 'ж) 50', callback_data: '2_7' }],
        [{ text: 'з) нет правильного ответа', callback_data: '2_8' }]
      ],
    right_answer: 5
  },
  {
    title:'4) На автомобиле, использующем зимой шипованную резину, сзади обязательна должна быть соответствующая наклейка. Зачем?',
    buttons: [
        [{ text: 'а) чтобы не пытались соревноваться', callback_data: '3_1' }],
        [{ text: 'б) пропускали',  callback_data: '3_2' }],
        [{ text: 'в) выбирали правильную дистанцию',  callback_data: '3_3' }],
        [{ text: 'г) уважали', callback_data: '3_4' }],
        [{ text: 'д) ни одно из вышеперечисленного', callback_data: '3_5' }],
      ],
    right_answer: 3
  },
  {
  	title:'Поздравляю вы прошли тест, нажмите /a, чтобы продолжить работу!',
  }
];

let currentQuestionIndex=0;
function getCurrentQuestionIndex(){
	let currentQuestion = questions[currentQuestionIndex];
	++currentQuestionIndex;
	return currentQuestion;
}

function newQuestion(msg){
  var arr = getCurrentQuestionIndex();
  var text = arr.title;
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: arr.buttons,
      parse_mode: 'Markdown'
    })
  };
  chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
  bot.sendMessage(chat, text, options);
}

bot.on('callback_query', function (msg) {
  var answer = msg.data.split('_');
  var index = answer[0];
  var button = answer[1];

  if (questions[index].right_answer==button) {
    bot.answerCallbackQuery(msg.id, 'Ответ верный ✅');
  } else {
    bot.answerCallbackQuery(msg.id, 'Ответ неверный ❌');
  }
  newQuestion(msg);
});


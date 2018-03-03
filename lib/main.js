const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true})
const request = require('request')
var reminders = ''
var chatIds = []
exports.chatIds = chatIds;
var users = []
exports.users = users;
var help_msg = ["/list muestra el listado de la compra actual",
            "/clear borra la lista de la compra",
            "/remind lo_que_sea añade a la lista de la compra un item",
            "/users muestra los usuarios viendo esta lista",
            "/exit sale de la lista"]

listen_messages()


function insertchatId(chatId) {
 if (chatIds.indexOf(chatId) == '-1') {
   chatIds.push(chatId)
   console.log("Chat id: ",chatId)
 }
}
exports.insertchatId = insertchatId

function insertchatUser(user) {
 if (users.indexOf(user) == '-1') {
   users.push(user)
   console.log("User add: ",user)
 }
}
exports.insertchatUser = insertchatUser

function removechatId(chatId) {
 if (chatIds.indexOf(chatId) != '-1') {
   chatIds.splice(chatIds.indexOf(chatId), 1)
   console.log("Chat id removed: ",chatId)
 }
}
exports.removechatId = removechatId

function removechatUser(user) {
 if (users.indexOf(user) != '-1') {
   users.splice(users.indexOf(user), 1)
   console.log("User removed: ",user)
 }
}
exports.removechatUser = removechatUser

function sendMessageToChats(chatIds, text) {
  for (i=0; i < chatIds.length; i++) {
    bot.sendMessage(chatIds[i], text)
  }
}

function show_help() {
  return help_msg.join("\n")
}

function listen_messages() {
  bot.onText(/\/clear/, (msg, match) => {
    insertchatId(msg.chat.id)
    reminders = ''
  })

  bot.onText(/\/start/, (msg, match) => {
    insertchatId(msg.chat.id)
    insertchatUser(msg.from.first_name)

    bot.sendMessage(msg.chat.id, show_help())
  })

  bot.onText(/\/list/, (msg, match) => {
    insertchatId(msg.chat.id)
    insertchatUser(msg.from.first_name)

    if (reminders === '') {
       bot.sendMessage(msg.chat.id, 'Lista vacía')
    } else {
      bot.sendMessage(msg.chat.id, reminders)
    }
  })

  bot.onText(/\/remind (.+)/, (msg, match) => {
    insertchatId(msg.chat.id)
    insertchatUser(msg.from.first_name)

    const resp = match[1]
    reminders = reminders+"\n"+resp

    sendMessageToChats(chatIds, reminders)
  })

  bot.onText(/\/users/, (msg, match) => {
    insertchatId(msg.chat.id)
    insertchatUser(msg.from.first_name)

    bot.sendMessage(msg.chat.id, "Usuarios activos: "+users.join(','))
  })

  bot.onText(/\/exit/, (msg, match) => {
    removechatId(msg.chat.id)
    removechatUser(msg.from.first_name)

    sendMessageToChats(chatIds, "Ha salido de la lista "+msg.from.first_name)
  })
}

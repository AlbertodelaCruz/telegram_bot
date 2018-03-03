var main = require('./shopping-list-tlgm.js')
var chatIds = main.chatIds
var users = main.users


describe('Inserting a chatid', () => {
  test('updates chatIds', () => {
      main.insertchatId('1')
      expect(chatIds).toEqual(['1'])
  })
})

describe('Inserting a user', () => {
  test('updates users', () => {
      main.insertchatUser('acruz')
      expect(users).toEqual(['acruz'])
  })
})

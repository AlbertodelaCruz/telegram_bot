var main = require('../lib/main.js')
var chatIds = main.chatIds
var users = main.users

describe('ChatIds', () => {
  describe('inserting a chatid', () => {
    test('updates chatIds', () => {
        main.insertchatId('1')
        expect(chatIds).toEqual(['1'])
    })
  })

  describe('removing a chatid', () => {
    test('updates chatIds', () => {
        main.removechatId('1')
        expect(chatIds).toEqual([])
    })
  })
})

describe('Users', () => {
  describe('inserting a user', () => {
    test('updates users', () => {
        main.insertchatUser('acruz')
        expect(users).toEqual(['acruz'])
    })
  })

  describe('removing a user', () => {
    test('updates users', () => {
        main.removechatUser('acruz')
        expect(users).toEqual([])
    })
  })
})

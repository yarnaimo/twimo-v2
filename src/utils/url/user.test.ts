import { UserPageURL } from './user'

describe('UserPageURL', () => {
  const expected = {
    username: 'Twitter',
    normalized: 'https://twitter.com/Twitter',
  }

  describe('parse', () => {
    test.each([
      'https://twitter.com/Twitter',
      'https://twitter.com/Twitter?foo=bar',
      'https://mobile.twitter.com/Twitter',
      'https://mobile.twitter.com/Twitter?foo=bar',
    ])('%p', (url) => {
      const parsed = UserPageURL.parse(url)
      expect(parsed).toEqual(expected)
    })

    expect(UserPageURL.parse('https://example.com/Twitter')).toBe(null)
  })

  describe('fromUser', () => {
    test.each([
      {
        username: 'Twitter',
      },
    ])('%p', (user) => {
      const result = UserPageURL.fromUser(user)
      expect(result).toEqual(expected)
    })
  })
})

import { UserPageUrl } from './user'

describe('UserPageUrl', () => {
  const expected: UserPageUrl = {
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
      const parsed = UserPageUrl.parse(url)
      expect(parsed).toEqual(expected)
    })

    expect(UserPageUrl.parse('https://example.com/Twitter')).toBe(null)
  })

  describe('fromUser', () => {
    test.each([
      {
        username: 'Twitter',
      },
    ])('%p', (user) => {
      const result = UserPageUrl.fromUser(user)
      expect(result).toEqual(expected)
    })
  })
})

import { Expansions, Tweet } from '../..'
import { TweetUrl } from './tweet'

describe('TweetUrl', () => {
  const expected: TweetUrl = {
    tweetId: '12345678',
    username: 'Twitter',
    normalized: 'https://twitter.com/Twitter/status/12345678',
  }

  describe('parse', () => {
    test.each([
      'https://twitter.com/Twitter/status/12345678',
      'https://twitter.com/Twitter/status/12345678?foo=bar',
      'https://mobile.twitter.com/Twitter/status/12345678',
      'https://mobile.twitter.com/Twitter/status/12345678?foo=bar',
    ])('%p', (url) => {
      const result = TweetUrl.parse(url)
      expect(result).toEqual(expected)
    })

    expect(TweetUrl.parse('https://twitter.com/Twitter')).toBe(null)
    expect(TweetUrl.parse('https://example.com/Twitter/status/12345678')).toBe(
      null,
    )
  })

  describe('fromTweet', () => {
    const userId = 'user1234'
    test.each([
      [
        {
          id: '12345678',
          author_id: userId,
        },
        {
          users: [{ id: userId, username: 'Twitter' }],
        },
      ],
      // {
      //   retweeted_status: {
      //     id_str: '12345678',
      //     user: { screen_name: 'Twitter' },
      //   },
      // },
    ])('%p', (tweet, expansions) => {
      const result = TweetUrl.fromTweet(
        tweet as Tweet,
        expansions as Expansions,
      )
      expect(result).toEqual(expected)
    })
  })
})

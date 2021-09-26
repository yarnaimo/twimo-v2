import { Expansions, Tweet } from '../../../openapi/index.js'
import { matchGroups } from '../_regexp.js'

const tweetUrlPattern =
  /^https:\/\/(?:mobile\.)?twitter.com\/(?<username>\w+)\/status\/(?<tweetId>\d+)/

export class TweetUrl {
  static parse(url: string): TweetUrl | null {
    const groups = matchGroups<{ username: string; tweetId: string }>(
      tweetUrlPattern,
      url,
    )
    return groups && new TweetUrl(groups.username, groups.tweetId)
  }

  static fromTweet(tweet: Tweet, expansions: Expansions | undefined): TweetUrl {
    const user = expansions?.users?.find((user) => user.id === tweet.author_id)
    if (!user) {
      throw Error('user not included in expansions')
    }
    return new TweetUrl(user.username, tweet.id)
  }

  readonly normalized: string

  constructor(readonly username: string, readonly tweetId: string) {
    this.normalized = `https://twitter.com/${username}/status/${tweetId}`
  }
}

import { Expansions, Tweet } from '../../../openapi'
import { matchGroups } from '../_regexp'

const tweetUrlPattern = /^https:\/\/(?:mobile\.)?twitter.com\/(?<username>\w+)\/status\/(?<tweetId>\d+)/

export interface TweetURL {
  tweetId: string
  username: string
  normalized: string
}

const buildTweetUrl = ({
  username,
  tweetId,
}: {
  username: string
  tweetId: string
}): TweetURL => ({
  username,
  tweetId,
  normalized: `https://twitter.com/${username}/status/${tweetId}`,
})

export const TweetURL = {
  parse: (url: string): TweetURL | null => {
    const groups = matchGroups<{ username: string; tweetId: string }>(
      tweetUrlPattern,
      url,
    )
    return groups && buildTweetUrl(groups)
  },

  fromTweet: (tweet: Tweet, expansions: Expansions | undefined): TweetURL => {
    const user = expansions?.users?.find((user) => user.id === tweet.author_id)
    if (!user) {
      throw Error('user not included in expansions')
    }
    return buildTweetUrl({ username: user.username, tweetId: tweet.id })
  },
}

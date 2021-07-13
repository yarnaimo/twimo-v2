import { User } from '../../../openapi'
import { matchGroups } from '../_regexp'

const userPageUrlPattern = /^https:\/\/(?:mobile\.)?twitter.com\/(?<username>\w+)/

export class UserPageUrl {
  static parse(url: string): UserPageUrl | null {
    const groups = matchGroups<{ username: string }>(userPageUrlPattern, url)
    return groups && new UserPageUrl(groups.username)
  }

  static fromUser({ username }: Pick<User, 'username'>): UserPageUrl {
    return new UserPageUrl(username)
  }

  readonly normalized: string

  constructor(readonly username: string) {
    this.normalized = `https://twitter.com/${username}`
  }
}

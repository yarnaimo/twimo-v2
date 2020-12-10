import { User } from '../../../openapi'
import { matchGroups } from '../_regexp'

const userPageUrlPattern = /^https:\/\/(?:mobile\.)?twitter.com\/(?<username>\w+)/

export interface UserPageURL {
  username: string
  normalized: string
}

const buildUserPageUrl = ({ username }: { username: string }): UserPageURL => ({
  username,
  normalized: `https://twitter.com/${username}`,
})

export const UserPageURL = {
  parse: (url: string): UserPageURL | null => {
    const groups = matchGroups<{ username: string }>(userPageUrlPattern, url)
    return groups && buildUserPageUrl(groups)
  },

  fromUser: ({ username }: Pick<User, 'username'>): UserPageURL => {
    return buildUserPageUrl({ username })
  },
}

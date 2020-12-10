export const matchGroups = <T extends object>(pattern: RegExp, str: string) => {
  const matched = str.match(pattern)
  return matched?.groups ? (matched.groups as T) : null
}

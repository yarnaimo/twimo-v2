const gcd = (a: number, b: number): number => {
  return b ? gcd(b, a % b) : a
}

export const calcAspectRatio = ({
  width,
  height,
}: {
  width: number
  height: number
}) => {
  const divisor = gcd(width, height)

  return [width / divisor, height / divisor] as const
}

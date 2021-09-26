#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs'
import globby from 'globby'
import { dirname, join } from 'path'

const [, , targetDir] = process.argv

if (!targetDir) {
  throw new Error('Specify target directory')
}

const files = await globby(`${targetDir}/**/*.{ts,tsx}`)

files.forEach((filepath) => {
  console.log(filepath)
  const content = readFileSync(filepath, 'utf8')

  const replaced = content.replace(
    /((?:^|\s|;)(?:import|export)\s[^'"]*['"])(\.{1,2}(?:\/[^'"]+)?)(['"](?:$|\s|;))/gm,

    (_, m1, importPath, m3) => {
      const resolvedPath = join(dirname(filepath), importPath)

      if (
        existsSync(`${resolvedPath}.ts`) ||
        existsSync(`${resolvedPath}.tsx`)
      ) {
        return `${m1}${importPath}.js${m3}`
      }

      if (
        existsSync(join(resolvedPath, 'index.ts')) ||
        existsSync(join(resolvedPath, 'index.tsx'))
      ) {
        return `${m1}${importPath}/index.js${m3}`
      }

      return `${m1}${importPath}${m3}`
    },
  )

  writeFileSync(filepath, replaced)
})

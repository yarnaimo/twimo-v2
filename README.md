# twimo-v2

Twitter API v2 client for TypeScript auto-generated from official OpenAPI specification

https://api.twitter.com/2/openapi.json

## Install

```sh
yarn add twimo-v2
# or
npm i -S twimo-v2
```

## Usage

```ts
import { Configuration, TweetsApi, SearchApi } from 'twimo-v2'

const accessToken = 'xxxxxxxx' // bearer token

const config = new Configuration({ accessToken })
const tweetsApi = new TweetsApi(config)
const searchApi = new SearchApi(config)

tweetsApi
  .findTweetsById({
    ids: ['1326191408546414592'],
    expansions: ['author_id', 'attachments.media_keys'],
    tweetFields: ['created_at', 'referenced_tweets', 'attachments'],
    mediaFields: ['url', 'width', 'height'],
  })
  .then(({ data }) => console.log(JSON.stringify(data, undefined, 2)))
  .catch(console.error)
```

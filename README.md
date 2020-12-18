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

### Configure (Bearer Token)

```ts
import { configureApi, TweetsApi, SearchApi, UsersApi } from 'twimo-v2'

const bearerToken = 'xxxxxxxx'
const tweetsApi = configureApi(TweetsApi, bearerToken)
```

### Configure (User Context)

```ts
import {
  configureUserContextApi,
  TweetsApi,
  SearchApi,
  UsersApi,
} from 'twimo-v2'

const apiKeys = { apiKey: 'xxxxxxxx', apiSecret: 'xxxxxxxx' }
const accessTokens = { token: 'xxxxxxxx', tokenSecret: 'xxxxxxxx' }

const tweetsApi = configureUserContextApi(TweetsApi, apiKeys, accessTokens)
```

### API

```ts
tweetsApi.findTweetsById({
  ids: ['1326191408546414592'],
  expansions: ['author_id', 'attachments.media_keys'],
  tweetFields: ['created_at', 'referenced_tweets', 'attachments'],
  mediaFields: ['url', 'width', 'height'],
})
```

**Response Example**

```json
{
  "data": [
    {
      "attachments": {
        "media_keys": ["3_1326191367203160064"]
      },
      "created_at": "2020-11-10T15:54:05.000Z",
      "author_id": "1013969666186678272",
      "id": "1326191408546414592",
      "text": "https://t.co/uMLs9riKeg"
    }
  ],
  "includes": {
    "media": [
      {
        "type": "photo",
        "media_key": "3_1326191367203160064",
        "height": 128,
        "width": 477,
        "url": "https://pbs.twimg.com/media/EmeUBaJVgAA9mFu.png"
      }
    ],
    "users": [
      {
        "id": "1013969666186678272",
        "name": "やまいも",
        "username": "yarnaimo"
      }
    ]
  }
}
```

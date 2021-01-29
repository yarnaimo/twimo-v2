#!/bin/sh

yarn openapi-generator-cli generate \
 --skip-validate-spec \
 -g typescript-axios \
 -i https://api.twitter.com/2/openapi.json \
 -o openapi \
 --additional-properties=useSingleRequestParameter=true

sed -i "s/Set</Array</g" openapi/api.ts

yarn prettier --write 'openapi/**/*.ts'

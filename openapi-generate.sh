#!/bin/sh

yarn openapi-generator-cli generate \
 -g typescript-axios \
 -i https://api.twitter.com/2/openapi.json \
 -o openapi \
 --additional-properties=useSingleRequestParameter=true

sed -i "1s#^#type AnyType = unknown\n#" openapi/api.ts
sed -i "s#Set<#Array<#" openapi/api.ts

for f in `find openapi -iname '*.ts'`
do
  sed -i '1s#^#// @ts-nocheck\n#' $f
done

yarn prettier --write 'openapi/**/*.ts'

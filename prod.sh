#!/bin/bash
rm -rf dist

mkdir -p dist/assets/js
mkdir -p dist/assets/css

bundle exec jekyll build \
  --config 'src/_config.yml,src/_config-common.yml,src/_config-production.yml' \
  --source src/ \
  --destination dist/

echo 'building css'
./node_modules/.bin/node-sass src/assets/css/main.scss --output dist/assets/css/

echo 'building js'
./node_modules/.bin/babel src/ --out-file dist/assets/js/app.js

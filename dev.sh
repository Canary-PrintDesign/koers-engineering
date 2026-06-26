#!/bin/bash
set -euo pipefail

npm run -s build:dirs
npm run -s build:css
npm run -s build:js

cleanup() {
  jobs -p | xargs -r kill 2>/dev/null || true
}

trap cleanup EXIT INT TERM

npm run -s build:jekyll:dev &
npm run -s watch:js &
npm run -s watch:css &
npm run -s serve

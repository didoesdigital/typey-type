#!/usr/bin/env bash
set -euo pipefail

read -r -n 1 -p "Have you built lessons and dictionaries, sync'd everything, run tests, and checked Storybook? (y/n) " REPLY
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo " Great! Let's deploy to staging."
  else
    exit 1
fi

VERSION=$(git describe --abbrev=0 --tags)
# Build the production app but with staging env vars!
VITE_REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build:staging

rsync --archive --verbose --exclude=".DS_Store" ~/projects/typey-type/build/ stg.lan:www/typey-type/

SPOKEN_VERSION=$(echo "$VERSION" | tr -d 'v')

echo
echo "http://stg.lan/typey-type/"

say "Deployed version $SPOKEN_VERSION to staging at staging dot læn"

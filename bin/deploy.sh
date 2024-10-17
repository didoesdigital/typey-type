#!/usr/bin/env bash
set -euo pipefail

read -r -n 1 -p "Reviewed deploy checklist? (y/n) " REPLY
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    exit 1
fi

if [[ $(git rev-parse --abbrev-ref HEAD) != master ]];
  then
    echo "Not on master!"
    exit 1
  else
    echo "You're on master"
fi

git tag -n
tig status

read -r -n 1 -p "Have you git tagged this commit? (y/n) " REPLY
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great! Let's deploy to production."
  else
    exit 1
fi

VERSION=$(git describe --abbrev=0 --tags)
yarn run sentry-cli releases new "$VERSION"

# Build the production app!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build

# Sync static build files to server
# rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 4242" ~/projects/typey-type/build/ di@didoesdigital:www/typey-type/
rsync -avz --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/typey-type/

yarn run sentry-cli releases files "$VERSION" upload-sourcemaps --url-prefix '~/typey-type/static/js' ~/projects/typey-type/build/static/js
yarn run sentry-cli releases finalize "$VERSION"
yarn run sentry-cli releases deploys "$VERSION" new -e production

SPOKEN_VERSION=$(echo "$VERSION" | tr -d 'v')

echo
echo "https://didoesdigital.com/typey-type/"

say "Deployed version $SPOKEN_VERSION to production at DaɪDoesDigital.com"

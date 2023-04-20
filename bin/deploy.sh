#!/bin/zsh

set -e

read -q "?Reviewed deploy checklist? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    exit 1
fi

# branch-name is a git alias to `!git rev-parse --abbrev-ref HEAD`
if [[ `git branch-name` != master ]];
  then
    echo "Not on master!"
    exit 1
  else
    echo "You're on master"
fi

git tag -n
tig status

read -q "?Have you git tagged this commit? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great! Let's deploy to production."
  else
    exit 1
fi

VERSION=`git describe --abbrev=0 --tags`
yarn run sentry-cli releases new "$VERSION"

# Build the production app!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build

# Sync static build files to server
# rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 4242" ~/projects/typey-type/build/ di@didoesdigital:www/typey-type/
rsync -avz --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/typey-type/

yarn run sentry-cli releases files "$VERSION" upload-sourcemaps --url-prefix '~/typey-type/static/js' ~/projects/typey-type/build/static/js
yarn run sentry-cli releases finalize "$VERSION"
yarn run sentry-cli releases deploys "$VERSION" new -e production

say "Deployed $VERSION to production at DaɪDoesDigital.com"

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

# Build the production app!
TYPEY_TYPE_RELEASE="${VERSION}" yarn run build:production

# Sync static build files to server
rsync --itemize-changes -avz --exclude=".DS_Store" ~/projects/typey-type/build/ di@159.203.100.121:www/typey-type/

SPOKEN_VERSION=$(echo "$VERSION" | tr -d 'v')

echo
echo "https://didoesdigital.com/typey-type/"

say "Deployed version $SPOKEN_VERSION to production at DaɪDoesDigital.com"

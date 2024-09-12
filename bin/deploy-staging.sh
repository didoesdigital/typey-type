#!/bin/zsh

set -e

read -q "?Have you built lessons and dictionaries, sync'd everything, run tests, and checked Storybook? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great! Let's deploy to staging."
  else
    exit 1
fi

VERSION=`git describe --abbrev=0 --tags`
# Build the production app!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build

rsync --archive --verbose --exclude=".DS_Store" ~/projects/typey-type/build/ stg.lan:www/typey-type/

# git tag -n

say "Deployed $VERSION to staging on port 8080."

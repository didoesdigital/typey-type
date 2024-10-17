#!/usr/bin/env bash
set -euo pipefail

read -r -n 1 -p "Reviewed deploy checklist? (y/n) " REPLY
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    exit 1
fi

git tag -n
tig status

read -r -n 1 -p "Have you git tagged this commit? (y/n) " REPLY
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great! Let's deploy to QA."
  else
    exit 1
fi

VERSION=$(git describe --abbrev=0 --tags)
# Build the production app but with QA flag!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" REACT_APP_QA=true yarn run build

# rsync build to prod server QA directory:
rsync --archive --verbose --compress --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/qa-typey-type/typey-type/

SPOKEN_VERSION=$(echo "$VERSION" | tr -d 'v')

say "Deployed version $SPOKEN_VERSION to QA"

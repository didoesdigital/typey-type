#!/bin/zsh

set -e

read -q "?Reviewed deploy checklist? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    exit 1
fi

git tag -n
tig status

read -q "?Have you git tagged this commit? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great! Let's deploy to QA."
  else
    exit 1
fi

VERSION=`git describe --abbrev=0 --tags`
# Build the production app but with QA flag!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" REACT_APP_QA=true yarn run build

# rsync --archive --verbose --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/qa-typey-type/typey-type/
# rsync -avz --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/typey-type/
rsync --archive --verbose --compress --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/qa-typey-type/typey-type/

say "Deployed $VERSION to QA"

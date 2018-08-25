#!/bin/zsh

set -e

yarn run test

read -q "?Reviewed deploy checklist? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    echo "... Goodbye!"
    exit
fi

if [[ `git branch-name` != master ]];
  then
    echo "Not on master!"
    exit 1
  else
    echo "You're on master"
fi

ruby ~/projects/plover-tools/typey-type-lesson-generator/run-build-dict-for-typey-type-for-standard-dict-set.rb



git tag -n
# cd ~/projects/thebakery/diidau-src/typey-type/
# make
# cd -
# cd ~/projects/thebakery/di.id.au/
tig status
VERSION=`git describe --abbrev=0 --tags`
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build



# yarn run build
# git tag -n
# rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 4242" ~/projects/typey-type/build/ di@didoesdigital:www/typey-type/
# rsync -avz --delete --exclude=".DS_Store" ~/projects/typey-type/build/ di@didoesdigital:www/typey-type/
rsync -avz --delete --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/typey-type/



yarn run sentry-cli releases deploys "$VERSION" new -e production



say "Deployed $VERSION to production at DaɪDoesDigital.com"

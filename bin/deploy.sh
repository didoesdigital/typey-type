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

yarn run build
git tag -n
cd ~/projects/thebakery/diidau-src/typey-type/
make
cd -
cd ~/projects/thebakery/di.id.au/
tig status

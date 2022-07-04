#!/bin/zsh

set -e

a_flag=''

while getopts 'a' flag; do
  case "${flag}" in
    a) a_flag='true' ;;
    *) exit 1 ;;
  esac
done

read -q "?Reviewed deploy checklist? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Continuing... "
  else
    echo "... Goodbye!"
    exit
fi

if [ "$a_flag" = true ] ;
  then
    echo "Skip building steno lessons and dictionaries, and running tests."
  else

    read -q "?Have you built steno drills, fundamentals, and dictionary? (y/n) "
    if [[ $REPLY =~ ^[Yy]$ ]];
      then
        echo "Great!"
        ruby ~/projects/plover-tools/typey-type-static-lesson-generator/run-build-dict-for-typey-type-for-standard-dict-set.rb
      else
        echo "... No build for you!"
        exit 1
    fi
fi

git tag -n
tig status

VERSION=`git describe --abbrev=0 --tags`
# Build the production app but with QA flag!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" REACT_APP_QA=true yarn run build



# rsync --archive --verbose --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/qa-typey-type/typey-type/
# rsync -avz --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/typey-type/
rsync --archive --verbose --compress --exclude=".DS_Store" ~/projects/typey-type/build/ di@167.99.9.71:www/qa-typey-type/typey-type/



say "Deployed $VERSION to QA"

#!/bin/zsh

set -e

a_flag=''

while getopts 'a' flag; do
  case "${flag}" in
    a) a_flag='true' ;;
    *) exit 1 ;;
  esac
done


yarn run test


if [ "$a_flag" = true ] ;
  then
    echo "Skip building steno lessons, and dictionaries."
  else
    echo "cd ~/projects/plover-tools/typey-type-static-lesson-generator && bat --paging never README.md"
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

# if [[ `git branch-name` != master ]];
#   then
#     echo "Not on master!"
#     exit 1
#   else
#     echo "You're on master"
# fi


VERSION=`git describe --abbrev=0 --tags`
# Build the production app!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build


if [ "$a_flag" = true ] ;
  then
    echo "Rsync without lessons or dictionaries:"
    rsync --archive --verbose --delete --exclude=".DS_Store" --exclude=/lessons --exclude=/dictionaries -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/typey-type/
  else
    echo "Full rsync:"
    rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/typey-type/
fi

# git tag -n



say "Deployed $VERSION to staging on port 8080."

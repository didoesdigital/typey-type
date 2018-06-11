#!/bin/zsh

set -e

yarn run test

read -q "?Build steno drills? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    cd /Users/di/projects/plover-tools/typey-type-lesson-generator
    ruby ./generate-all-drills-files.rb drills wordlist && ruby ./generate-all-drills-files.rb drills dictionary && ruby ./generate-all-drills-files.rb drills lesson
    cd -
    echo "Remember to copy those files and update lesson index word counts!"
  else
    echo "... No lessons for you!"
fi

read -q "?Build steno fundamentals? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    cd /Users/di/projects/plover-tools/typey-type-lesson-generator
    ruby ./generate-all-drills-files.rb fundamentals wordlist && ruby ./generate-all-drills-files.rb fundamentals dictionary && ruby ./generate-all-drills-files.rb fundamentals lesson
    cd -
    echo "Remember to copy those files and update lesson index word counts!"
  else
    echo "... No lessons for you!"
fi

ruby ~/projects/plover-tools/typey-type-lesson-generator/run-build-dict-for-typey-type-for-standard-dict-set.rb

yarn run build
# git tag -n
rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/typey-type/
say "Deployed to staging on port 8080."

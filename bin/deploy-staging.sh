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

ruby ~/projects/plover-tools/typey-type-lesson-generator/build-dict-for-typey-type.rb \
  ~/dropbox-personal/projects/Plover/dictionaries/nouns.json \
  ~/dropbox-personal/projects/Plover/dictionaries/abbreviations.json \
  ~/dropbox-personal/projects/Plover/dictionaries/briefs.json \
  ~/dropbox-personal/projects/Plover/dictionaries/condensed-strokes.json \
  ~/dropbox-personal/projects/Plover/dictionaries/currency.json \
  ~/dropbox-personal/projects/Plover/dictionaries/dict.json \
  ~/dropbox-personal/projects/Plover/dictionaries/dict_en_AU_phonetic.json \
  ~/dropbox-personal/projects/Plover/dictionaries/dict_en_AU_vocab.json \
  ~/dropbox-personal/projects/Plover/dictionaries/dict_en_AU_with_extra_stroke.json \
  ~/dropbox-personal/projects/Plover/dictionaries/nouns.json \
  ~/dropbox-personal/projects/Plover/dictionaries/numbers.json \
  ~/dropbox-personal/projects/Plover/dictionaries/numbers_powerups.json \
  ~/dropbox-personal/projects/Plover/dictionaries/phonetic.json \
  ~/dropbox-personal/projects/Plover/dictionaries/pronouns.json \
  ~/dropbox-personal/projects/Plover/dictionaries/punctuation_di.json \
  ~/dropbox-personal/projects/Plover/dictionaries/punctuation_powerups.json \
  ~/dropbox-personal/projects/Plover/dictionaries/punctuation_unspaced.json \
  ~/dropbox-personal/projects/Plover/dictionaries/symbols.json \
  ~/dropbox-personal/projects/Plover/dictionaries/symbols_briefs.json \
  ~/dropbox-personal/projects/Plover/dictionaries/symbols_currency_culled.json \
  ~/dropbox-personal/projects/Plover/dictionaries/top-10000-english-words.json \
  ~/dropbox-personal/projects/Plover/dictionaries/top-10000-project-gutenberg-words.json \
  ~/dropbox-personal/projects/Plover/dictionaries/top-level-domains.json

yarn run build
git tag -n
rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/typey-type/

const hasDictionaryFormatting = (_outline: string, translation: string) =>
  !!translation.match(
    /({\^|\^}|{#|-\||{\*|{<|{>|{MODE|{PLOVER|{\.}|{\?}|{!|{:}|{}|{ }|{,}|{.|{-|{&|%}|{;})/
  );

export default hasDictionaryFormatting;

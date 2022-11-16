/**
 * Examples:
 * "H-L"
 * "KPA"
 * "KPA\*"
 * "TEFT"
 * "WOB/HREU"
 * "SKPAO\*EUPL"
 * "WO\*RLD/WA\*R/2"
 * "#"
 * "#-P"
 * "「か-か」"
 * "PTVAt/TEOta"
 * "LROT"
 */
export type Outline = string;

/**
 * Examples:
 * "gazed"
 * "El Salvador"
 * "ever-increasing"
 * "{^-edge}"
 * "{>}{&e}"
 * "{*+}"
 * "{^:55}"
 * "{~|()}"
 * "{ }\\{\\}{#Left}{^}"
 */
export type Translation = string;

/**
 * Examples:
 * "user:personal.json"
 * "typey:typey-type.json"
 * "plover:main-3-jun-2018.json"
 */
export type NamespacedDictionary = string;

/**
 * Examples:
 * "coding.json"
 * "fingerspelling.json"
 * "punctuation.json"
 * "personal.json"
 * "typey-type.json"
 * "main.json"
 */
export type DictName = string;

/**
 * Example:
 * ["personal.json", {"TEFT": "myBrief"}]
 */
export type PersonalDictionaryNameAndContents = [DictName, StenoDictionary];

/**
 * Examples:
 * "user"
 * "typey"
 * "plover"
 */
export type Namespace = string;

/**
 * Examples:
 * ["KPA*", "typey:typey-type.json"]
 */
export type StrokeAndNamespacedDict = [Outline, NamespacedDictionary];

/**
 * Examples:
 * ["TEFT", "personal.json", "user"]
 * ["KPA*", "typey-type.json", "typey"]
 * ["O", "main.json", "plover"]
 */
export type StrokeAndDictionaryAndNamespace = [Outline, DictName, Namespace];

/**
 * An outline-first JSON-formatted steno dictionary that could be used by a steno engine, such as Plover
 *
 * Example:
 * {
 *   "TEFT": "test",
 *   "H-L": "hello",
 *   "KPA": "{}{-|}",
 *   "WOB/HREU": "wobbly",
 *   "#": "{*+}",
 * }
 */
export type StenoDictionary = {
  [outline: Outline]: Translation;
};

/**
 * Examples:
 * ["typey:typey-type.json", "user:nouns.json", "user:personal.json"]
 * ["typey:typey-type.json", "user:nouns.json", "user:personal.json", "plover:plover-main-3-jun-2018.json"]
 */
export type DictionaryConfigurationList = DictName[];

export type OptionalDictionaryConfig = {
  configuration?: DictionaryConfigurationList;
};

export type DictionaryConfig = Required<OptionalDictionaryConfig>;

/**
 * A word-first JavaScript Map lookup dictionary with source dictionary names for each outline
 *
 * Example:
 * Map (7) {
 *   "thought" => [
 *     ["THAUT", "plover:main.json"],
 *     ["THAUGT", "typey:typey-type.json"]
 *   ],
 *   "people" => [["PAOEPL", "typey:typey-type.json"]],
 *   "found" => [["TPOUPBD", "typey:typey-type.json"]],
 *   "just" => [["SKWRUFT", "typey:typey-type.json"]],
 *   "{&A}" => [["A\*P", "typey:typey-type.json"]],
 *   "{>}{&a}" => [["A\*", "typey:typey-type.json"]],
 *   "{}" => [["WUZ/WUZ", "typey:typey-type.json"]]
 * }
 */
export type LookupDictWithNamespacedDicts = Map<
  Translation,
  StrokeAndNamespacedDict[]
> &
  OptionalDictionaryConfig;

export type LookupDictWithNamespacedDictsAndConfig = Omit<
  LookupDictWithNamespacedDicts,
  "configuration"
> &
  DictionaryConfig;

/**
 * Example:
 * "/AOUL/A*T"
 */
export type SuffixOutlineWithLeadingSlash = string;

/**
 * Example:
 * "KWAS/KWREU/"
 */
export type PrefixOutlineWithSlash = string;

/**
 * Example:
 * "ulate"
 */
export type SuffixTextWithNoTPRBGTS = string;

/**
 * Example:
 * "quasi-"
 */
export type PrefixTextWithNoTPRBGTS = string;

/**
 * Example:
 * [ "TPHRAOUR/", "fluoro" ]
 */
export type PrefixEntry = [PrefixOutlineWithSlash, PrefixTextWithNoTPRBGTS];

/**
 * Example:
 * [ "/AOEUBL", "izable" ]
 */
export type SuffixEntry = [
  SuffixOutlineWithLeadingSlash,
  SuffixTextWithNoTPRBGTS
];

/**
 * Examples:
 * ["A*UT/", "auto"],
 * ["/WAL", "ual"],
 */
export type AffixItem = [
  PrefixOutlineWithSlash | SuffixOutlineWithLeadingSlash,
  PrefixTextWithNoTPRBGTS | SuffixTextWithNoTPRBGTS
];

/**
 * Example:
 * {
 *   prefixes: [["A*UT/", "auto"], ["TPHRAOUR/", "fluoro"]],
 *   suffixes: [["/WAL", "ual"], ["/AOEUBL", "izable"]]
 * }
 */
export type AffixObject = {
  prefixes: AffixItem[];
  suffixes: AffixItem[];
};

/**
 * Examples:
 * {
 *   "0": 1,
 *   "1": 1,
 *   " The": 95,
 *   " process": 7,
 *   " of": 691,
 *   " writing": 17,
 *   " shorthand": 6,
 * }
 */
export type MetWords = {
  [spacedTypedWords: string]: number;
};

/**
 * Examples:
 * "was"
 * "her"
 */
export type Material = string;

export type PresentedMaterialItem = { phrase: Material; stroke: Outline };
export type PresentedMaterial = PresentedMaterialItem[];

export type SpacePlacement =
  | "spaceBeforeOutput"
  | "spaceAfterOutput"
  | "spaceExact"
  | "spaceOff";

export type SortOrder =
  | "sortOff"
  | "sortRandom"
  | "sortNew"
  | "sortOld"
  | "sortShortest"
  | "sortLongest";

export type Study = "discover" | "revise" | "drill" | "practice";

export type StenoLayout =
  | "stenoLayoutAmericanSteno"
  | "stenoLayoutPalantype"
  | "stenoLayoutBrazilianPortugueseSteno"
  | "stenoLayoutDanishSteno"
  | "stenoLayoutItalianMichelaSteno"
  | "stenoLayoutJapanese"
  | "stenoLayoutKoreanModernC"
  | "stenoLayoutKoreanModernS";

export type UpcomingWordsLayout = "singleLine" | "multiline" | "hidden";

export type UserSettings = {
  beatsPerMinute: number;
  blurMaterial: boolean;
  caseSensitive: boolean;
  diagramSize: number;
  simpleTypography: boolean;
  retainedWords: boolean;
  limitNumberOfWords: number;
  newWords: boolean;
  repetitions: number;
  showScoresWhileTyping: boolean;
  showStrokes: boolean;
  showStrokesAsDiagrams: boolean;
  showStrokesOnMisstroke: boolean;
  hideStrokesOnLastRepetition: boolean;
  spacePlacement: SpacePlacement;
  speakMaterial: boolean;
  textInputAccessibility: boolean;
  sortOrder: SortOrder;
  seenWords: boolean;
  startFromWord: number;
  study: Study;
  stenoLayout: StenoLayout;
  upcomingWordsLayout: UpcomingWordsLayout;
};

import React from "react";
import DictionariesIndex from "./DictionariesIndex";
import userSettings from "../../stories/fixtures/userSettings";
import { useHydrateAtoms } from "jotai/utils";
import { dictionaryIndexState } from "../../states/dictionaryIndexState";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/DictionariesIndex",
  component: DictionariesIndex,
};

const dictionaryIndex = [
  {
    author: "Typey Type",
    category: "Typey Type",
    link: "/support#typey-type-dictionary",
    path: "/dictionaries/typey-type/typey-type.json",
    subcategory: "",
    subtitle: "",
    tagline:
      "Typey Type’s dictionary follows the Plover dictionary with misstrokes removed from the top 10,000 words.",
    title: "Dictionary",
  },
  {
    author: "Plover",
    category: "Plover",
    link: "https://github.com/openstenoproject/plover/blob/284398377a8fdcb36e1a632c193665339484fc43/plover/assets/main.json",
    path: "/dictionaries/plover/main-3-jun-2018.json",
    subcategory: "",
    subtitle: "",
    tagline:
      "Plover’s main dictionary from Jun 3, 2018. This shipped with Plover version weekly-v4.0.0.dev8 on 3 Jul 2018.",
    title: "Main Jun 3, 2018 (latest)",
  },
  {
    author: "Di Does Digital",
    category: "Di Does Digital",
    link: "https://github.com/didoesdigital/steno-dictionaries#australian-english-dictionaries",
    path: "/dictionaries/didoesdigital/dict-en-AU-with-extra-stroke.json",
    subcategory: "",
    subtitle: "",
    tagline:
      "Di Does Digital’s Australian English with extra strokes dictionary lets you write Australian/UK/International English variants of words used in stories by appending /A*U to strokes.",
    title: "Australian English with extra strokes",
  },
];

const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
  [
    "{!}",
    [
      ["KPHR", "user:punctuation-di.json"],
      ["SKHRAPL", "typey:typey-type.json"],
      ["TP-BG", "plover:plover-main-3-jun-2018.json"],
      ["STKPWHR-FPLT", "plover:plover-main-3-jun-2018.json"],
    ],
  ],
]);

const Template = (args) => {
  useHydrateAtoms([[dictionaryIndexState, dictionaryIndex]]);
  return (
    <DictionariesIndex
      fetchAndSetupGlobalDict={() => Promise.resolve(true)}
      globalLookupDictionary={globalLookupDictionary}
      globalLookupDictionaryLoaded={true}
      lookupTerm={undefined}
      userSettings={userSettings}
      personalDictionaries={{ dictionariesNamesAndContents: null }}
      updateGlobalLookupDictionary={() => undefined}
      updatePersonalDictionaries={() => undefined}
      match={{
        isExact: true,
        params: {},
        path: "/dictionaries",
        url: "/dictionaries/",
      }}
      {...args}
    />
  );
};

export const DictionariesIndexStory = Template.bind({});

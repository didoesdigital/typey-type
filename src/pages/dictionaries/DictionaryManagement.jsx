import * as Sentry from "@sentry/browser";
import LATEST_PLOVER_DICT_NAME from "../../constant/latestPloverDictName";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import React, { useEffect, useRef, useState } from "react";
import DocumentTitle from "react-document-title";
import GoogleAnalytics from "react-ga4";
import Notification from "../../components/Notification";
import { getListOfValidDictionariesAddedAndInConfig } from "../../utils/transformingDictionaries/transformingDictionaries";
import PseudoContentButton from "../../components/PseudoContentButton";
import { writePersonalPreferences } from "../../utils/typey-type";
import misstrokesJSON from "../../json/misstrokes.json";
import Subheader from "../../components/Subheader";
import { useAnnouncerApi } from "../../components/Announcer/useAnnouncer";
import { useAtomValue } from "jotai";
import { globalUserSettingsState } from "../../states/globalUserSettingsState";

// type Props = {
//   fetchAndSetupGlobalDict
//   globalLookupDictionary
//   globalUserSettings.experiments?.stenohintsonthefly
//   toggleExperiment
//   updatePersonalDictionaries
// }

// From an older version of Plover
// https://github.com/openstenoproject/plover/commit/1bfc3b3eb04ad7bf8b74d8d236174255b5382925#diff-ec83a43e05da03d0e1df2dce12cad3ebb30e8fad3d0ddab6243951e15f6b102b
const invalidEntries = {
  "11/*T": "11th",
  "E*/PHRAOUR/PWUS/KWRAOU/TPHUPL": "e pluribus unum",
  "E*/PHRAOUR/PWUS/KWRAOUPB": "e pluribus unum",
  "E*/PHRAOUR/PWUS/KWRAOUPB/UPL": "e pluribus unum",
  "SEPB/*AT": "sensate",
  "SWA/HAOEL/LAOE": "Swahili",
  "WEUBG/*APB": "Wiccan",
};

// @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const DictionaryManagement = (props) => {
  const globalUserSettings = useAtomValue(globalUserSettingsState);
  const mainHeading = useRef(null);
  // const mainHeading = useRef<HTMLHeadingElement>(null);
  const { updateMessage } = useAnnouncerApi();

  const [misstrokesInDictionaries, setMisstrokesInDictionaries] =
    useState(null);
  const [importedDictionariesLoaded, setImportedDictionariesLoaded] =
    useState(false);
  const [importedDictionariesLoading, setImportedDictionariesLoading] =
    useState(false);
  const [dictionaryErrorNotification, setDictionaryErrorNotification] =
    useState(null);
  const [
    dictionariesTypeyTypeWillUseState,
    setDictionariesTypeyTypeWillUseState,
  ] = useState([]);
  const [validDictionariesState, setValidDictionariesState] = useState([]);
  const [invalidDictionariesState, setInvalidDictionariesState] = useState([]);
  const [
    namesOfValidImportedDictionariesState,
    setNamesOfValidImportedDictionariesState,
  ] = useState([]);
  const [
    validDictionariesListedInConfigState,
    setValidDictionariesListedInConfigState,
  ] = useState([]);
  const [validConfig, setValidConfig] = useState("");
  const [invalidConfig, setInvalidConfig] = useState([]);

  const globalDict = props.globalLookupDictionary;
  useEffect(() => {
    // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
    mainHeading.current?.focus();

    let config = [];
    if (globalDict && globalDict["configuration"]) {
      config = globalDict["configuration"]
        // @ts-expect-error TS(7006) FIXME: Parameter 'dictName' implicitly has an 'any' type.
        .filter((dictName) =>
          dictName.startsWith(SOURCE_NAMESPACES.get("user") + ":")
        )
        // @ts-expect-error TS(7006) FIXME: Parameter 'dictName' implicitly has an 'any' type.
        .map((dictName) => dictName.replace(/^.+:/, ""));
    }
    setDictionariesTypeyTypeWillUseState(config);
  }, [globalDict]);

  // maxSelectFile(event) {
  //   let files = event.target.files // create file object
  //   if (files.length > 3) {
  //     const msg = 'Only 3 images can be uploaded at a time'
  //     event.target.value = null // discard selected file
  //     console.log(msg)
  //     return false;
  //   }

  //   return true;
  // }

  // @ts-expect-error TS(7006) FIXME: Parameter 'files' implicitly has an 'any' type.
  function validateDictionaries(files) {
    // @ts-expect-error TS(7005) FIXME: Variable 'validDictionaries' implicitly has an 'an... Remove this comment to see the full error message
    let validDictionaries = validDictionariesState.slice();
    // @ts-expect-error TS(7034) FIXME: Variable 'invalidDictionaries' implicitly has type... Remove this comment to see the full error message
    let invalidDictionaries = [];
    let filesLength = files.length;

    if (filesLength === 0) {
      // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
      setValidDictionariesState(validDictionaries);
      setInvalidDictionariesState([
        // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'never'.
        ["No dictionary", "Choose a dictionary file to import."],
      ]);
    } else {
      // @ts-expect-error TS(7034) FIXME: Variable 'misstrokesInDictionaries' implicitly has... Remove this comment to see the full error message
      let misstrokesInDictionaries = [];
      for (let i = 0; i < filesLength; ++i) {
        let dictionary = files[i];
        let dictName = dictionary.name;

        const reader = new FileReader();

        reader.onload = (event) => {
          // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
          let text = event.target.result;

          try {
            if (dictionary.size > 25000000) {
              throw new Error("This file is too big (>25MB).");
            }
            if (!dictionary.type.startsWith("application/json")) {
              throw new Error("This is not a JSON file.");
            }

            // @ts-expect-error TS(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            if (validDictionariesState.map((d) => d[0]).includes(dictName)) {
              throw new Error(
                "This dictionary name conflicts with an existing dictionary. You may have imported it already."
              );
            }

            if ((dictName === "typey-type.json" || dictName === "typey-type-full.json") && dictionary.size >= 2144740) {
              throw new Error(
                "This dictionary looks like a copy of Typey Type's so we'll exclude it for now."
              );
            }

            if (
              dictName === LATEST_PLOVER_DICT_NAME ||
              (dictName === "main.json" && dictionary.size > 4000)
            ) {
              throw new Error(
                "This dictionary looks like a copy of Plover's latest dictionary so we'll exclude it for now."
              );
            }

            // @ts-expect-error TS(2345) FIXME: Argument of type 'string | ArrayBuffer | null' is ... Remove this comment to see the full error message
            let parsedDictionary = JSON.parse(text);

            if (parsedDictionary.constructor !== {}.constructor) {
              throw new Error("This JSON does not contain an object.");
            }

            let parsedDictionaryEntries = Object.entries(parsedDictionary);

            if (parsedDictionaryEntries.length < 1) {
              throw new Error("This dictionary is empty.");
            }

            let probableMisstrokes = [];
            let parsedDictionaryEntriesLength = parsedDictionaryEntries.length;

            for (let i = 0; i < parsedDictionaryEntriesLength; ++i) {
              let [outline, translation] = parsedDictionaryEntries[i];
              let invalidStenoOutline = outline.match(
                /[^#STKPWHRAO*-EUFRPBLGTSDZ/]/
              );
              if (invalidStenoOutline !== null) {
                let maxLength = 50;
                let trimmedInvalidStenoOutline =
                  outline.length > maxLength
                    ? outline.substring(0, maxLength - 3) + "…"
                    : outline.substring(0, maxLength);
                throw new Error(
                  `${dictName} contains invalid steno outlines, such as: ${trimmedInvalidStenoOutline}`
                );
              }

              if (
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                misstrokesJSON[outline] &&
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                misstrokesJSON[outline] === translation
              ) {
                probableMisstrokes.push([outline, translation]);
              }

              if (
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                invalidEntries[outline] &&
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                invalidEntries[outline] === translation
              ) {
                probableMisstrokes.push([outline, translation]);
              }
            }

            if (parsedDictionary && typeof parsedDictionary === "object") {
              validDictionaries.push([dictName, parsedDictionary]);
            }

            if (probableMisstrokes.length > 0) {
              misstrokesInDictionaries.push({
                name: dictName,
                probableMisstrokes: probableMisstrokes,
              });
            }
          } catch (error) {
            // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
            invalidDictionaries.push([dictName, error.message]);
          }

          const namesOfValidImportedDictionaries = validDictionaries.map(
            (dictionary) => {
              return dictionary[0];
            }
          );

          let dictionariesTypeyTypeWillUse =
            getListOfValidDictionariesAddedAndInConfig(
              validDictionariesListedInConfigState,
              namesOfValidImportedDictionaries
            );

          // @ts-expect-error TS(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
          setDictionariesTypeyTypeWillUseState(dictionariesTypeyTypeWillUse);
          setNamesOfValidImportedDictionariesState(
            // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
            namesOfValidImportedDictionaries
          );
          // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
          setValidDictionariesState(validDictionaries);
          // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
          setInvalidDictionariesState(invalidDictionaries);
        };

        reader.readAsText(dictionary);
      }

      // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
      setMisstrokesInDictionaries(misstrokesInDictionaries);
    }
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'files' implicitly has an 'any' type.
  function validateConfig(files) {
    let validConfig = "";
    // @ts-expect-error TS(7034) FIXME: Variable 'validDictionariesListedInConfig' implici... Remove this comment to see the full error message
    let validDictionariesListedInConfig = [];
    // @ts-expect-error TS(7034) FIXME: Variable 'invalidConfig' implicitly has type 'any[... Remove this comment to see the full error message
    let invalidConfig = [];
    let filesLength = files.length;

    if (filesLength > 1) {
      setValidConfig(validConfig);
      // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'never'.
      setInvalidConfig(["Too many files", "Choose one config file."]);
    } else if (filesLength !== 1) {
      setValidConfig(validConfig);
      // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'never'.
      setInvalidConfig(["No config file", "Choose a config file to import."]);
    } else if (!files[0].name.endsWith(".cfg")) {
      setValidConfig(validConfig);
      setInvalidConfig([
        // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'never'.
        "Incorrect file type",
        // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'never'.
        "The file name must end in “.cfg”.",
      ]);
    } else {
      let dictionaryConfig = files[0];
      let configName = dictionaryConfig.name;

      const reader = new FileReader();

      reader.onload = (event) => {
        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
        let text = event.target.result;

        try {
          // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
          let lines = text.split("\n");
          let linesLength = lines.length;
          let parsedConfig = "";
          for (let i = 0; i < linesLength; ++i) {
            if (lines[i].startsWith("dictionaries = ")) {
              parsedConfig = JSON.parse(
                lines[i].replace("dictionaries = ", "")
              );
            }
          }

          if (!parsedConfig) {
            throw new Error("This file has no list of dictionaries.");
          }

          let parsedConfigLength = parsedConfig.length;
          for (let i = 0; i < parsedConfigLength; ++i) {
            if (
              parsedConfig[i].hasOwnProperty("enabled") &&
              parsedConfig[i].hasOwnProperty("path")
            ) {
              // @ts-expect-error TS(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
              if (parsedConfig[i]["enabled"]) {
                // @ts-expect-error TS(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
                let filename = parsedConfig[i]["path"]
                  .split("\\")
                  .pop()
                  .split("/")
                  .pop();
                if (filename.endsWith(".json")) {
                  validDictionariesListedInConfig.push(filename);
                } else if (
                  filename.endsWith(".py" || filename.endsWith(".rtf"))
                ) {
                  // Skip valid, but unhandled dictionary formats
                } else {
                  debugger;
                  throw new Error(
                    `This doesn't look like a valid dictionary filename: ${filename.slice(
                      0,
                      50
                    )}.`
                  );
                }
              }
            } else {
              throw new Error(
                "The list of dictionaries has no enabled dictionary paths."
              );
            }
          }

          if (validDictionariesListedInConfig.length === 0) {
            throw new Error(
              "There were no valid JSON dictionaries found enabled in this config."
            );
          }

          validConfig = configName;
        } catch (error) {
          // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
          invalidConfig = [configName, error.message];
        }

        let dictionariesTypeyTypeWillUse =
          getListOfValidDictionariesAddedAndInConfig(
            // @ts-expect-error TS(7005) FIXME: Variable 'validDictionariesListedInConfig' implici... Remove this comment to see the full error message
            validDictionariesListedInConfig,
            namesOfValidImportedDictionariesState
          );

        // @ts-expect-error TS(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
        setDictionariesTypeyTypeWillUseState(dictionariesTypeyTypeWillUse);
        setValidConfig(validConfig);
        setValidDictionariesListedInConfigState(
          // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
          validDictionariesListedInConfig
        );
        // @ts-expect-error TS(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
        setInvalidConfig(invalidConfig);
      };

      reader.readAsText(dictionaryConfig);
    }
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function handleOnSubmit(event) {
    event.preventDefault();

    setImportedDictionariesLoaded(false);
    setImportedDictionariesLoading(false);

    const filesInput = document.querySelector("#dictionariesFileInput");
    // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
    const files = filesInput.files;

    let labelString = "No files for dictionaries";
    if (files && files.length > 0) {
      let fileNames = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      labelString = fileNames.join(", ");
    }
    GoogleAnalytics.event({
      category: "Dictionary management",
      action: "Add dictionaries",
      label: labelString,
    });

    validateDictionaries(files);
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function handleOnSubmitConfig(event) {
    event.preventDefault();

    setImportedDictionariesLoaded(false);
    setImportedDictionariesLoading(false);

    const filesInput = document.querySelector("#dictionaryConfigFileInput");
    // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
    const files = filesInput.files;

    let labelString = "No files for config";

    if (files && files.length > 0) {
      let fileNames = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      labelString = fileNames.join(", ");
    }

    GoogleAnalytics.event({
      category: "Dictionary management",
      action: "Add config",
      label: labelString,
    });

    validateConfig(files);
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function handleOnSubmitClear(event) {
    event.preventDefault();

    let writeDictionariesError = writePersonalPreferences(
      "personalDictionaries",
      []
    );
    if (writeDictionariesError) {
      console.log(writeDictionariesError);
      if (writeDictionariesError.error) {
        Sentry.captureException(writeDictionariesError.error);
        Sentry.captureMessage(
          "Write dictionaries error… " + writeDictionariesError.message,
          // @ts-expect-error TS(2345) FIXME: Argument of type '"debug"' is not assignable to pa... Remove this comment to see the full error message
          "debug"
        );
      }
    } else {
      updateMessage("Applied!");
    }

    setImportedDictionariesLoading(false);
    setDictionaryErrorNotification(null);
    setDictionariesTypeyTypeWillUseState([]);
    setValidDictionariesState([]);
    setInvalidDictionariesState([]);
    setNamesOfValidImportedDictionariesState([]);
    setValidDictionariesListedInConfigState([]);
    setValidConfig("");
    setInvalidConfig([]);

    GoogleAnalytics.event({
      category: "Dictionary management",
      action: "Clear dictionaries and config",
      label: "Clear all",
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function handleOnSubmitApplyChanges(event) {
    event.preventDefault();

    setImportedDictionariesLoaded(false);
    setImportedDictionariesLoading(true);

    // @ts-expect-error TS(7005) FIXME: Variable 'configOrder' implicitly has an 'any[]' t... Remove this comment to see the full error message
    let configOrder = validDictionariesListedInConfigState;
    // @ts-expect-error TS(7005) FIXME: Variable 'sortedValidDictionaries' implicitly has ... Remove this comment to see the full error message
    let sortedValidDictionaries = validDictionariesState.slice(0);
    sortedValidDictionaries = sortedValidDictionaries.sort((a, b) => {
      // dictionaries that don't appear in config will be before dictionaries that do
      return configOrder.indexOf(a[0]) - configOrder.indexOf(b[0]);
    });

    // First, update state
    props.updatePersonalDictionaries({
      dictionariesNamesAndContents: sortedValidDictionaries,
    });

    let personalDictionariesToStoreInV1Format = {
      v: "1",
      dicts: validDictionariesState,
    };

    // Second, update local storage
    let writeDictionariesError = writePersonalPreferences(
      "personalDictionaries",
      personalDictionariesToStoreInV1Format
    );
    if (writeDictionariesError) {
      showDictionaryErrorNotification(writeDictionariesError.name);

      if (writeDictionariesError.error) {
        Sentry.captureException(writeDictionariesError.error);
        Sentry.captureMessage(
          "Write dictionaries error… " + writeDictionariesError.message,
          // @ts-expect-error TS(2345) FIXME: Argument of type '"debug"' is not assignable to pa... Remove this comment to see the full error message
          "debug"
        );
      }
    }

    // @ts-expect-error TS(7005) FIXME: Variable 'dictionariesTypeyTypeWillUse' implicitly... Remove this comment to see the full error message
    let dictionariesTypeyTypeWillUse = dictionariesTypeyTypeWillUseState;

    let labelString = dictionariesTypeyTypeWillUse || "No files for config";
    GoogleAnalytics.event({
      category: "Apply dictionary changes",
      action: "Click apply button",
      // @ts-expect-error TS(2322) FIXME: Type 'any[]' is not assignable to type 'string'.
      label: labelString,
    });

    const personalDictionaries = {
      dictionariesNamesAndContents: validDictionariesState,
    };
    props
      .fetchAndSetupGlobalDict(personalDictionaries)
      .then(() => {
        setImportedDictionariesLoaded(true);
        setImportedDictionariesLoading(false);
      })
      // @ts-expect-error TS(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
      .catch((error) => {
        console.error(error);
        showDictionaryErrorNotification("FetchAndSetupGlobalDictFailed");
        setImportedDictionariesLoaded(false);
        setImportedDictionariesLoading(false);
      });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
  function showDictionaryErrorNotification(name) {
    updateMessage(
      "Unable to save dictionaries. See the message at the top of the page for more details."
    );
    setDictionaryErrorNotification(name || null);
  }

  function dismissDictionaryErrorNotification() {
    updateMessage("");
    setDictionaryErrorNotification(null);
  }

  let dictionariesTypeyTypeWillUse = dictionariesTypeyTypeWillUseState.map(
    (dictionary, index) => {
      return <li key={index}>{dictionary}</li>;
    }
  );

  const whyMisstrokes = (
    <>
      <details>
        <summary>
          <p>
            To see better stroke hints, you might move any misstrokes out of
            your main dictionaries into a separate misstrokes autocorrect
            dictionary and exclude it from Typey&nbsp;Type.
          </p>
        </summary>
        <p>
          Misstrokes are extra entries that use similar keys to produce the word
          you meant to write. If you regularly mistype a word, you might add a
          misstroke entry for the keys you are incorrectly pressing so that your
          dictionaries effectively autocorrects your mistakes. This is great for
          increasing the accuracy of your output.
        </p>
        <p>
          While you're learning steno theory, it can be difficult to recognise
          misstrokes. It might then take longer to learn the theory and develop
          intuition about what strokes to use for longer words and variations.
          For example, if you use the misstroke{" "}
          <span className="steno-stroke">SPHAOEU</span> to write “supply”, which
          is missing the left-hand <span className="steno-stroke">R</span> key
          from the usual outline <span className="steno-stroke">SPHRAOEU</span>,
          it might take you longer to work out the brief{" "}
          <span className="steno-stroke">SPHRAOEUG</span> for “supplying” or{" "}
          <span className="steno-stroke">SPWHRAOEU</span> for
          “blood&nbsp;supply”.
        </p>
      </details>
    </>
  );

  let misstrokesBlurb =
    // @ts-expect-error TS(2339) FIXME: Property 'length' does not exist on type 'never'.
    misstrokesInDictionaries?.length > 0 ? (
      <>
        <p>
          Your dictionaries contain entries that might be misstrokes or bad
          habits:
        </p>
        <ul>
          {/* @ts-expect-error TS(2531) FIXME: Object is possibly 'null'. */}
          {misstrokesInDictionaries.map((dict, dictIndex) => {
            const probableMisstrokes = dict.probableMisstrokes.map(
              // @ts-expect-error TS(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
              (entry, misstrokeIndex) => (
                <li className="bg-warning wrap" key={misstrokeIndex}>
                  "{entry[0]}": "{entry[1]}"
                </li>
              )
            );
            return (
              <li key={dictIndex}>
                {dict.name}:<ul>{probableMisstrokes}</ul>
              </li>
            );
          })}
        </ul>
        {whyMisstrokes}
      </>
    ) : (
      whyMisstrokes
    );

  let showYourDictionaries = (
    <p>
      You can import your dictionaries and your dictionary config to look up
      briefs using your own dictionaries.
    </p>
  );
  let showYourConfig = null;
  let showDictionaryErrors = null;
  let showConfigErrors = null;

  const validDictionaryList = validDictionariesState.map(
    (dictionary, index, array) => {
      return <li key={index}>{dictionary[0]}</li>;
    }
  );

  const invalidDictionaryList = invalidDictionariesState.map(
    (dictionary, index, array) => {
      return (
        <li key={index}>
          {dictionary[0]}: {dictionary[1]}
        </li>
      );
    }
  );

  // @ts-expect-error TS(7005) FIXME: Variable 'namesOfValidImportedDictionaries' implic... Remove this comment to see the full error message
  const namesOfValidImportedDictionaries =
    namesOfValidImportedDictionariesState;
  const validDictionariesListedInConfig =
    validDictionariesListedInConfigState.map((dictionary, index, array) => {
      let className = "";
      if (namesOfValidImportedDictionaries.indexOf(dictionary) > -1) {
        className = "unstyled-list-item";
      } else {
        className = "unstyled-list-item bg-danger dark:text-coolgrey-900";
      }
      return (
        <li key={index} className={className}>
          {dictionary}
        </li>
      );
    });

  if (validDictionariesState && validDictionariesState.length > 0) {
    showYourDictionaries = (
      <React.Fragment>
        {validDictionariesState.length === 1 ? (
          <p>Your added dictionary:</p>
        ) : (
          <p>Your added dictionaries:</p>
        )}
        <ul className="wrap">{validDictionaryList}</ul>
      </React.Fragment>
    );
  }

  if (invalidDictionariesState && invalidDictionariesState.length > 0) {
    showDictionaryErrors = (
      <React.Fragment>
        {invalidDictionariesState.length === 1 ? (
          <p>This dictionary is invalid:</p>
        ) : (
          <p>These dictionaries are invalid:</p>
        )}
        <ul className="bg-danger dark:text-coolgrey-900 pl1 pr3 wrap">
          {invalidDictionaryList}
        </ul>
      </React.Fragment>
    );
  }

  if (validConfig && validConfig.length > 4) {
    // '.cfg' is 4 characters
    showYourConfig = (
      <React.Fragment>
        <p className="wrap">
          Your added dictionary config ({validConfig}) contains these
          dictionaries:
        </p>
        <ul className="wrap unstyled-list">
          {validDictionariesListedInConfig}
        </ul>
      </React.Fragment>
    );
  }

  if (invalidConfig && invalidConfig.length === 2) {
    showConfigErrors = (
      <React.Fragment>
        <p>This dictionary config is invalid:</p>
        <p className="bg-danger dark:text-coolgrey-900 pl1 pr3 wrap">
          {invalidConfig[0]}: {invalidConfig[1]}
        </p>
      </React.Fragment>
    );
  }

  let notificationBody;
  switch (dictionaryErrorNotification) {
    // @ts-expect-error TS(2678) FIXME: Type '"AddToStorageFailed"' is not comparable to t... Remove this comment to see the full error message
    case "AddToStorageFailed":
      notificationBody = (
        <p>
          Your local storage is full so your dictionaries won't fit.
          Typey&nbsp;Type will still use them today but the next time you visit,
          you’ll have to add your dictionaries again. For help, email{" "}
          <a
            href="mailto:typeytype@didoesdigital.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            typeytype@didoesdigital.com
          </a>
        </p>
      );
      break;

    // @ts-expect-error TS(2678) FIXME: Type '"WriteToStorageFailed"' is not comparable to... Remove this comment to see the full error message
    case "WriteToStorageFailed":
      notificationBody = (
        <p>
          Typey&nbsp;Type couldn’t update your local storage. Check your
          settings. It might also be full. Any changes to personal preferences
          and progress will be lost.
        </p>
      );
      break;

    // @ts-expect-error TS(2678) FIXME: Type '"NoLocalStorage"' is not comparable to type ... Remove this comment to see the full error message
    case "NoLocalStorage":
      notificationBody = (
        <p>
          Local storage is unavailable. Check your settings and permissions or
          try another browser. Changes to personal preferences and progress will
          be lost.
        </p>
      );
      break;

    // @ts-expect-error TS(2678) FIXME: Type '"FetchAndSetupGlobalDictFailed"' is not comp... Remove this comment to see the full error message
    case "FetchAndSetupGlobalDictFailed":
      notificationBody = (
        <p>
          Typey&nbsp;Type couldn’t set up a global dictionary using your
          personal dictionaries. For help, email{" "}
          <a
            href="mailto:typeytype@didoesdigital.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            typeytype@didoesdigital.com
          </a>
        </p>
      );
      break;

    default:
      notificationBody = "";
      break;
  }

  return (
    <DocumentTitle title={"Typey Type | Dictionary management"}>
      <main id="main">
        {dictionaryErrorNotification ? (
          <Notification
            onDismiss={dismissDictionaryErrorNotification.bind(this)}
          >
            {notificationBody}
          </Notification>
        ) : null}
        <Subheader>
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 className="table-cell mr2" ref={mainHeading} tabIndex={-1}>
                Dictionary management
              </h2>
            </header>
          </div>
        </Subheader>
        <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <h3>Dictionary management experiment</h3>
            <details>
              <summary>
                <p>
                  <span className="bg-danger dark:text-coolgrey-900">
                    This feature is experimental!
                  </span>{" "}
                  There are some known limitations, such as the size limit.
                  Expand to learn more…
                </p>
              </summary>
              <ul>
                <li>
                  Local storage typically only holds about 5MB of data. If you
                  have a bigger dictionary, you'll have to add it again on every
                  visit.
                </li>
                <li>
                  You cannot use duplicate dictionary names e.g. if you have{" "}
                  <code>../good/dict.json</code> and{" "}
                  <code>../bad/dict.json</code>, Typey&nbsp;Type will see them
                  both as <code>dict.json</code> and panic.
                </li>
                <li>
                  This only works with JSON files. You cannot add Python or RTF
                  dictionaries.
                </li>
                <li>
                  This only works with Plover config files. This config file may
                  decide the order of dictionaries for overwriting entries.
                </li>
                <li>
                  This assumes you're using a newer version of Plover where the
                  config file is in a certain format and the most important
                  dictionary appears first.
                </li>
                <li>
                  If you add multiple dictionaries with the same steno outline
                  (JSON key) with different translations (JSON values),
                  Typey&nbsp;Type will happily show the same outline as a hint
                  for each of the words (or phrases), even though your
                  configuration would prevent using both.
                </li>
                <li>
                  The Writer feature will ignore your personal dictionaries
                  entirely and show only Typey&nbsp;Type translations.
                </li>
                <li>
                  This will probably do weird things with steno layouts other
                  than the American (Ward Stone Ireland) layout and possibly
                  with non-Plover theory punctuation.
                </li>
              </ul>
            </details>
            <p>
              Typey&nbsp;Type does not upload personal dictionaries anywhere.
              Your dictionaries stay on your device. Dictionary names (but not
              their contents) may be sent to Google Analytics.
            </p>
            <div className="block relative p1">
              <label className="checkbox-label mb1">
                <input
                  className="checkbox-input mr1"
                  type="checkbox"
                  name="stenohintsonthefly"
                  id="stenohintsonthefly"
                  checked={
                    !!globalUserSettings?.experiments?.stenohintsonthefly
                  }
                  onChange={props.toggleExperiment}
                />
                <strong>
                  Show your dictionary entries in lesson hints{" "}
                  <span className="bg-danger dark:text-coolgrey-900">
                    (this is experimental with known limitations!)
                  </span>
                </strong>
              </label>
              <ul className="ml3">
                {/* <li>This setting means that instead of using Typey&nbsp;Type's static lesson files for words and stroke hints, Typey Type will use the lesson files only for the words and then generate stroke hints using your dictionaries' strokes when the lesson loads.</li> */}
                <li>
                  Typey&nbsp;Type will still use its own stroke hints for
                  lessons with “phrasing”, “prefixes”, “suffixes”,
                  “steno-party-tricks”, or “collections/tech” in the URL.
                </li>
                <li>
                  There are weird cases where Typey&nbsp;Type will show its own
                  strokes for certain combinations of punctuation.
                </li>
                <li>
                  You may see{" "}
                  <span className="steno-stroke steno-stroke--subtle">EU</span>{" "}
                  or{" "}
                  <span className="steno-stroke steno-stroke--subtle">
                    *EUP
                  </span>{" "}
                  shown for “I” instead of{" "}
                  <span className="steno-stroke steno-stroke--subtle">1-R</span>{" "}
                  in the Roman Numerals lesson and similar quirks.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-coolgrey-1000 landing-page-section">
          <div className="p3 mx-auto mw-1024 flex flex-wrap">
            <div className="mw-568 mr3 flex-grow">
              <h3>Dictionaries used for lookup</h3>

              {props.globalLookupDictionary &&
              props.globalLookupDictionary["configuration"] ? (
                <>
                  <p>
                    Typey&nbsp;Type will use these dictionaries for brief hints:
                  </p>
                  <ul>
                    <li>Typey Type's dictionaries</li>
                    {dictionariesTypeyTypeWillUse}
                  </ul>
                </>
              ) : (
                <p>
                  No dictionaries have been loaded yet because this page doesn't
                  need to show any strokes.
                </p>
              )}
              <form
                className="mb3"
                onSubmit={handleOnSubmitApplyChanges.bind(this)}
              >
                <p>
                  <PseudoContentButton
                    className="pseudo-text--applied button mt1"
                  >
                    Apply
                  </PseudoContentButton>
                  {importedDictionariesLoading ? (
                    <span className="dib ml2">Applying</span>
                  ) : null}
                  {importedDictionariesLoaded ? (
                    <span className="dib ml2">Applied!</span>
                  ) : null}
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="flex flex-wrap">
              <div className="mw-568 mr3 flex-grow">
                <h3>Your dictionaries</h3>
                {showYourDictionaries}
                {showDictionaryErrors}
                {misstrokesBlurb}
                {showYourConfig}
                {showConfigErrors}
                <form
                  className="mt3 mb3"
                  onSubmit={handleOnSubmitClear.bind(this)}
                >
                  <div>
                    <button type="submit" className="button button--danger mt1">
                      Clear dictionaries and config
                    </button>
                  </div>
                </form>
              </div>
              <div className="mw-384 w-336">
                <h3>Add files</h3>
                <form className="mb3" onSubmit={handleOnSubmit.bind(this)}>
                  <div className="dib">
                    <label className="mb1" htmlFor="dictionariesFileInput">
                      Add dictionaries in JSON format
                    </label>
                    <p className="text-small mb1">
                      You can add one dictionary after another using this form.
                    </p>
                    <input
                      type="file"
                      id="dictionariesFileInput"
                      name="dictionary"
                      className="form-control"
                      multiple
                    />
                  </div>
                  <div>
                    <button type="submit" className="button mt1">
                      Add dictionaries
                    </button>
                  </div>
                </form>

                <form
                  className="mb3"
                  onSubmit={handleOnSubmitConfig.bind(this)}
                >
                  <div className="dib">
                    <label className="mb1" htmlFor="dictionaryConfigFileInput">
                      Add config
                    </label>
                    <input
                      type="file"
                      id="dictionaryConfigFileInput"
                      name="dictionaryConfig"
                      className="form-control"
                      multiple
                    />
                  </div>
                  <div>
                    <button type="submit" className="button mt1">
                      Add config
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DocumentTitle>
  );
};

export default DictionaryManagement;

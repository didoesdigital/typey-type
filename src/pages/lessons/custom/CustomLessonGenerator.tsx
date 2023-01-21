import React, { useEffect, useReducer, useRef } from "react";
import { actions } from "./rulesActions";
import Subheader from "../../../components/Subheader";
import { initConfig as initRulesConfig, rulesReducer } from "./rulesReducer";
import { Link } from "react-router-dom";
import RuleCheckbox from "./components/RuleCheckbox";
import rulesCheckboxes from "./utilities/rulesCheckboxes";
import type {
  CustomLesson,
  LookupDictWithNamespacedDicts,
} from "../../../types";
import type { Rules } from "./generator/types";

type Props = {
  customLesson: CustomLesson;
  generateCustomLesson: (
    globalLookupDictionary: LookupDictWithNamespacedDicts,
    rules: Rules
  ) => void;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  personalDictionaries: any;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
};

const CustomLessonGenerator = ({
  customLesson,
  fetchAndSetupGlobalDict,
  generateCustomLesson,
  globalLookupDictionary,
  personalDictionaries,
}: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const shouldUsePersonalDictionaries =
      personalDictionaries &&
      Object.entries(personalDictionaries).length > 0 &&
      !!personalDictionaries.dictionariesNamesAndContents;

    fetchAndSetupGlobalDict(
      false,
      shouldUsePersonalDictionaries ? personalDictionaries : null
    ).catch((error: Error) => {
      console.error(error);
    });
    // }, [fetchAndSetupGlobalDict, personalDictionaries]);
    // Excluding fetchAndSetupGlobalDict…
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalDictionaries]);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const [rulesState, dispatchRules] = useReducer(
    rulesReducer,
    {}, // init state
    initRulesConfig
  );

  const buildLesson = () => {
    generateCustomLesson(globalLookupDictionary, rulesState);
  };

  const onChangeRuleStatus: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatchRules({
      type: actions.toggleRule,
      payload: { ruleName: event.target.name },
    });
  };

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2
              ref={mainHeading}
              tabIndex={-1}
              id="typey-type-for-stenographers-lesson-generator"
            >
              Lesson generator
            </h2>
          </header>
        </div>
      </Subheader>

      <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
            <div className="mt1">
              <h3 className="mt3">Lesson generator</h3>
              <div>
                <p>
                  This page lets you generate custom lessons using
                  Typey&nbsp;Type dictionaries and personal dictionaries.
                </p>
                <div className="pb3">
                  {rulesCheckboxes.map((rule) => (
                    <RuleCheckbox
                      key={rule.ruleName}
                      ruleName={rule.ruleName}
                      prettyName={rule.prettyName}
                      rulesState={rulesState}
                      onChangeRuleStatus={onChangeRuleStatus}
                    />
                  ))}
                </div>
                <p>
                  <button
                    className="link-button dib mr1"
                    style={{ lineHeight: 2 }}
                    onClick={buildLesson}
                    type="button"
                  >
                    Build lesson
                  </button>
                  <Link
                    to="/lessons/custom?study=practice&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1"
                    className="link-button dib text-right"
                    style={{ lineHeight: 2 }}
                  >
                    Start generated lesson
                  </Link>
                </p>
                <p>Preview generated lesson:</p>
                <div>
                  <ul>
                    {customLesson.presentedMaterial.map(
                      (materialItem, index: number) => (
                        <li
                          key={`${index}-${materialItem.phrase}-${materialItem.stroke}`}
                        >
                          {materialItem.phrase}{" "}
                          <kbd className="raw-steno-key raw-steno-key--subtle">
                            {materialItem.stroke}
                          </kbd>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomLessonGenerator;

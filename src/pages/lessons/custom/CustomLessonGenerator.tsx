import React, { useEffect, useReducer, useRef, useState } from "react";
import GoogleAnalytics from "react-ga4";
import { actions } from "./generator/rulesActions";
import { actions as rulesWithDataActions } from "./generator/rulesWithDataActions";
import Subheader from "../../../components/Subheader";
import { useLocalStorage } from "usehooks-ts";
import {
  defaultState as defaultRules,
  rulesReducer,
} from "./generator/rulesReducer";
import {
  defaultState as defaultRulesWithData,
  rulesWithDataReducer,
} from "./generator/rulesWithDataReducer";
import { Link, useRouteMatch } from "react-router-dom";
import RuleOptions from "./generator/components/RuleOptions";
import RegexRuleSetting from "./generator/components/RegexRuleSetting";
import availableRulePrettyNames from "./generator/utilities/availableRulePrettyNames";
import maxItems from "./generator/constants/maxItems";
import GeneratorHelp from "./GeneratorHelp";

import type {
  CustomLesson,
  LookupDictWithNamespacedDicts,
} from "../../../types";
import type { RegexRules } from "./generator/utilities/generateCustomLesson";
import type { CustomLessonMaterialValidationState } from "./components/CustomLessonIntro";
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";

type Props = {
  customLesson: CustomLesson;
  customLessonMaterialValidationState: CustomLessonMaterialValidationState;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
};

const numberOfVisibleOptions = 16;

const containerId = "collapsible-help";

const CustomLessonGenerator = ({
  customLesson,
  customLessonMaterialValidationState,
  globalLookupDictionary,
}: Props) => {
  const {
    appFetchAndSetupGlobalDict,
    generateCustomLesson,
  } = useAppMethods();
  const mainHeading = useRef<HTMLHeadingElement>(null);

  const [hideHelp, setHideHelp] = useState(true);
  const [regexRuleIgnoredButHasText, setRegexRuleIgnoredButHasText] =
    useState(false);

  const toggleHideHelp = () => {
    setHideHelp(!hideHelp);
  };

  useEffect(() => {
    appFetchAndSetupGlobalDict(false, null).catch((error: Error) => {
      console.error(error);
    });
    // }, [appFetchAndSetupGlobalDict]);
    // Excluding fetchAndSetupGlobalDict…
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const onChangeEntryRegexRule: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setRegexRuleIgnoredButHasText(false);
    dispatchRulesWithData({
      type: rulesWithDataActions.setRuleWithDataStatus,
      payload: {
        ruleName: event.target.name,
        ruleStatus: event.target.value,
      },
    });
  };

  const onChangeEntryRegex: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRegexRuleIgnoredButHasText(false);
    dispatchRulesWithData({
      type: rulesWithDataActions.setRegexRuleData,
      payload: {
        entryPart: event.target.id.replace("-regex", ""),
        regexText: event.target.value,
      },
    });
  };

  const [rulesWithDataSettings, setRulesWithDataSettings] = useLocalStorage(
    "rules-with-data",
    defaultRulesWithData
  );

  const [rulesWithDataState, dispatchRulesWithData] = useReducer(
    rulesWithDataReducer,
    {}, // init state
    () => rulesWithDataSettings
  );

  const [rulesSettings, setRulesSettings] = useLocalStorage(
    "rules",
    defaultRules
  );

  const [rulesState, dispatchRules] = useReducer(
    rulesReducer,
    {}, // init state
    () => rulesSettings
  );

  const onRules = Object.fromEntries(
    Object.entries(rulesState).filter(([_ruleName, value]) => value)
  );

  const regexRules: RegexRules = {
    outlineMatching: rulesWithDataState.outlineMatching,
    outlineRegexText: rulesWithDataState.outlineRegexText,
    translationMatching: rulesWithDataState.translationMatching,
    translationRegexText: rulesWithDataState.translationRegexText,
  };

  const buildLesson = () => {
    generateCustomLesson(globalLookupDictionary, onRules, regexRules);
    if (
      (rulesWithDataState.translationRegexText.length > 0 &&
        rulesWithDataState.translationMatching === "ignored") ||
      (rulesWithDataState.outlineRegexText.length > 0 &&
        rulesWithDataState.outlineMatching === "ignored")
    ) {
      setRegexRuleIgnoredButHasText(true);
    }
    setRulesSettings(rulesState);
    setRulesWithDataSettings(rulesWithDataState);
  };

  const onChangeRuleStatus: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatchRules({
      type: actions.setRuleStatus,
      payload: { ruleName: event.target.name, ruleStatus: event.target.value },
    });

    setRulesSettings(rulesState);
    setRulesWithDataSettings(rulesWithDataState);

    GoogleAnalytics.event({
      category: "Lesson generator",
      action: "Change rule setting",
      label: `${event.target.name}: ${event.target.value}`,
    });
  };

  const match = useRouteMatch({
    path: "/lessons",
    strict: true,
    sensitive: true,
  });
  const url = match?.url ?? "";

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
        <div className="flex flex-wrap mxn2">
          <Link
            to={`${url}/custom/setup`.replace(/\/{2,}/g, "/")}
            className="link-button link-button-ghost table-cell mr1"
            style={{ lineHeight: 2 }}
            id="ga--lesson-index--create-a-custom-lesson"
          >
            Create a custom lesson
          </Link>
        </div>
      </Subheader>

      <div className="bg-info dark:bg-coolgrey-1100">
        <div className="mx-auto mw-1920">
          <div className="flex-grow mx-auto mw-1440 min-w-0">
            <div className="flex flex-wrap justify-between">
              <div className="flex-grow" style={{ "flexBasis": "648px" }}>
                <div className="p3 mx-auto mw-1024">
                  <div className="mt3 flex justify-between">
                    <h3 className="mt0">Build lesson</h3>
                    <p>
                      <button
                        className={`button button--secondary mb0 text-center${
                          hideHelp ? " collapsed" : ""
                        }`}
                        onClick={toggleHideHelp}
                        onKeyPress={toggleHideHelp}
                        aria-expanded={!hideHelp}
                        aria-controls={containerId}
                      >
                        {hideHelp ? "Show help" : "Hide help"}
                      </button>
                    </p>
                  </div>
                  <div>
                    <p>
                      This page lets you generate custom lessons using
                      Typey&nbsp;Type dictionaries and personal dictionaries.
                    </p>
                    <p>
                      <span role="img" aria-label="Warning!">
                        ⚠️{" "}
                      </span>
                      Language is messy. These rules use heuristics and make
                      imperfect guesses.
                    </p>
                    <div className="pb1 columns-2 columns-xs gap-4">
                      {availableRulePrettyNames
                        .slice(0, numberOfVisibleOptions)
                        .map((rule) => (
                          <RuleOptions
                            key={rule.ruleName}
                            ruleName={rule.ruleName}
                            prettyName={rule.prettyName}
                            rulesState={rulesState}
                            onChangeRuleStatus={onChangeRuleStatus}
                          />
                        ))}
                    </div>
                    <details>
                      <summary>
                        <p className="cursor-pointer color-interactive">
                          More options…
                        </p>
                      </summary>
                      <div>
                        <div className="columns-2 columns-xs gap-4 pb1">
                          {availableRulePrettyNames
                            .slice(numberOfVisibleOptions)
                            .map((rule) => (
                              <RuleOptions
                                key={rule.ruleName}
                                ruleName={rule.ruleName}
                                prettyName={rule.prettyName}
                                rulesState={rulesState}
                                onChangeRuleStatus={onChangeRuleStatus}
                              />
                            ))}
                        </div>
                        <p className="mb1 flex items-center">Advanced:</p>
                        <div className="pb3">
                          <RegexRuleSetting
                            regexRuleName={"translationMatching"}
                            regexRuleStatus={
                              rulesWithDataState.translationMatching
                            }
                            regexRuleDataValue={
                              rulesWithDataState.translationRegexText
                            }
                            entryPart={"translation"}
                            onChangeEntryRegexStatus={onChangeEntryRegexRule}
                            onChangeEntryRegexData={onChangeEntryRegex}
                            placeholder={".*(ation|cean)$"}
                          />
                          <RegexRuleSetting
                            regexRuleName={"outlineMatching"}
                            regexRuleStatus={rulesWithDataState.outlineMatching}
                            regexRuleDataValue={
                              rulesWithDataState.outlineRegexText
                            }
                            entryPart={"outline"}
                            onChangeEntryRegexStatus={onChangeEntryRegexRule}
                            onChangeEntryRegexData={onChangeEntryRegex}
                            placeholder={".*[DZ]$"}
                          />
                        </div>
                      </div>
                    </details>
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
                        to="/lessons/custom?study=practice&newWords=1&seenWords=1&retainedWords=1&startFromWord=1"
                        className="link-button dib button button--secondary"
                        style={{ lineHeight: 2 }}
                      >
                        Start generated lesson
                      </Link>
                    </p>
                    {regexRuleIgnoredButHasText && (
                      <p>
                        Note: an advanced setting is set to “ignored” but has
                        text. You can change the setting to “on” or “off” or
                        delete the text to hide this message.
                      </p>
                    )}
                    <p>
                      {customLessonMaterialValidationState === "fail" && (
                        <>
                          That combination of rule settings results in no
                          material. Try setting some rules to “ignored”.
                          {rulesState.isOneSyllable ===
                            rulesState.moreThanOneSyllable &&
                          rulesState.isOneSyllable !== "ignored"
                            ? " Change one of the syllable count settings."
                            : ""}
                          {(rulesState.isOneSyllable ===
                            rulesState.hasLongWords ||
                            rulesState.isOneSyllable ===
                              rulesState.hasLongTranslations) &&
                          rulesState.isOneSyllable !== "ignored"
                            ? " Change the one syllable or long words/translations settings."
                            : ""}
                          {rulesState.isSingleStroke ===
                            rulesState.isMultiStroke &&
                          rulesState.isSingleStroke !== "ignored"
                            ? " Change one of the stroke count settings."
                            : ""}
                        </>
                      )}
                      {customLessonMaterialValidationState === "unvalidated" &&
                        "Preview generated lesson here after building."}
                      {customLessonMaterialValidationState === "success" &&
                        `Preview generated lesson with ${
                          customLesson.presentedMaterial.length === maxItems
                            ? "max "
                            : ""
                        }${customLesson.presentedMaterial.length} item${
                          customLesson.presentedMaterial.length === 1 ? "" : "s"
                        }:`}
                    </p>
                    <div>
                      <ul>
                        {customLessonMaterialValidationState === "fail" ||
                        customLessonMaterialValidationState === "unvalidated"
                          ? undefined
                          : customLesson.presentedMaterial.map(
                              (materialItem, index: number) => (
                                <li
                                  key={`${index}-${materialItem.phrase}-${materialItem.stroke}`}
                                  className="wrap"
                                >
                                  {materialItem.phrase}{" "}
                                  <kbd className="steno-stroke steno-stroke--subtle">
                                    {materialItem.stroke}
                                  </kbd>
                                </li>
                              )
                            )}
                      </ul>
                    </div>
                    {customLessonMaterialValidationState === "success" && (
                      <Link
                        to="/lessons/custom/setup"
                        className="link-button dib button button--secondary"
                        style={{ lineHeight: 2 }}
                      >
                        Edit generated lesson
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <GeneratorHelp hideHelp={hideHelp} containerId={containerId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomLessonGenerator;

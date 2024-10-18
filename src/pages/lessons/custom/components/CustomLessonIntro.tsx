import React from "react";
import OutboundLink from "../../../../components/OutboundLink";
import { Link } from "react-router-dom";

export type CustomLessonMaterialValidationState =
  | "unvalidated"
  | "success"
  | "fail"
  | null;

type Props = {
  createCustomLesson: any;
  customLessonMaterial: any;
  customLessonMaterialValidationState: CustomLessonMaterialValidationState;
  customLessonMaterialValidationMessages: string[];
};

const CustomLessonIntro = ({
  createCustomLesson,
  customLessonMaterial,
  customLessonMaterialValidationState,
  customLessonMaterialValidationMessages,
}: Props) => {
  let validationStateStyle = "";
  let listOfValidationMessages;
  switch (customLessonMaterialValidationState) {
    case "success":
      validationStateStyle = "";
      break;
    case "fail":
      validationStateStyle = "b-danger";
      let listItemsOfValidationMessages =
        customLessonMaterialValidationMessages.map((entry: any, index: any) => {
          return <li key={index}>{entry}</li>;
        });
      listOfValidationMessages = (
        <ul
          id="customLessonMaterialValidationMessages"
          className="unstyled-list bg-danger dark:text-coolgrey-900"
        >
          {listItemsOfValidationMessages}
        </ul>
      );
      break;
    default:
      validationStateStyle = "";
  }

  return (
    <div className="p3 mx-auto mw-1024">
      <div className="flex flex-wrap justify-between">
        <div className="mw-584 mt1">
          <h3 className="mt3">Start a custom lesson</h3>
          <div>
            <p>
              To start a custom lesson, supply a list of words and their
              strokes. An easy way to create a lesson is to copy columns from a
              spreadsheet. See the&nbsp;&#8203;
              <OutboundLink
                eventLabel="community’s lessons"
                newTabAndIUnderstandTheAccessibilityImplications={true}
                to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
              >
                community’s lessons (opens in new tab)
              </OutboundLink>
              .
            </p>
            <ul id="custom-material-format" className="text-small ml1 mt0 mb3">
              <li>Each word must be on its own line.</li>
              <li>
                Each word must be separated from its hint by a “Tab” e.g.{" "}
                <span className="whitespace-pre">
                  “<kbd>{"\u0009"}</kbd>”
                </span>
                .
              </li>
              <li>
                If you skip strokes, multi-stroke words may count as misstrokes.
              </li>
            </ul>
            <label className="mb1" htmlFor="your-material">
              Enter your material here:
            </label>
            <textarea
              id="your-material"
              aria-describedby="customLessonMaterialValidationMessages"
              className={
                "input-textarea mw100 w-100 mb3 h-168 overflow-scroll " +
                validationStateStyle
              }
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="example	KP-PL
consisting of	KAOFG
examples.	KP-PLS TP-PL"
              rows={8}
              wrap="off"
              onChange={createCustomLesson}
              value={customLessonMaterial}
            ></textarea>
            {listOfValidationMessages}
            <div className="text-right">
              {customLessonMaterialValidationState === "fail" ? (
                <button
                  disabled={true}
                  className="link-button dib"
                  style={{ lineHeight: 2 }}
                >
                  Start custom lesson
                </button>
              ) : (
                <Link
                  to="/lessons/custom?study=practice&newWords=1&seenWords=1&retainedWords=1&startFromWord=1"
                  className="link-button dib text-right"
                  style={{ lineHeight: 2 }}
                >
                  Start custom lesson
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt1 mw-336 flex-grow">
          <h3 className="mt3">Community lessons</h3>
          <p className="text-balance">
            Community lessons cover topics like spacing, capitalisation,
            quotations, and using{" "}
            <span className="steno-stroke steno-stroke--subtle px05">
              SPWER
            </span>{" "}
            for “inter-” and “enter-” words. To help Typey&nbsp;Type grow even
            faster, add your custom lessons to the{" "}
            <OutboundLink
              eventLabel="community's lessons"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
            >
              community’s lessons (opens in new tab)
            </OutboundLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomLessonIntro;

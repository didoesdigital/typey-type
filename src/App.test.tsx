import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useHistory, useLocation } from "react-router-dom";
import React from "react";
import { userEvent } from "@storybook/testing-library";
import fs from "node:fs/promises";
import { SpacePlacement } from "./types";
import { useAtom } from "jotai";
import { userSettingsState } from "./states/userSettingsState";
import { globalUserSettingsState } from "./states/globalUserSettingsState";
import { useLessonIndexWithFallback } from "./states/lessonIndexState";

// Depending on environment, userEvent.type() could be so slow that keydowns have interval of more than 16ms.
// Increase this if test gets too flaky
const BUFFER_INTERVAL_MILLIS = 32;

type InputType = "dropdown" | "number";
type UserSetting = [string, any, InputType];
type Page = {
  path: string;
  expectedFirstPhrase: string;
  settings?: UserSetting[];
};
const PAGES: { [name: string]: Page } = {
  proverbsStartingWithY: {
    path: "/lessons/stories/proverbs/proverbs-starting-with-y/",
    expectedFirstPhrase: "You"
  },
  twoWordBriefsSameBeginningsToo: {
    path: "/lessons/collections/two-word-briefs-same-beginnings/too/",
    expectedFirstPhrase: "too bad"
  },
  partyTricks: {
    path: "/lessons/drills/steno-party-tricks/",
    expectedFirstPhrase: "silent",
    settings: [
      ["Limit word count", "1", "number"],
      ["Repetitions", "3", "number"],
      ["Sort", "Shortest words first", "dropdown"]
    ]
  },
  oneSyllableMultipleStrokes: {
    path: "/lessons/fundamentals/one-syllable-words-with-multiple-strokes/",
    expectedFirstPhrase: "les",
    settings: [
      ["Limit word count", "2", "number"],
      ["Repetitions", "3", "number"],
      ["Sort", "Shortest words first", "dropdown"]
    ]
  }
};

// For some reason these tooltip components cause the tests to time out.
// That's not what we're testing here so let's just mock them:
jest.mock('./components/Tooltip.tsx', () => () => {
  return <div data-testid="test-tooltip" />;
});
jest.mock("./components/InfoIconAndTooltip.tsx", () => () => {
  return <div data-testid="test-info-icon-and-tooltip" />;
});

describe(App, () => {
  let currentState: any = undefined;

  class StateLoggingApp extends App {
    render() {
      currentState = this.state;
      return super.render();
    }

    bufferIntervalMillis(): number {
      return BUFFER_INTERVAL_MILLIS;
    }
  }

  function AppWithRouterInfo() {
    const location = useLocation();
    const history = useHistory();
    const [userSettings, setUserSettings] = useAtom(userSettingsState)
    const [globalUserSettings, setGlobalUserSettings] = useAtom(globalUserSettingsState)
    const lessonIndex = useLessonIndexWithFallback()
    return <StateLoggingApp {...{
      location,
      history,
      userSettings,
      setUserSettings,
      globalUserSettings,
      setGlobalUserSettings,
      lessonIndex,
    }} />;
  }

  beforeEach(() => {
    localStorage.clear();
    currentState = undefined;
    Date.now = jest.fn(() => 1234567890123);
    window.URL.createObjectURL = jest.fn();
    global.fetch = jest.fn(async (path, options) => {
      let content = (await fs.readFile(`./public${path}`)).toString();
      return new Response(content);
    });
  });

  afterEach(() => {
    (window.URL.createObjectURL as jest.Mock).mockReset();
    jest.resetAllMocks();
  });

  describe.each([
    "spaceBeforeOutput",
    "spaceAfterOutput",
    "spaceOff",
    "spaceExact"
  ] as SpacePlacement[])("a lesson page (spacePlacement=%s)", (spacePlacement) => {
    const input = () => screen.findByTestId("your-typed-text");
    const typeIn = async (text: string) => {
      await userEvent.type(await input(), text);
      await timer(BUFFER_INTERVAL_MILLIS); // make sure buffered input is processed before next typeIn comes in
    };
    const assertText = async (text: string) =>
      await waitFor(async () => expect(await input()).toHaveValue(text));
    const assertCurrentPhrase = async (text: string) =>
      await waitFor(async () =>
        expect(await screen.findByTestId("current-phrase")).toHaveTextContent(
          text
        )
      );
    const loadPage = async ({ path, expectedFirstPhrase, settings }: Page) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppWithRouterInfo />
        </MemoryRouter>
      );
      await waitFor(async() => {
        expect(screen.getByRole("combobox", { name: "Match spaces" })).toBeInTheDocument();
      })
      await userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Match spaces" }),
        spacePlacement
      );
      for (let [name, value, type] of settings ?? []) {
        if (type === "dropdown") {
          await userEvent.selectOptions(
            screen.getByRole("combobox", { name }),
            value
          );
        } else if (type === "number") {
          const input = screen.getByRole("textbox", { name });
          await userEvent.clear(input);
          await userEvent.type(input, value);
        } else {
          throw new Error("Unknown input type: " + type);
        }
      }
      // Wait for files to be loaded
      await waitFor(async () =>
        expect(await input()).toHaveAccessibleName(
          `Write ${expectedFirstPhrase}`
        )
      );

      document.cookie = "batchUpdate=1";
    };

    function getStatsState() {
      // TODO: what else we want to check?
      return {
        currentLessonStrokes: currentState.currentLessonStrokes.map((stroke: any) => Object.fromEntries(
          Object.entries(stroke).filter(([k, v]) =>
            !["typedText"].includes(k)
          )
        )),
        ...Object.fromEntries(Object.entries(currentState).filter(([k, v]) =>
          ["totalNumberOfMatchedChars",
            "totalNumberOfNewWordsMet",
            "totalNumberOfLowExposuresSeen",
            "totalNumberOfRetainedWords",
            "totalNumberOfMistypedWords",
            "totalNumberOfHintedWords"].includes(k)))
      };
    }

    const hasExtraSpaces = ["spaceBeforeOutput", "spaceAfterOutput"].includes(spacePlacement);
    describe("lesson with `you can`", () => {
      beforeEach(async () => {
        await loadPage(PAGES.proverbsStartingWithY);
      });
      it("accepts inputs letter by letter", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);

        await assertCurrentPhrase("You");
        await assertText("");
        await typeIn(spBefore + "yo");
        await assertText(spBefore + "yo");
        await typeIn("u" + spAfter);
        await assertText("");
        await assertCurrentPhrase("can");
        const expectedFirstStroke = {
          "accuracy": true,
          "attempts": [],
          "checked": true,
          "hintWasShown": true,
          "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
          "stroke": "KPA/U",
          "time": 1234567890123,
          "word": "You"
        };
        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes": [expectedFirstStroke],
            "totalNumberOfHintedWords": 1,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 4 : 3,
            "totalNumberOfMistypedWords": 0,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
        await typeIn(spBefore + "can" + spAfter);
        await assertText("");
        await assertCurrentPhrase("lead");
        const expectedSecondStroke = {
          "accuracy": true,
          "attempts": [],
          "checked": true,
          "hintWasShown": true,
          "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.2,
          "stroke": "K",
          "time": 1234567890123,
          "word": "can"
        };
        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes": [expectedFirstStroke, expectedSecondStroke],
            "totalNumberOfHintedWords": 2,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 8 : 6,
            "totalNumberOfMistypedWords": 0,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
      // TODO: once we're happy that with the new behaviour as the permanent default, remove all the `batchUpdate`-specific branching code and tests:
      xit("accepts excess chars except for spaceAfterOutput", async () => {
        document.cookie = "batchUpdate=0";
        // This user with spaceOff setting actually puts space after
        const spBefore = spacePlacement === "spaceBeforeOutput" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" || spacePlacement === "spaceOff" ? " " : "";
        await assertCurrentPhrase("You");
        await assertText("");
        await typeIn(spBefore + "yours" + spAfter);
        await timer(100);
        if (spacePlacement === "spaceAfterOutput") {
          // spaceAfterOutput only rejects nicely currently
          await assertCurrentPhrase("You");
          await assertText("yours ");
          await typeIn("{backspace}{backspace}{backspace} ");
        } else {
          await assertCurrentPhrase("can");
          if (spacePlacement === "spaceOff") {
            await assertText("rs ");
            await typeIn("{backspace}{backspace}{backspace}");
          } else {
            await assertText("rs");
            await typeIn("{backspace}{backspace}");
          }
        }
        await assertText("");
        await assertCurrentPhrase("can");
        await typeIn(spBefore + "can" + spAfter);
        await assertCurrentPhrase("lead");
        // it was accepted ignoring extra spaces, but this user anyway input space after
        await assertText(spacePlacement === "spaceOff" ? " " : "");
        expect(getStatsState()).toEqual({
            "currentLessonStrokes": [
              {
                ...(spacePlacement === "spaceAfterOutput" ? {
                  accuracy: true, // No misstroke because you needed two strokes, "KPA/U". Fixed with batch update
                  // rejects nicely today
                  attempts: [{
                    "hintWasShown": true,
                    "numberOfMatchedWordsSoFar": 0.6,
                    "text": "yours ",
                    "time": 1234567890123
                  }]
                } : {
                  "accuracy": true,
                  "attempts": []
                }),
                "checked": true,
                "hintWasShown": true,
                "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
                "stroke": "KPA/U",
                "time": 1234567890123,
                "word": "You"
              },
              {
                ...(spacePlacement === "spaceAfterOutput" ? {
                  accuracy: true,
                  attempts: []
                } : {
                  "accuracy": false,
                  "attempts": [
                    // improperly attributes misstroke to the second word
                    {
                      "hintWasShown": true,
                      "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
                      "text": spacePlacement === "spaceOff" ? "rs " : "rs",
                      "time": 1234567890123
                    }
                  ]
                }),
                "checked": true,
                "hintWasShown": true,
                "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.2,
                "stroke": "K",
                "time": 1234567890123,
                "word": "can"
              }
            ],
            "totalNumberOfHintedWords": 2,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 8 : 6,
            // Thanks to capitalization expected for first phrase and expectation is 2 strokes, `yours {bsp}{bsp}{bsp} ` is not counted as mistyped
            "totalNumberOfMistypedWords": spacePlacement === "spaceAfterOutput" ? 0 : 1,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
      // New behavior
      it("doesn't accept excess chars", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await assertCurrentPhrase("You");
        await assertText("");
        await typeIn(spBefore + "yours" + spAfter);
        await timer(100);
        if (spacePlacement === "spaceExact") {
          await assertText("rs");
          await typeIn("{backspace}{backspace}");
        } else {
          await assertCurrentPhrase("You");
          await assertText(spBefore + "yours" + spAfter);
          if (spacePlacement === "spaceAfterOutput") {
            await typeIn("{backspace}{backspace}{backspace} ");
          } else {
            await typeIn("{backspace}{backspace}");
          }
        }
        await assertText("");
        await assertCurrentPhrase("can");
        await typeIn(spBefore + "can" + spAfter);
        await assertText("");
        await assertCurrentPhrase("lead");
        expect(getStatsState()).toEqual({
          "currentLessonStrokes": [
            {
              ...(spacePlacement === "spaceExact" ? {
                accuracy: true,
                attempts: []
              } : {
                "accuracy": false,
                // Considered no mistake because it requires two strokes, one for capitalization.
                // spaceExact accepts "yours" immediately because next word can be "rsa".
                "attempts": [{
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": spacePlacement === "spaceBeforeOutput" ? 0.8 : 0.6,
                  "text": spBefore + "yours" + spAfter,
                  "time": 1234567890123
                }]
              }),
              "checked": true,
              "hintWasShown": true,
              "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
              "stroke": "KPA/U",
              "time": 1234567890123,
              "word": "You"
            },
            {
              ...spacePlacement === "spaceExact" ? {
                "accuracy": false,
                "attempts": [{
                  text: "rs",
                  time: 1234567890123,
                  hintWasShown: true,
                  numberOfMatchedWordsSoFar: 0.6
                }]
              } : {
                "accuracy": true,
                "attempts": []
              },
              "checked": true,
              "hintWasShown": true,
              "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.2,
              "stroke": "K",
              "time": 1234567890123,
              "word": "can"
            }
          ],
          "totalNumberOfHintedWords": 2,
          "totalNumberOfLowExposuresSeen": 0,
          "totalNumberOfMatchedChars": hasExtraSpaces ? 8 : 6,
          "totalNumberOfMistypedWords": 1,
          "totalNumberOfNewWordsMet": 0,
          "totalNumberOfRetainedWords": 0
        });
      });
      it("accepts inputs at once", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await assertText("");
        // This is somewhat artificial for spaceExact. In practice, each word looks like "y" "o" and "u"
        await typeIn(`${spBefore}you${spAfter}${spBefore}can${spAfter}`);

        await assertText("");
        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes":
              [
                {
                  "accuracy": true,
                  "attempts": [],
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
                  "stroke": "KPA/U",
                  "time": 1234567890123,
                  "word": "You"
                },
                {
                  "accuracy": true,
                  "attempts": [],
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.2,
                  "stroke": "K",
                  "time": 1234567890123,
                  "word": "can"
                }
              ],
            "totalNumberOfHintedWords": 2,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 8 : 6,
            "totalNumberOfMistypedWords": 0,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
      it("accepts first word but detect misstroke in second word when input at once", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await assertText("");
        // This is somewhat artificial for spaceExact. In practice, each word looks like "y" "o" and "u"
        await typeIn(`${spBefore}you${spAfter}${spBefore}can't${spAfter}`);
        if (spacePlacement == "spaceExact") {
          await assertCurrentPhrase("lead");
          await assertText("'t");
          await typeIn("{backspace}{backspace}");
        } else {
          await assertCurrentPhrase("can");
          await assertText(spBefore + "can't" + spAfter);
          if (spacePlacement === "spaceAfterOutput") {
            await typeIn("{backspace}{backspace}{backspace} ");
          } else {
            await typeIn("{backspace}{backspace}");
          }
          await assertCurrentPhrase("lead");
        }
        await assertText("");
        await typeIn(spBefore + "lead" + spAfter);
        await assertText("");
        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes":
              [
                {
                  "accuracy": true,
                  "attempts": [],
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
                  "stroke": "KPA/U",
                  "time": 1234567890123,
                  "word": "You"
                },
                {
                  ...(spacePlacement === "spaceExact" ? {
                    accuracy: true,
                    attempts: [],
                  } : {
                    accuracy: false,
                    attempts: [{
                      hintWasShown: true,
                      numberOfMatchedWordsSoFar: spacePlacement === "spaceBeforeOutput" ? 1.6 : spacePlacement === "spaceAfterOutput" ? 1.4 : 1.2,
                      text: spBefore + "can't" + spAfter,
                      time: 1234567890123
                    }],
                  }),
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.2,
                  "stroke": "K",
                  "time": 1234567890123,
                  "word": "can"
                },
                {
                  ...spacePlacement === "spaceExact" ? {
                    accuracy: false,
                    attempts: [{
                      "hintWasShown": true,
                      "numberOfMatchedWordsSoFar": 1.2,
                      "text": "'t",
                      "time": 1234567890123
                    }]
                  } : {
                    "accuracy": true,
                    "attempts": []
                  },
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 2.6 : 2,
                  "stroke": "HRAED",
                  "time": 1234567890123,
                  "word": "lead"
                }
              ],
            "totalNumberOfHintedWords": 3,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 13 : 10,
            "totalNumberOfMistypedWords": 1,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
    });
    describe("lesson with `too bad`", () => {
      beforeEach(async () => {
        await loadPage(PAGES.twoWordBriefsSameBeginningsToo);
      });
      it("accepts inputs at once", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await assertText("");
        // This is somewhat artificial for spaceExact. In practice, each word looks like "y" "o" and "u"
        await typeIn(`${spBefore}too bads${spAfter}`);

        if (spacePlacement === "spaceExact") {
          await assertText(`s`);
          await typeIn("{backspace}");
        } else {
          await assertText(`${spBefore}too bads${spAfter}`);
          if (spacePlacement === "spaceAfterOutput") {
            await typeIn("{backspace}{backspace} ");
          } else {
            await typeIn("{backspace}");
          }
        }
        await assertText("");
        await typeIn(`${spBefore}too far${spAfter}`);
        await assertText("");

        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes":
              [
                {
                ...(spacePlacement === "spaceExact" ? {accuracy: true, attempts: []} : {
                  "accuracy": false,
                  "attempts": [{
                    "hintWasShown": true,
                    "numberOfMatchedWordsSoFar": spacePlacement === "spaceBeforeOutput"? 1.6 :1.4,
                    "text": spBefore+"too bads"+spAfter,
                    "time": 1234567890123
                  }],
                }),
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.6 : 1.4,
                  "stroke": "TAOBD",
                  "time": 1234567890123,
                  "word": "too bad"
                },
                {
                  ...spacePlacement === "spaceExact" ? {
                    // s was considered input to second
                    accuracy: false,
                    attempts: [{
                      "hintWasShown": true,
                      "numberOfMatchedWordsSoFar": 1.4,
                      "text": "s",
                      "time": 1234567890123
                    }]
                  } : {
                    "accuracy": true,
                    "attempts": []
                  },
                  "checked": true,
                  "hintWasShown": true,
                  "numberOfMatchedWordsSoFar": hasExtraSpaces ? 3.2 : 2.8,
                  "stroke": "TAOFR",
                  "time": 1234567890123,
                  "word": "too far"
                }
              ],
            "totalNumberOfHintedWords": 2,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 16 : 14,
            "totalNumberOfMistypedWords": 1,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
    });
    describe("lesson with `silent`", () => {
      beforeEach(async () => {
        await loadPage(PAGES.partyTricks);
      });
      // TODO: once we're happy that this will be the permanent new default behaviour, remove all the `batchUpdate`-specific branching code and tests:
      // it.each([1, 0])("records interim strokes for correct phrase (batchUpdate=%s)", async (batchUpdate) => {
      it.each([1])("records interim strokes for correct phrase (batchUpdate=%s)", async (batchUpdate) => {
        document.cookie = `batchUpdate=${batchUpdate}`;
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await typeIn(spBefore + "sigh" + spAfter);
        const leapt = spBefore + "leapt" + spAfter;
        await typeIn(leapt);
        await assertText(spBefore + "sigh" + spAfter + spBefore + "leapt" + spAfter);
        await typeIn("{backspace}".repeat(leapt.length));
        if (spacePlacement === "spaceAfterOutput") {
          await typeIn("{backspace}{backspace}{backspace}lent" + spAfter);
        } else {
          await typeIn(`{backspace}{backspace}lent` + spAfter);
        }

        await assertText("");
        await typeIn(`${spBefore}sigh${spAfter}`);
        if (spacePlacement === "spaceAfterOutput") {
          await typeIn("{backspace}{backspace}{backspace}lent" + spAfter);
        } else {
          await typeIn(`{backspace}{backspace}lent` + spAfter);
        }
        await assertText("");
        expect(getStatsState()).toEqual(
          {
            "currentLessonStrokes": [
              {
                "accuracy": true,
                "attempts": [
                  {
                    "hintWasShown": true,
                    "numberOfMatchedWordsSoFar": spacePlacement === "spaceBeforeOutput" ? 0.6 : 0.4,
                    "text": spBefore + "sigh" + spAfter + spBefore + "leapt" + spAfter,
                    "time": 1234567890123
                  }
                ],
                "checked": true,
                "hintWasShown": true,
                "numberOfMatchedWordsSoFar": hasExtraSpaces ? 1.4 : 1.2,
                "stroke": "SAOEU/HREPBT",
                "time": 1234567890123,
                "word": "silent"
              },
              {
                "accuracy": true,
                "attempts": [
                  {
                    "hintWasShown": true,
                    "numberOfMatchedWordsSoFar": spacePlacement === "spaceBeforeOutput" ? 2 : spacePlacement === "spaceAfterOutput" ? 1.8 : 1.6,
                    "text": spBefore + "sigh" + spAfter,
                    "time": 1234567890123
                  }
                ],
                "checked": true,
                "hintWasShown": true,
                "numberOfMatchedWordsSoFar": hasExtraSpaces ? 2.8 : 2.4,
                "stroke": "SAOEU/HREPBT",
                "time": 1234567890123,
                "word": "silent"
              }
            ],
            "totalNumberOfHintedWords": 2,
            "totalNumberOfLowExposuresSeen": 0,
            "totalNumberOfMatchedChars": hasExtraSpaces ? 14 : 12,
            "totalNumberOfMistypedWords": 0,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
    });
    describe("lesson with `les`", () => {
      beforeEach(async () => {
        await loadPage(PAGES.oneSyllableMultipleStrokes);
      });
      it("doesn't count 'less{bs}' as misstroke", async () => {
        const { spBefore, spAfter } = getSpacer(spacePlacement);
        await assertCurrentPhrase("les");
        await assertText("");
        await typeIn(spBefore + "less" + spAfter);
        if (spacePlacement === "spaceExact") {
          await assertText("s");
          await typeIn("{backspace}");
        } else {
          await assertText(spBefore + "less" + spAfter);
          if (spacePlacement === "spaceAfterOutput") {
            await typeIn("{backspace}{backspace} ");
          } else {
            await typeIn("{backspace}");
          }
        }
        await assertText("");
        await typeIn(spBefore + "asp" + spAfter);
        await assertText("");
        expect(getStatsState()).toEqual({
          currentLessonStrokes: [
            {
              accuracy: true,
              attempts: spacePlacement === "spaceExact" ? [] : [
                {
                  text: spBefore + "less" + spAfter,
                  time: 1234567890123,
                  numberOfMatchedWordsSoFar: spacePlacement === "spaceBeforeOutput" ? 0.8 : 0.6,
                  hintWasShown: true
                }
              ],
              checked: true,
              hintWasShown: true,
              numberOfMatchedWordsSoFar: hasExtraSpaces ? 0.8 : 0.6,
              stroke: "HRE/-S",
              time: 1234567890123,
              word: "les"
            },
            {
              accuracy: true,
              attempts: spacePlacement === "spaceExact" ? [
                {
                  text: "s",
                  time: 1234567890123,
                  numberOfMatchedWordsSoFar: 0.6,
                  hintWasShown: true
                }
              ] : [],
              checked: true,
              hintWasShown: true,
              numberOfMatchedWordsSoFar: hasExtraSpaces ? 1.6 : 1.2,
              stroke: "AS/-P",
              time: 1234567890123,
              word: "asp"
            }
          ],
          totalNumberOfHintedWords: 2,
          totalNumberOfLowExposuresSeen: 0,
          totalNumberOfMatchedChars: hasExtraSpaces ? 8 : 6,
          totalNumberOfMistypedWords: 0,
          totalNumberOfNewWordsMet: 0,
          totalNumberOfRetainedWords: 0
        });
      });
    });
  });
});

async function timer(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSpacer(spacePlacement: SpacePlacement) {
  // This user with spaceOff setting actually puts space before
  return {
    spBefore: spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff"
      ? " "
      : "",
    spAfter: spacePlacement === "spaceAfterOutput" ? " " : ""
  };
}

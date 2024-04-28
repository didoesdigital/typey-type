import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useHistory, useLocation } from "react-router-dom";
import React from "react";
import { userEvent } from "@storybook/testing-library";
import { promises as fs } from "node:fs";
import { SpacePlacement } from "./types";

type Page = { path: string, expectedFirstPhrase: string };
const PAGES: { [name: string]: Page } = {
  provebsStartingWithY: {
    path: "/lessons/stories/proverbs/proverbs-starting-with-y/",
    expectedFirstPhrase: "You"
  },
  twoWordBriefsSameBeginningsToo: {
    path: "/lessons/collections/two-word-briefs-same-beginnings/too/",
    expectedFirstPhrase: "too bad"
  }
};

describe(App, () => {
  let currentState: any = undefined;

  class StateLoggingApp extends App {
    render() {
      currentState = this.state;
      return super.render();
    }
  }

  function AppWithRouterInfo() {
    const location = useLocation();
    const history = useHistory();
    return <StateLoggingApp location={location} history={history} />;
  }

  beforeEach(() => {
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
    const typeIn = async (text: string) => userEvent.type(await input(), text);
    const assertText = async (text: string) =>
      await waitFor(async () => expect(await input()).toHaveValue(text));
    const assertCurrentPhrase = async (text: string) =>
      await waitFor(async () =>
        expect(await screen.findByTestId("current-phrase")).toHaveTextContent(
          text
        )
      );
    const loadPage = async ({ path, expectedFirstPhrase }: Page) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppWithRouterInfo />
        </MemoryRouter>
      );
      // Wait for files to be loaded
      await waitFor(async () =>
        expect(await input()).toHaveAccessibleName(`Write ${expectedFirstPhrase}`)
      );
      await userEvent.selectOptions(screen.getByRole("combobox", { name: "Match spaces" }), spacePlacement);
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
        await loadPage(PAGES.provebsStartingWithY);
      });
      it("accepts inputs letter by letter", async () => {
        // This user with spaceOff setting actually puts space before
        const spBefore = spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" ? " " : "";

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
      // Current behavior
      it("accepts excess chars except for spaceAfterOutput", async () => {
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
                "accuracy": true,
                "attempts": spacePlacement === "spaceAfterOutput" ?
                  // rejects nicely
                  [{
                    "hintWasShown": true,
                    "numberOfMatchedWordsSoFar": 0.6,
                    "text": "yours ",
                    "time": 1234567890123
                  }]
                  : [],
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
      // Future behavior
      it("doesn't accept excess chars", async () => {
        // This user with spaceOff setting actually puts space before
        const spBefore = spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" ? " " : "";
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
              "accuracy": true,
              // Considered no mistake because it requires two strokes, one for capitalization.
              // spaceExact accepts "yours" immediately because next word can be "rsa".
              "attempts": [],
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
          "totalNumberOfMistypedWords": spacePlacement === "spaceExact" ? 1 : 0,
          "totalNumberOfNewWordsMet": 0,
          "totalNumberOfRetainedWords": 0
        });
      });
      it("accepts inputs at once", async () => {
        // This user with spaceOff setting actually puts space before
        const spBefore = spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" ? " " : "";
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
        // This user with spaceOff setting actually puts space before
        const spBefore = spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" ? " " : "";
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
                  accuracy: true,
                  attempts: [],
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
            "totalNumberOfMistypedWords": spacePlacement === "spaceExact" ? 1 : 0,
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
        // This user with spaceOff setting actually puts space before
        const spBefore = spacePlacement === "spaceBeforeOutput" || spacePlacement === "spaceOff" ? " " : "";
        const spAfter = spacePlacement === "spaceAfterOutput" ? " " : "";
        await assertText("");
        // This is somewhat artificial for spaceExact. In practice, each word looks like "y" "o" and "u"
        await typeIn(`${spBefore}too bads${spAfter}`);

        await assertText(`${spBefore}too bads${spAfter}`);
        if (spacePlacement === "spaceAfterOutput") {
          await typeIn("{backspace}{backspace} ");
        } else {
          await typeIn("{backspace}");
        }
        await assertText("");
        await typeIn(`${spBefore}too far${spAfter}`);
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
            "totalNumberOfMistypedWords": spacePlacement === "spaceExact" ? 1 : 0,
            "totalNumberOfNewWordsMet": 0,
            "totalNumberOfRetainedWords": 0
          }
        );
      });
    });
  });
});

async function timer(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

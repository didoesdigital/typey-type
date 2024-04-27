import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useHistory, useLocation } from "react-router-dom";
import React from "react";
import { userEvent } from "@storybook/testing-library";
import { promises as fs } from "node:fs";
import Mock = jest.Mock;
import { SpacePlacement } from "./types";

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
    beforeEach(async () => {
      render(
        <MemoryRouter
          initialEntries={[
            "/lessons/stories/proverbs/proverbs-starting-with-y/"
          ]}
        >
          <AppWithRouterInfo />
        </MemoryRouter>
      );
      // Wait for files to be loaded
      await waitFor(async () =>
        expect(await input()).toHaveAccessibleName("Write You")
      );
      await userEvent.selectOptions(screen.getByRole("combobox", { name: "Match spaces" }), spacePlacement);
      expect(
        screen.getByTestId("current-and-upcoming-phrases").textContent!.trim().replace("​", "")
      ).toMatchInlineSnapshot(
        `"You can lead a horse to water but you can't make it drink. You can't have it both ways. You can't have your cake and eat it too. You can't make an omelette without breaking eggs. You can't make a silk purse out of a You can lead a horse to water but you can't make it drink. You can't have it both ways. You can't have your cake and eat it too. You can't make an omelette without breaking eggs. You can't make a silk purse out of a You can lead a horse to water but you can't make it drink. You can't have it both ways. You can't have your cake and eat it too. You can't make an omelette without breaking eggs. You can't make a silk purse out of a"`
      );
    });

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
    it("accepts excess chars", async () => {
      // This user with spaceOff setting actually puts space after
      const spBefore = spacePlacement === "spaceBeforeOutput" ? " " : "";
      const spAfter = spacePlacement === "spaceAfterOutput" || spacePlacement === "spaceOff" ? " " : "";
      await assertCurrentPhrase("You");
      await assertText("");
      await typeIn(spBefore + "yours" + spAfter);
      await timer(100);
      if (spacePlacement === "spaceAfterOutput") {
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
      expect(getStatsState()).toEqual({
          "currentLessonStrokes": [
            {
              "accuracy": true,
              "attempts": spacePlacement === "spaceAfterOutput" ?
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
            }
          ],
          "totalNumberOfHintedWords": 1,
          "totalNumberOfLowExposuresSeen": 0,
          "totalNumberOfMatchedChars": hasExtraSpaces ? 4 : 3,
          "totalNumberOfMistypedWords": 0,
          "totalNumberOfNewWordsMet": 0,
          "totalNumberOfRetainedWords": 0
        }
      );
    });
    // Future behavior
    it.skip("doesn't accept excess chars", async () => {
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
      expect(getStatsState()).toEqual({
        "currentLessonStrokes": [
          {
            "accuracy": true,
            "attempts": [],
            "checked": true,
            "hintWasShown": true,
            "numberOfMatchedWordsSoFar": hasExtraSpaces ? 0.8 : 0.6,
            "stroke": "KPA/U",
            "time": 1234567890123,
            "word": "You"
          }
        ],
        "totalNumberOfHintedWords": 1,
        "totalNumberOfLowExposuresSeen": 0,
        "totalNumberOfMatchedChars": hasExtraSpaces ? 4 : 3,
        "totalNumberOfMistypedWords": 0,
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
  });
});

async function timer(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

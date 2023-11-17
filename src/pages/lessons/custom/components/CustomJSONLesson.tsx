import React, { useCallback, useState } from "react";
import PseudoContentButton from "../../../../components/PseudoContentButton";
import CustomLessonFormattedCode from "./CustomLessonFormattedCode";

const convertDictionaryToLesson = (text: string) => {
  let newLesson = "";

  try {
    const parsedJSON = JSON.parse(text);

    if (parsedJSON.constructor !== {}.constructor) {
      throw new Error("This JSON does not contain an object.");
    }

    const parsedJSONKeys = Object.keys(parsedJSON);

    if (parsedJSONKeys.length < 1) {
      throw new Error("This dictionary is empty.");
    }

    if (parsedJSON && typeof parsedJSON === "object") {
      newLesson = Object.entries(parsedJSON)
        .map(([outline, translation]) => `${translation}	${outline}`)
        .join("\n");
    }
  } catch (error) {
    console.warn(error);
  }
  return newLesson;
};

const CustomJSONLesson = () => {
  const [dictionaryConvertedToLesson, setDictionaryConvertedToLesson] =
    useState("");

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
      if (event?.target?.value) {
        setDictionaryConvertedToLesson(
          convertDictionaryToLesson(event.target.value)
        );
      }
    }, []);

  return (
    <div className="p3 mx-auto mw-1024">
      <h3>Convert JSON to Typey Type lesson</h3>
      <div className="gtc-4fr-3fr">
        <div>
          <label className="mb1" htmlFor="your-dictionary-entries-to-convert">
            Paste a JSON dictionary here to create a custom lesson:
          </label>
          <textarea
            id="your-dictionary-entries-to-convert"
            className="input-textarea mw100 w-100 mb1 overflow-scroll"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder='{
"TEFT": "hello",
"TEFTD": "world"
}'
            rows={8}
            wrap="off"
            onChange={handleTextChange}
          ></textarea>
        </div>
        <div>
          <CustomLessonFormattedCode
            id="js-converted-dictionary-entries"
            filled={dictionaryConvertedToLesson.length > 0}
          >
            {dictionaryConvertedToLesson}
          </CustomLessonFormattedCode>
          <PseudoContentButton
            className="js-clipboard-button link-button copy-to-clipboard"
            style={{
              minHeight: "2.5rem",
              whiteSpace: "normal",
              height: "initial",
            }}
            dataClipboardTarget="#js-converted-dictionary-entries"
          >
            Copy converted dictionary to clipboard
          </PseudoContentButton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomJSONLesson);

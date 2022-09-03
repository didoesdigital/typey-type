import React from "react";
import PseudoContentButton from "../../components/PseudoContentButton";

type Props = {
  customLessonWordsAndStrokes: { phrase: string; stroke: string }[];
  dictionaryEntries: any;
  handleWordListTextAreaChange: any;
};

const CustomWordListLesson = ({
  customLessonWordsAndStrokes,
  dictionaryEntries,
  handleWordListTextAreaChange,
}: Props) => {
  return (
    <div className="p3 mx-auto mw-1024">
      <h3>Create a lesson using a word list</h3>
      <div className="gtc-4fr-3fr">
        <div>
          <label className="mb1" htmlFor="your-words-for-dictionary-entries">
            Paste a word list without strokes here to create a custom lesson
            (using Plover theory by default):
          </label>
          <textarea
            id="your-words-for-dictionary-entries"
            className="input-textarea mw100 w-100 mb1 overflow-scroll"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="capitalise
excluded
plover"
            rows={8}
            wrap="off"
            onChange={handleWordListTextAreaChange}
          ></textarea>
        </div>
        <div>
          <pre
            id="js-custom-lesson-dictionary-entries"
            className={`${
              customLessonWordsAndStrokes.length > 0 ? "quote " : ""
            }h-168 overflow-scroll mw-384 mt1 mb3`}
          >
            <code>{dictionaryEntries}</code>
          </pre>
          <PseudoContentButton
            className="js-clipboard-button link-button copy-to-clipboard"
            dataClipboardTarget="#js-custom-lesson-dictionary-entries"
            style={{
              minHeight: "2.5rem",
              whiteSpace: "normal",
              height: "initial",
            }}
          >
            Copy custom lesson to clipboard
          </PseudoContentButton>
        </div>
      </div>
    </div>
  );
};

export default CustomWordListLesson;

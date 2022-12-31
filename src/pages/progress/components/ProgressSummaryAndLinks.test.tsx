import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";
import metWords10000WordsSeen10000Memorised from "../../../fixtures/metWords10000WordsSeen10000Memorised.json";

describe("progress summary and links", () => {
  it("renders", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <ProgressSummaryAndLinks
            metWords={metWordsNovice}
            restartConfetti={() => undefined}
            yourMemorisedWordCount={1}
            yourSeenWordCount={1}
          />
        </Route>
      </Router>
    );
    const textElement = screen.getByText(/successfully typed/i);
    expect(textElement).toBeInTheDocument();
  });

  it("celebrates finishing Typey Type", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <ProgressSummaryAndLinks
            metWords={metWords10000WordsSeen10000Memorised}
            restartConfetti={() => undefined}
            yourMemorisedWordCount={10000}
            yourSeenWordCount={10000}
          />
        </Route>
      </Router>
    );
    const textElement = screen.getByText(/You rock!/i);
    expect(textElement).toBeInTheDocument();
  });

  it("hides Discover link when Typey Type is finished", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={metWords10000WordsSeen10000Memorised}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={10000}
              yourSeenWordCount={10000}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByText(/Practice/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent(
      "Discover"
    );
  });

  it("hides Drill link when there are no memorised words yet", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={metWordsNovice}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={0}
              yourSeenWordCount={10}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByText(/Revise/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent("Drill");
  });

  it("has 1 seen and 0 memorised", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={{ "one": 1 }}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={0}
              yourSeenWordCount={1}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent(
      "Practice"
    );
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent("Drill");
    expect(screen.getByText(/Revise/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });

  it("has 1 seen and 1 memorised", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={{ "one": 1, "two": 30 }}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={1}
              yourSeenWordCount={1}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent(
      "Practice"
    );
    expect(screen.getByText(/Drill/i)).toBeInTheDocument();
    expect(screen.getByText(/Revise/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });

  it("has 0 seen and 1 memorised", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={{ "memorised": 30 }}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={30}
              yourSeenWordCount={0}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent(
      "Practice"
    );
    expect(screen.getByText(/Drill/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-wrapper")).not.toHaveTextContent("Revise");
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });

  it("has 10 seen and 1 memorised", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <div data-testid="test-wrapper">
            <ProgressSummaryAndLinks
              metWords={{
                "seen1": 1,
                "seen2": 1,
                "seen3": 1,
                "seen4": 1,
                "seen5": 1,
                "seen6": 1,
                "seen7": 1,
                "seen8": 1,
                "seen9": 1,
                "seen10": 1,
                "memorised": 30,
              }}
              restartConfetti={() => undefined}
              yourMemorisedWordCount={1}
              yourSeenWordCount={10}
            />
          </div>
        </Route>
      </Router>
    );

    expect(screen.getByText(/Practice/i)).toBeInTheDocument();
    expect(screen.getByText(/Drill/i)).toBeInTheDocument();
    expect(screen.getByText(/Revise/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });
});

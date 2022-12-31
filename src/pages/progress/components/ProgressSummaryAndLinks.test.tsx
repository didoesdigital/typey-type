import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";

describe("progress summary and links", () => {
  it("renders", () => {
    render(
      <Router basename="/typey-type">
        <Route>
          <ProgressSummaryAndLinks
            yourMemorisedWordCount={1}
            yourSeenWordCount={1}
            yourWordCount={2}
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
            yourMemorisedWordCount={10000}
            yourSeenWordCount={10000}
            yourWordCount={20000}
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
              yourMemorisedWordCount={10000}
              yourSeenWordCount={10000}
              yourWordCount={20000}
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
});

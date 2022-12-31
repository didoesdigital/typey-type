import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";

test("renders progress summary and links", () => {
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

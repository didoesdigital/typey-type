import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";

test("renders progress summary and links", () => {
  render(
    <ProgressSummaryAndLinks
      yourMemorisedWordCount={1}
      yourSeenWordCount={1}
      yourWordCount={2}
    />
  );
  const linkElement = screen.getByText(/test progress summary and links/i);
  expect(linkElement).toBeInTheDocument();
});

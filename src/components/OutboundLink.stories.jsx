import React from "react";
import OutboundLink from "./OutboundLink";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/OutboundLink",
  component: OutboundLink,
};

const Template = (args) => {
  const { children, ...propArgs } = args;

  return (
    <OutboundLink
      aria-label="example"
      eventLabel="example"
      to="https://joshuagrams.github.io/steno-jig/"
      {...propArgs}
    >
      {children}
    </OutboundLink>
  );
};

export const OutboundLinkStory = Template.bind({});
OutboundLinkStory.args = {
  children: "Stenojig (external link opens in new tab)",
  "aria-label": "Stenojig (external link opens in new tab)",
  eventLabel: "Stenojig (external link opens in new tab)",
  to: "https://joshuagrams.github.io/steno-jig/",
};

export const OutboundLinkEverythingStory = Template.bind({});
OutboundLinkEverythingStory.args = {
  "aria-label": "Type Racer (external link opens in new tab)",
  children: <strong>Type Racer</strong>,
  className: "no-underline",
  eventLabel: "Type Racer (external link opens in new tab)",
  onClick: (event) => console.log(`Clicked: ${event.target}`),
  style: { lineHeight: 2 },
  to: "https://play.typeracer.com/?universe=steno",
};

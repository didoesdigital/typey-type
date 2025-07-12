import React from "react";
import OutboundLink from "./OutboundLink";

export default {
  title: "Components/OutboundLink",
  component: OutboundLink,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
OutboundLinkStory.args = {
  children: "Stenojig (external link opens in new tab)",
  "aria-label": "Stenojig (external link opens in new tab)",
  eventLabel: "Stenojig (external link opens in new tab)",
  to: "https://joshuagrams.github.io/steno-jig/",
};

export const OutboundLinkEverythingStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
OutboundLinkEverythingStory.args = {
  "aria-label": "Type Racer (external link opens in new tab)",
  children: <strong>Type Racer</strong>,
  className: "no-underline",
  eventLabel: "Type Racer (external link opens in new tab)",
  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  onClick: (event) => console.log(`Clicked: ${event.target}`),
  style: { lineHeight: 2 },
  to: "https://play.typeracer.com/?universe=steno",
};

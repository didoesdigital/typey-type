import React from "react";
import OutboundLink from "./OutboundLink";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/OutboundLink",
  component: OutboundLink,
};

const Template = (args) => {
  const { children, newArgs } = args;
  console.log(children);
  return (
    <OutboundLink
      eventLabel="example"
      className="no-underline"
      to="https://joshuagrams.github.io/steno-jig/"
      target="_blank"
      rel="noopener noreferrer"
      {...newArgs}
    >
      {children}
    </OutboundLink>
  );
};

export const OutboundLinkStory = Template.bind({});
OutboundLinkStory.args = {
  children: <strong>Stenojig (external link opens in new tab)</strong>,
  className: "no-underline",
  eventLabel: "Stenojig (external link opens in new tab)",
  to: "https://joshuagrams.github.io/steno-jig/",
  target: "_blank",
  rel: "noopener noreferrer",
};

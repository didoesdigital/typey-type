import React from "react";
import OutboundLink from "./OutboundLink";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OutboundLink> = {
  title: "Components/OutboundLink",
  component: OutboundLink,
};

export default meta;

type Story = StoryObj<typeof OutboundLink>;

export const OutboundLinkStory: Story = {
  args: {
    children: "Stenojig (external link opens in new tab)",
    "aria-label": "Stenojig (external link opens in new tab)",
    eventLabel: "Stenojig (external link opens in new tab)",
    to: "https://joshuagrams.github.io/steno-jig/",
  },
};

export const OutboundLinkEverythingStory: Story = {
  args: {
    "aria-label": "Type Racer (external link opens in new tab)",
    children: <strong>Type Racer</strong>,
    className: "no-underline",
    eventLabel: "Type Racer (external link opens in new tab)",
    onClick: (event) => console.log(`Clicked: ${event.target}`),
    style: { lineHeight: 2 },
    to: "https://play.typeracer.com/?universe=steno",
  },
};

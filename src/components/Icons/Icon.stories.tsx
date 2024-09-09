import React from "react";
import Icon from "./Icon";
import ClosingCross from "./icon-images/ClosingCross.svg";
import "./Icon.stories.scss";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const ClosingCrossIconStory: Story = {
  args: {
    iconSVGImport: ClosingCross,
  },
};

export const MultipleIcons: Story = {
  args: {
    ...ClosingCrossIconStory.args,
  },
  render: (args) => {
    return (
      <div>
        <Icon {...args} />
        <Icon {...args} />
      </div>
    );
  },
};

export const Colors: Story = {
  args: {
    ...ClosingCrossIconStory.args,
    color: "#ff1493",
  },
};

const buttonStyles: React.CSSProperties = {
  padding: "8px 12px",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

export const Sizes: Story = {
  args: {
    ...ClosingCrossIconStory.args,
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          "flexDirection": "column",
          "gap": "16px",
        }}
      >
        <button style={buttonStyles} aria-label="Icon-only button">
          <Icon {...args} width={"12px"} height={"12px"} />
        </button>
        <button style={buttonStyles}>
          <Icon {...args} width={"12px"} height={"12px"} /> Label
        </button>
        <button style={{ ...buttonStyles, fontSize: "32px" }}>
          Label <Icon {...args} width={"0.5em"} height={"0.5em"} />
        </button>
        <button style={{ ...buttonStyles, fontSize: "2.5em" }}>
          Label <Icon {...args} width={"1.5em"} height={"1.5em"} />
        </button>
        <Icon {...args} width={"3em"} height={"3em"} />
      </div>
    );
  },
};

/** For an icon-only button, use `aria-label="Example action label"` on the button */
export const IconOnlyButton: Story = {
  args: {
    ...ClosingCrossIconStory.args,
  },
  render: (args) => {
    return (
      <button style={buttonStyles} aria-label="Icon-only button">
        <Icon {...args} width={"44px"} height={"44px"} />
      </button>
    );
  },
};

/** Using a custom color on an icon in a button will override hover/focus/active styles. You can use `currentColor` to make it match the parent button hover/focus/active styles. */
export const ButtonWithCustomColor: Story = {
  args: {
    ...ClosingCrossIconStory.args,
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          "flexDirection": "column",
          "gap": "16px",
        }}
      >
        <button style={buttonStyles}>
          <Icon {...args} width={"12px"} height={"12px"} color="#ff1493" /> No
          hover color
        </button>
        <button style={buttonStyles} className="test-button">
          <Icon {...args} width={"12px"} height={"12px"} color="currentColor" />{" "}
          currentColor
        </button>
        <button style={buttonStyles} aria-label="Icon-only button">
          <Icon {...args} width={"44px"} height={"44px"} color="#ff1493" />
        </button>
      </div>
    );
  },
};

import React from "react";
import GoogleAnalytics from "react-ga";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";

type Props = {
  setAnnouncementMessage: () => void;
};

const CustomShareLessons = ({ setAnnouncementMessage }: Props) => {
  return (
    <div className="p3 mx-auto mw-1024">
      <div className="text-center">
        <h3>Share your lessons</h3>
        <p className="mb0">
          To help Typey Type grow even faster, add to the{" "}
          <GoogleAnalytics.OutboundLink
            aria-label="Community’s lessons (external link opens in new tab)"
            eventLabel="community’s lessons"
            to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            community’s lessons
            {/* @ts-ignore */}
            <Tooltip
              title="Opens in a new tab"
              animation="shift"
              arrow="true"
              className=""
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital"
              trigger="mouseenter focus click"
              onShow={setAnnouncementMessage}
            >
              <IconExternal
                ariaHidden="true"
                role="presentation"
                iconWidth="24"
                iconHeight="24"
                className="ml1 svg-icon-wrapper svg-baseline"
                iconTitle=""
              />
            </Tooltip>
          </GoogleAnalytics.OutboundLink>
          .
        </p>
        <GoogleAnalytics.OutboundLink
          aria-label="Community’s lessons (external link opens in new tab)"
          eventLabel="Community’s lessons"
          to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="link-button dib mt3"
          style={{ lineHeight: 2 }}
        >
          Community’s lessons
          {/* @ts-ignore */}
          <Tooltip
            title="Opens in a new tab"
            animation="shift"
            arrow="true"
            className=""
            duration="200"
            tabIndex="0"
            tag="span"
            theme="didoesdigital"
            trigger="mouseenter focus click"
            onShow={setAnnouncementMessage}
          >
            <IconExternal
              ariaHidden="true"
              role="presentation"
              iconWidth="24"
              iconHeight="24"
              className="ml1 svg-icon-wrapper svg-baseline"
              iconTitle=""
            />
          </Tooltip>
        </GoogleAnalytics.OutboundLink>
      </div>
    </div>
  );
};

export default CustomShareLessons;

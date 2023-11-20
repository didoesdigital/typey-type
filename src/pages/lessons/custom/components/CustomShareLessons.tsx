import React from "react";
import OutboundLink from "../../../../components/OutboundLink";
import { IconExternal } from "../../../../components/Icon";
import { Tooltip } from "react-tippy";
import useAnnounceTooltip from "../../../../components/Announcer/useAnnounceTooltip";

const CustomShareLessons = () => {
  const announceTooltip = useAnnounceTooltip();
  return (
    <div className="p3 mx-auto mw-1024">
      <div className="text-center">
        <h3>Share your lessons</h3>
        <p className="mb0">
          To help Typey Type grow even faster, add to the{" "}
          <OutboundLink
            aria-label="Community’s lessons (external link opens in new tab)"
            eventLabel="community’s lessons"
            to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
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
              onShow={announceTooltip}
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
          </OutboundLink>
          .
        </p>
        <OutboundLink
          aria-label="Community’s lessons (external link opens in new tab)"
          eventLabel="Community’s lessons"
          to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
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
            onShow={announceTooltip}
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
        </OutboundLink>
      </div>
    </div>
  );
};

export default CustomShareLessons;

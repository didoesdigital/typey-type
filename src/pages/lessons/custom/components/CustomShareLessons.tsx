import React from "react";
import OutboundLink from "../../../../components/OutboundLink";

const CustomShareLessons = () => {
  return (
    <div className="p3 mx-auto mw-1024">
      <div className="text-center">
        <h3>Share your lessons</h3>
        <p className="mb0">
          To help Typey Type grow even faster, add to the{" "}
          <OutboundLink
            eventLabel="community’s lessons"
            newTabAndIUnderstandTheAccessibilityImplications={true}
            to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
          >
            community’s lessons (opens in new tab)
          </OutboundLink>
          .
        </p>
        <OutboundLink
          eventLabel="Community’s lessons"
          newTabAndIUnderstandTheAccessibilityImplications={true}
          to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
          className="link-button dib mt3"
          style={{ lineHeight: 2 }}
        >
          Community’s lessons
        </OutboundLink>
      </div>
    </div>
  );
};

export default CustomShareLessons;

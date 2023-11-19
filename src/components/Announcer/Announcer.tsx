import React from "react";
import { useAnnouncerData } from "./useAnnouncer";

const Announcer = () => {
  const { message } = useAnnouncerData();
  return (
    <div className="visually-hidden" aria-live="assertive" aria-atomic="true">
      {message}
    </div>
  );
};

export default Announcer;

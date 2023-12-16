import React, { useEffect, useState } from "react";
import ClosingCross from "./Icons/icon-images/ClosingCross.svg";
import Icon from "./Icons/Icon";

type Props = {
  children: React.ReactNode;
  onDismiss?: () => void;
};

const Notification = ({ onDismiss, children }: Props) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (!showNotification && onDismiss) {
      onDismiss();
    }
  }, [showNotification, onDismiss]);

  function handleDismiss() {
    setShowNotification(false);
  }

  return (
    <div>
      {showNotification ? (
        <div className="notification notification--global fixed w-100 flex wrap justify-between pa1 p1 p3 pa3 items-center bg-danger dark:text-coolgrey-900">
          <div className="notification__message">{children}</div>
          <button
            className="de-emphasized-button flex items-center justify-center p1"
            aria-label="Dismiss notification"
            onClick={handleDismiss.bind(this)}
          >
            <Icon iconSVGImport={ClosingCross} width="1em" height="1em" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;

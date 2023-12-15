import React, { useEffect, useState } from "react";
import { IconClosingCross } from "./Icon";

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
          <div onClick={handleDismiss.bind(this)}>
            <IconClosingCross
              role="img"
              iconWidth="24"
              iconHeight="24"
              className="ml1 svg-icon-wrapper svg-baseline"
              iconTitle="Dismiss notification"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;

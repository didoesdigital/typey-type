import React from "react";
import * as Sentry from "@sentry/browser";
import PageLoadingFailed from "./PageLoadingFailed";
import PageLoadingPastDelay from "./PageLoadingPastDelay";

const PageLoading = (props: any): JSX.Element | null => {
  if (props.error) {
    // When the loader has errored
    Sentry.captureException(props.error);
    return <PageLoadingFailed />;
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div>
        Taking a long time… <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <PageLoadingPastDelay />;
  } else {
    // When the loader has just started
    return null;
  }
};

export default PageLoading;

import * as Sentry from "@sentry/react";
import PageLoadingFailed from "./PageLoadingFailed";
import PageLoadingPastDelay from "./PageLoadingPastDelay";

type PageLoadingProps = {
  isLoading?: boolean;
  error?: any;
  timedOut?: boolean;
  retry?: () => void;
  pastDelay?: boolean;
};

const PageLoading = (props: PageLoadingProps): JSX.Element | null => {
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

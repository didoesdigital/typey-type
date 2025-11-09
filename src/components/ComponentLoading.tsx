import * as Sentry from "@sentry/react";
import ComponentLoadingFailed from "./ComponentLoadingFailed";
import ComponentLoadingPastDelay from "./ComponentLoadingPastDelay";

type Props = {
  isLoading?: boolean;
  error?: any;
  timedOut?: boolean;
  retry?: () => void;
  pastDelay?: boolean;
};

const ComponentLoading = (props: Props) => {
  if (props.error) {
    // When the loader has errored
    Sentry.captureException(props.error);
    return <ComponentLoadingFailed />;
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div>
        Taking a long time… <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <ComponentLoadingPastDelay />;
  } else {
    // When the loader has just started
    return null;
  }
};

export default ComponentLoading;

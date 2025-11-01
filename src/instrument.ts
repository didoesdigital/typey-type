import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://50e71fa7abea49288b136cb517fc55be@o180165.ingest.us.sentry.io/1268615",

  // debug: true,

  environment: import.meta.env.MODE,

  // This setting would add request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#ignoreErrors
  ignoreErrors: [
    /ResizeObserver loop limit exceeded/i,
    /ResizeObserver loop completed with undelivered notifications/i,
    /ChunkLoadError/i,
  ],
});

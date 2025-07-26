import { init } from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import { withAtomsCompat } from "states/atomUtils";
import { userSettingsState } from "./states/userSettingsState";
import { globalUserSettingsState } from "./states/globalUserSettingsState";
import { useLessonIndexWithFallback } from "./states/lessonIndexState";
import { revisionModeState } from "./states/lessonState";
import Analytics from "components/Analytics";

if (process.env.NODE_ENV === "production" && !process.env.REACT_APP_QA) {
  init({
    dsn: "https://50e71fa7abea49288b136cb517fc55be@o180165.ingest.sentry.io/1268615",
    release: process.env.REACT_APP_TYPEY_TYPE_RELEASE || "development",
    ignoreErrors: [
      /ResizeObserver loop limit exceeded/i,
      /ResizeObserver loop completed with undelivered notifications/i,
      /ChunkLoadError/i,
    ],
  });
}

function AppWrapper(props: object) {
  const lessonIndex = useLessonIndexWithFallback();
  // @ts-expect-error TS(2740) FIXME: Type '{ lessonIndex: LessonIndexEntry[]; }' is mis... Remove this comment to see the full error message
  const app = <App {...props} {...{ lessonIndex }} />;
  return <Analytics>{app}</Analytics>;
}

const AppWithAtomsCompat = withAtomsCompat(AppWrapper, [
  ["revisionMode", revisionModeState],
  ["userSettings", userSettingsState],
  ["globalUserSettings", globalUserSettingsState],
]);

ReactDOM.render(
  <DocumentTitle title="Typey Type for Stenographers">
    <Router
      basename="/typey-type"
      future={{
        v7_relativeSplatPath: false,
        v7_startTransition: false,
      }}
    >
      <ErrorBoundary>
        <Routes>
          <Route path={"*"} element={<AppWithAtomsCompat />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  </DocumentTitle>,
  document.getElementById("root")
);

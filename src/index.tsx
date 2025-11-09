import "./instrument";
import { render } from "react-dom";
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

render(
  <DocumentTitle title="Typey Type for Stenographers">
    <Router
      basename={import.meta.env.VITE_PUBLIC_URL}
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

import App from "./App";
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

export default AppWithAtomsCompat;

import GoogleAnalytics from "react-ga4";
import { useSetAtom } from "jotai";
import {
  backupBannerDismissedTime,
  experimentsState,
  inputForKAOESState,
  writerInputState,
} from "../../../../states/globalUserSettingsState";
import type { Experiments } from "types";

export function useChangeWriterInput() {
  const setState = useSetAtom(writerInputState);
  const onChangeWriterInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let name = "BAD_INPUT";

    if (event && event.target && event.target.name) {
      setState(event.target.name);
      name = event.target.name;
    }

    let labelString = name;
    if (!name) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change writer input",
      label: labelString,
    });
  };

  return onChangeWriterInput;
}

export function useChangeInputForKAOES() {
  const setState = useSetAtom(inputForKAOESState);

  const onChangeInputForKAOES: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let name = "BAD_INPUT";

    if (event && event.target && event.target.name) {
      setState(event.target.name);
      name = event.target.name;
    }

    let labelString = name;
    if (!name) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change input for KAOES",
      label: labelString,
    });
  };

  return onChangeInputForKAOES;
}

const experimentNames: Required<keyof Experiments>[] = [
  "stenohintsonthefly",
  "timesSeen",
] as const;

export function useToggleExperiment() {
  const setState = useSetAtom(experimentsState);

  const onToggleExperiment: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    if (experimentNames.includes(name as keyof Experiments)) {
      const typedName = name as keyof Experiments;
      setState(typedName, value);
    }

    // eslint-disable-next-line no-extra-boolean-cast
    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change " + name,
      label: labelString,
    });
  };

  return onToggleExperiment;
}

export function useDismissBackupBanner() {
  const setState = useSetAtom(backupBannerDismissedTime);
  return () => {
    setState(Date.now());

    let labelString = "Dismiss";

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Dismiss backup banner",
      label: labelString,
    });
  };
}

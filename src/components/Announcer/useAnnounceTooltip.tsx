import { useAnnouncerApi } from "../../components/Announcer/useAnnouncer";
import getTooltipText from "./getTooltipText";

function useAnnounceTooltip() {
  const { updateMessage } = useAnnouncerApi();

  return function (this: HTMLElement) {
    updateMessage(getTooltipText(this));
  };
}

export default useAnnounceTooltip;

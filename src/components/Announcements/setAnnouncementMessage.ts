import isElement from "../../utils/isElement";

function setAnnouncementMessage(
  app: any,
  content?: string | HTMLElement | null
) {
  let newAnnouncementMessage = "";
  if (content) {
    if (typeof content === "string") {
      newAnnouncementMessage = content;
      // TODO: if we want to make this function generic for other announcement objects, here is the
      // start of a handler for that:
    } else if (typeof content === "object") {
      if (isElement(content)) {
        const tooltip = content.querySelector(
          ".tippy-tooltip-content"
        ) as HTMLElement | null;
        newAnnouncementMessage = tooltip ? tooltip.innerText : "";
      }
    }
  }
  app.setState({ announcementMessage: newAnnouncementMessage });

  // TODO: figure out how to re-announce things if the announcement hasn't
  // changed content but you've encountered a new instance of the same
  // content that should be announced
  // if (this.state.announcementMessage === newAnnouncementMessage) {
  //   app.setState({
  //     announcementSubsequentMessage: newAnnouncementMessage,
  //     announcementMessage: "",
  //   });
  // } else {
  //   app.setState({
  //     announcementMessage: newAnnouncementMessage,
  //     announcementSubsequentMessage: "",
  //   });
  // }
}

export default setAnnouncementMessage;

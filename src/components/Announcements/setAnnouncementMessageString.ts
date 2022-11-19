function setAnnouncementMessageString(message: string) {
  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  this.setState({ announcementMessage: message });
}

export default setAnnouncementMessageString;

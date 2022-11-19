import React, { Component } from "react";

type Props = {
  message: string
}

class Announcements extends Component<Props> {
  render() {
    return (
      <div className="visually-hidden" aria-live="assertive" aria-atomic="true">
        {this.props.message}
      </div>
    );
  }
}

export default Announcements;

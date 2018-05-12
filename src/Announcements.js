import React, { Component } from 'react';

class Announcements extends Component {
  render() {
    return (
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {this.props.message}
      </div>
    );
  }
}

export default Announcements;

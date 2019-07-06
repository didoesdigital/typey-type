import React, { Component } from 'react';
import { IconClosingCross } from './Icon';
// import GoogleAnalytics from 'react-ga';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contextualVariant: "", // info, highlight, success, warning, danger
      showNotification: false
    }
  }

  componentDidMount() {
    this.setState({
      showNotification: true
    });
  }

  handleDismiss(event) {
    if (this.props.onClickHandler) {
      this.props.onClickHandler();
      this.setState({
        showNotification: false
      });
    }
    else {
      this.setState({
        showNotification: false
      });
    }
  }

  render() {
    return (
      <div>
        { this.state.showNotification ?
          <div className="notification notification--global flex flex-wrap justify-between pa1 p1 p3 pa3 items-center bg-danger">
            <div className="notification__message">
              {this.props.children}
            </div>
            <div onClick={this.handleDismiss.bind(this)}>
              <IconClosingCross role="img" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="Dismiss notification" />
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default Notification;

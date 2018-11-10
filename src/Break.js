import React, { Component } from 'react';

class Break extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakCountdown: 0,
      breakTimeMinutes: 0,
      breakTimeSeconds: 0,
      timeToDisplay: '5:00'
    }
  }

  componentDidMount() {
    this.setState({
      breakCountdown: (Date.now()) + (5 * 60 * 1000) + 999 // (5 minutes * 60 seconds * 1000 milliseconds) + almost a second to avoid skipping 4:59
    }, () => {
      this.startCountdown();
    });

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  componentWillUnmount() {
    this.stopBreak();
  }


  startCountdown() {
    this.intervalID = window.setInterval(this.updateBreakTime.bind(this), 1000);
  }

  stopCountdown() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  stopBreak() {
    this.setState({
      breakTimeMinutes: 0,
      breakTimeSeconds: 0,
      breakCountdown: null
    }, () => {
      this.stopCountdown();
    });
  }

  updateBreakTime() {
    let breakCountdown = this.state.breakCountdown;
    let secondsRemaining = Math.floor((breakCountdown - Date.now()) / 1000); // time in milliseconds ÷ 1000 milliseconds per second
    let breakTimeMinutes = Math.floor(secondsRemaining / 60);
    let breakTimeSeconds = Math.floor(secondsRemaining - (breakTimeMinutes * 60));
    let timeToDisplay = "" + breakTimeMinutes + ":" + (this.addLeadingZeros(breakTimeSeconds));

    this.setState({
      breakCountdown: breakCountdown,
      breakTimeMinutes: breakTimeMinutes,
      breakTimeSeconds: breakTimeSeconds,
      timeToDisplay: timeToDisplay
    });

    if (breakTimeMinutes <= 0 && breakTimeSeconds <= 0) {
      this.stopBreak();
    }
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {

    let timeToDisplay = this.state.timeToDisplay;
    let breakHeading = 'Your break starts now';
    if (timeToDisplay === '0:00') { breakHeading = 'Your break is done'; }

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="take-a-break">Take a break</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mx-auto mw-568">
            <h2 className="text-center mt3" aria-hidden="true">{breakHeading}</h2>
            <p className="mt3 text-center mb3">Rest your hands and your mind. Take a 5-minute break and continue or come back in 4&nbsp;hours for another session.</p>
            <h3 className="text-center mb3"><span aria-live="polite" aria-atomic="true">{timeToDisplay}</span></h3>
          </div>
        </div>
      </main>
    )
  }
}

export default Break;

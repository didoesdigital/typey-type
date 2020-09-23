import React, { Component } from 'react';

// https://jakearchibald.github.io/svgomg/
//
// custom size, meaningful SVG image
// <IconTypeyType iconWidth="300" iconHeight="300" className="m1" title="custom title for this icon" />
//
// SVG icon inline with text
// <IconTypeyType className="mr1 svg-icon-wrapper svg-baseline" title="custom title for this icon" />
//
// Linked SVG icon, no text TEST THIS
// <Link to="/" aria-label="Label"><IconTypeyType className="mr1 svg-icon-wrapper svg-baseline" /></Link>

function idForIcon(prefix) {
  return prefix + "-" + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}

class IconTypeyType extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconTypeyType");
  }

  render () {
    const iconWidth = this.props.iconWidth || 32;
    const iconHeight = this.props.iconHeight || 17;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'Typey Type for Stenographers'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';

    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" aria-labelledby={this.titleIdAndAriaLabelledBy}><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><g fill="currentColor" fillRule="evenodd"><rect x="21" y="61" width="11" height="21" rx="4"/><rect x="36" y="61" width="11" height="21" rx="4"/><rect x="51" y="61" width="11" height="21" rx="4"/><rect x="75" y="61" width="16" height="21" rx="4"/><rect x="5" y="44" width="170" height="11" rx="4"/><rect x="104" y="61" width="11" height="21" rx="4"/><rect x="119" y="61" width="11" height="21" rx="4"/><rect x="134" y="61" width="11" height="21" rx="4"/><rect x="149" y="61" width="11" height="21" rx="4"/><rect x="5" y="61" width="11" height="48" rx="4"/><rect x="21" y="88" width="11" height="21" rx="4"/><rect x="36" y="88" width="11" height="21" rx="4"/><rect x="51" y="88" width="11" height="21" rx="4"/><rect x="75" y="88" width="16" height="21" rx="4"/><rect x="104" y="88" width="11" height="21" rx="4"/><rect x="119" y="88" width="11" height="21" rx="4"/><rect x="47" y="114" width="11" height="21" rx="4"/><rect x="62" y="114" width="11" height="21" rx="4"/><rect x="93" y="114" width="11" height="21" rx="4"/><rect x="108" y="114" width="11" height="21" rx="4"/><rect x="134" y="88" width="11" height="21" rx="4"/><rect x="149" y="88" width="11" height="21" rx="4"/><rect x="164" y="61" width="11" height="21" rx="4"/><rect x="164" y="88" width="11" height="21" rx="4"/></g></svg>
      </span>
    )
  }
}

class IconClosingCross extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconClosingCrossTitle");
  }

  render() {
  const iconWidth = this.props.iconWidth || 24;
  const iconHeight = this.props.iconHeight || 24;
  let iconTitle = "";
  if (this.props.iconTitle === "") { iconTitle = ""; }
  else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
  else { iconTitle = 'Cross'; }
  const classes = this.props.className || '';
  const role = this.props.role || 'img';
  const ariaHidden = this.props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title>
        <g fill="none" fillRule="evenodd">
          <mask id="closingCrossMask" fill="#fff">
            <path d="M12.002 15.084L8.94 18.148c-.73.729-1.901.74-2.618.022-.717-.716-.707-1.888.022-2.617l3.064-3.064-3.434-3.434c-.729-.729-.739-1.9-.022-2.617.717-.717 1.889-.707 2.618.022l3.433 3.434 3.434-3.434c.73-.73 1.901-.74 2.618-.022.717.716.707 1.888-.023 2.617l-3.433 3.434 3.063 3.064c.73.729.74 1.9.023 2.617-.717.717-1.889.707-2.618-.022l-3.064-3.064z" id="closingCrossPath"/>
          </mask>
          <use fill="currentColor" fillRule="nonzero" />
          <g mask="url(#closingCrossMask)" fill="currentColor">
            <path d="M0 0h24v24H0z"/>
          </g>
        </g>
      </svg>
    </span>
  )
  }
}

class IconChevronRight extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconChevronRightTitle");
  }

  render() {
  const iconWidth = this.props.iconWidth || 24;
  const iconHeight = this.props.iconHeight || 24;
  let iconTitle = "";
  if (this.props.iconTitle === "") { iconTitle = ""; }
  else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
  else { iconTitle = 'Chevron right'; }
  const classes = this.props.className || '';
  const role = this.props.role || 'img';
  const ariaHidden = this.props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title>
        <mask id="iconChevronRightMask" fill="#fff">
          <path d="M15.812 11.813L8.595 4.596A1.835 1.835 0 1 1 11.19 2l8.319 8.319c.41.41.605.956.584 1.494a1.995 1.995 0 0 1-.584 1.494l-8.319 8.318a1.835 1.835 0 1 1-2.595-2.595l7.217-7.217z" id="iconChevronRightPath"/>
        </mask>
        <g mask="url(#iconChevronRightMask)" fill="currentColor">
          <path d="M0 0h24v24H0z"/>
        </g>
      </svg>
    </span>
  )
  }
}

class IconTriangleRight extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconTriangleRightTitle");
    this.maskId = idForIcon("iconTriangleRightMask");
  }

  render() {
  const iconWidth = this.props.iconWidth || 24;
  const iconHeight = this.props.iconHeight || 24;
  let iconTitle = "";
  if (this.props.iconTitle === "") { iconTitle = ""; }
  else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
  else { iconTitle = 'Triangle right'; }
  const classes = this.props.className || '';
  const role = this.props.role || 'img';
  const ariaHidden = this.props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title>
        <mask id={this.maskId} fill="#fff">
          <path d="M8.445 2.557l7.305 9.13a.5.5 0 0 1 0 .625l-7.305 9.131A.25.25 0 0 1 8 21.287V2.713a.25.25 0 0 1 .445-.156z" />
        </mask>
        <g mask={"url(#" + this.maskId + ")"} fill="currentColor">
          <path d="M0 0h24v24H0z"/>
        </g>
      </svg>
    </span>
  )
  }
}

class IconCheckmark extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("titleIdAndAriaLabelledBy");
    this.maskId = idForIcon("checkmarkMask");
  }

  render() {
    const iconWidth = this.props.iconWidth || 24;
    const iconHeight = this.props.iconHeight || 24;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'Checkmark'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';
    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><defs><path d="M1.707 16.707l5.441 5.441a1 1 0 0 0 1.532-.142L20.251 5.094a1 1 0 0 0-.509-1.513l-1.041-.347a1 1 0 0 0-1.13.367L8 17l-3.293-3.293a1 1 0 0 0-1.414 0l-1.586 1.586a1 1 0 0 0 0 1.414z" /></defs><g fill="currentColor" fillRule="evenodd"><mask id={this.maskId} fill="currentColor"></mask><path stroke="currentColor" d="M2.06 16.354l5.442 5.44a.5.5 0 0 0 .766-.07l11.57-16.912a.5.5 0 0 0-.254-.757l-1.041-.347a.5.5 0 0 0-.565.184L8.064 17.77l-3.71-3.71a.5.5 0 0 0-.708 0l-1.585 1.585a.5.5 0 0 0 0 .708z"/><g mask={"url(#" + this.maskId + ")"} fill="currentColor"><path d="M0 0h24v24H0z"/></g></g></svg></span>
    )
  }
}

class IconMetronome extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("titleIdAndAriaLabelledBy");
    this.maskId = idForIcon("metronomeMask");
  }

  render() {
    const iconWidth = this.props.iconWidth || 24;
    const iconHeight = this.props.iconHeight || 24;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'Metronome'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';
    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><path fillRule="evenodd" clipRule="evenodd" d="M9.388 3.346A.5.5 0 019.863 3h4.273a.5.5 0 01.476.346l1.66 5.133.803-.936A2.002 2.002 0 0119 5a2 2 0 11-.489 3.94l-1.517 1.77 2.794 8.636a.5.5 0 01-.476.654H16v1a1 1 0 11-2 0v-1h-4v1a1 1 0 11-2 0v-1H4.687a.5.5 0 01-.476-.654l5.177-16zM15 18h1.323a.5.5 0 00.478-.647l-.308-1a.5.5 0 00-.478-.353h-8.03a.5.5 0 00-.478.353l-.308 1a.5.5 0 00.478.647H15zm-.348-7.63L13.11 5.352A.5.5 0 0012.63 5h-1.262a.5.5 0 00-.478.353l-2.461 8a.5.5 0 00.478.647h2.632l3.112-3.63zM14.174 14l1.174-1.37.222.723a.5.5 0 01-.478.647h-.918zM13 8a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100-2 1 1 0 000 2zM19 7.5a.5.5 0 100-1 .5.5 0 000 1z" fill="currentColor"/></svg>
      </span>
    )
  }
}

class IconRestart extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconRestartTitle");
  }

  render() {
  const iconWidth = this.props.iconWidth || 24;
  const iconHeight = this.props.iconHeight || 24;
  const iconTitle = this.props.iconTitle || 'Restart';
  const classes = this.props.className || '';
  const role = this.props.role || 'img';
  const ariaHidden = this.props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><mask id="mask-restart" fill="white"><path d="M6,12.9983471 C6,12.9983471 6,12.9983471 6,12.9983471 C6,16.3111427 8.6862915,18.9966941 12,18.9966941 C15.3137085,18.9966941 18,16.3111427 18,12.9983471 C18,9.68633182 15.3149739,7.00126526 12.0023416,7.00000045 L12.0023416,4.99896084 C16.4211533,4.99900502 20.0032943,8.58113874 20.0032943,12.9999183 C20.0032943,17.418725 16.4211092,21.0008757 12.0022599,21.0008757 C7.58341064,21.0008757 4.00122554,17.418725 4.00122554,12.9999183 C4.00122554,12.9999183 4.00122554,12.9999183 4.00122554,12.9999183 L4.00122554,12.9999183 C4.00122554,12.7238075 4.22505756,12.4999754 4.50116835,12.4999754 L5.50165119,12.4999983 C5.77688164,12.4999983 6,12.7231166 6,12.9983471 Z M7.0002749,6 L11.1467215,1.85355339 C11.3419837,1.65829124 11.6585661,1.65829124 11.8538283,1.85355339 C11.9475965,1.94732158 12.0002749,2.07449854 12.0002749,2.20710678 L12.0002749,9.79289322 C12.0002749,10.0690356 11.7764173,10.2928932 11.5002749,10.2928932 C11.3676667,10.2928932 11.2404897,10.2402148 11.1467215,10.1464466 L7.0002749,6 Z" id="path-restart"></path></mask><g mask="url(#mask-restart)" fill="currentColor"><rect id="heavy-primary" x="0" y="0" width="24" height="24"></rect></g></svg></span>
  )
  }
}

class IconSearch extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconSearchTitle");
  }

  render() {
    const iconWidth = this.props.iconWidth || 24;
    const iconHeight = this.props.iconHeight || 24;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'Search'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';
    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><mask id="mask-search" fill="white"><path d="M16.7567621,13.9283349 L22.4350288,19.6066017 C23.2160774,20.3876503 23.2160774,21.6539803 22.4350288,22.4350288 C21.6539803,23.2160774 20.3876503,23.2160774 19.6066017,22.4350288 L13.9283349,16.7567621 C12.6386564,17.5454533 11.1224107,18 9.5,18 C4.80557963,18 1,14.1944204 1,9.5 C1,4.80557963 4.80557963,1 9.5,1 C14.1944204,1 18,4.80557963 18,9.5 C18,11.1224107 17.5454533,12.6386564 16.7567621,13.9283349 Z M9.5,15 C12.5375661,15 15,12.5375661 15,9.5 C15,6.46243388 12.5375661,4 9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,12.5375661 6.46243388,15 9.5,15 Z" id="path-search"></path></mask><rect id="heavy-primary-tint-1" mask="url(#mask-search)" fill="currentColor" x="0" y="0" width="24" height="24"></rect></svg></span>
    )
  }
}

class IconExternal extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconExternalTitle");
    this.maskId = idForIcon("mask-external");
  }

  render() {
    const iconWidth = this.props.iconWidth || 24;
    const iconHeight = this.props.iconHeight || 24;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'External'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';
    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title><mask id={this.maskId} fill="#fff"><path d="M11 22v-2h6v-6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H11zm-9-9h2v7h7v2H2.5a.5.5 0 0 1-.5-.5V13zm9-7.5v1a.5.5 0 0 1-.5.5H4v6H2V5.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5zM21.5 9h-1a.5.5 0 0 1-.5-.5v-3l-8.146 8.146a.5.5 0 0 1-.708 0l-.792-.792a.5.5 0 0 1 0-.708L18.5 4h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5z"></path></mask><g mask={"url(#" + this.maskId + ")"} fill="currentColor"><path d="M0 0h24v24H0z"/></g></svg></span>
    )
  }
}

class IconFullscreen extends Component {
  constructor(props) {
    super(props);
    this.titleIdAndAriaLabelledBy = idForIcon("iconFullscreenTitle");
  }

  render() {
    const iconWidth = this.props.iconWidth || 24;
    const iconHeight = this.props.iconHeight || 24;
    let iconTitle = "";
    if (this.props.iconTitle === "") { iconTitle = ""; }
    else if (this.props.iconTitle) { iconTitle = this.props.iconTitle; }
    else { iconTitle = 'Fullscreen'; }
    const classes = this.props.className || '';
    const role = this.props.role || 'img';
    const ariaHidden = this.props.ariaHidden || 'false';
    return (
      <span className={classes}>
        <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby={this.titleIdAndAriaLabelledBy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id={this.titleIdAndAriaLabelledBy}>{iconTitle}</title>
          <mask id="mask-fullscreen-a" fill="#fff"><path d="M2 14h2v5h5v2H2v-7zM9 3v2H4v5H2V3h7zm13 7h-2V5h-5V3h7v7zm-7 11v-2h5v-5h2v7h-7z"/></mask><path d="M2 14h2v5h5v2H2v-7zM9 3v2H4v5H2V3h7zm13 7h-2V5h-5V3h7v7zm-7 11v-2h5v-5h2v7h-7z"/><g mask="url(#mask-fullscreen-a)" fill="currentColor"><path d="M0 0h24v24H0z"/></g></svg>
      </span>
    )
  }
}

export {
  IconCheckmark,
  IconChevronRight,
  IconClosingCross,
  IconExternal,
  IconFullscreen,
  IconMetronome,
  IconRestart,
  IconSearch,
  IconTriangleRight,
  IconTypeyType
};

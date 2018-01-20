import React from 'react';

// custom size, meaningful SVG image
// <IconTypeyType iconWidth="300" iconHeight="300" iconFill="#fff" className="m1" title="custom title for this icon" />
//
// SVG icon inline with text
// <IconTypeyType iconFill="#fff" className="mr1 svg-icon-wrapper svg-baseline" title="custom title for this icon" />
//
// Linked SVG icon, no text TEST THIS
// <Link to="/" aria-label="Label"><IconTypeyType iconFill="#fff" className="mr1 svg-icon-wrapper svg-baseline" /></Link>

function IconTypeyType(props) {
  const iconWidth = props.iconWidth || 32;
  const iconHeight = props.iconHeight || 17;
  const iconTitle = props.iconTitle || 'Typey type for stenographers';
  const classes = props.className || '';
  const role = props.role || 'img';
  const ariaHidden = props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" aria-labelledby="iconTypeyTypeTitle"><title id="iconTypeyTypeTitle">{iconTitle}</title><g fill="currentColor" fillRule="evenodd"><rect x="21" y="61" width="11" height="21" rx="4"/><rect x="36" y="61" width="11" height="21" rx="4"/><rect x="51" y="61" width="11" height="21" rx="4"/><rect x="75" y="61" width="16" height="21" rx="4"/><rect x="5" y="44" width="170" height="11" rx="4"/><rect x="104" y="61" width="11" height="21" rx="4"/><rect x="119" y="61" width="11" height="21" rx="4"/><rect x="134" y="61" width="11" height="21" rx="4"/><rect x="149" y="61" width="11" height="21" rx="4"/><rect x="5" y="61" width="11" height="48" rx="4"/><rect x="21" y="88" width="11" height="21" rx="4"/><rect x="36" y="88" width="11" height="21" rx="4"/><rect x="51" y="88" width="11" height="21" rx="4"/><rect x="75" y="88" width="16" height="21" rx="4"/><rect x="104" y="88" width="11" height="21" rx="4"/><rect x="119" y="88" width="11" height="21" rx="4"/><rect x="47" y="114" width="11" height="21" rx="4"/><rect x="62" y="114" width="11" height="21" rx="4"/><rect x="93" y="114" width="11" height="21" rx="4"/><rect x="108" y="114" width="11" height="21" rx="4"/><rect x="134" y="88" width="11" height="21" rx="4"/><rect x="149" y="88" width="11" height="21" rx="4"/><rect x="164" y="61" width="11" height="21" rx="4"/><rect x="164" y="88" width="11" height="21" rx="4"/></g></svg>
    </span>
  )
}

function IconRestart(props) {
  const iconWidth = props.iconWidth || 24;
  const iconHeight = props.iconHeight || 24;
  const iconTitle = props.iconTitle || 'Typey type for stenographers';
  const classes = props.className || '';
  const role = props.role || 'img';
  const ariaHidden = props.ariaHidden || 'false';
  return (
    <span className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} aria-labelledby="iconRestartTitle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id="iconRestartTitle">{iconTitle}</title><mask id="mask-2" fill="white"><path d="M6,12.9983471 C6,12.9983471 6,12.9983471 6,12.9983471 C6,16.3111427 8.6862915,18.9966941 12,18.9966941 C15.3137085,18.9966941 18,16.3111427 18,12.9983471 C18,9.68633182 15.3149739,7.00126526 12.0023416,7.00000045 L12.0023416,4.99896084 C16.4211533,4.99900502 20.0032943,8.58113874 20.0032943,12.9999183 C20.0032943,17.418725 16.4211092,21.0008757 12.0022599,21.0008757 C7.58341064,21.0008757 4.00122554,17.418725 4.00122554,12.9999183 C4.00122554,12.9999183 4.00122554,12.9999183 4.00122554,12.9999183 L4.00122554,12.9999183 C4.00122554,12.7238075 4.22505756,12.4999754 4.50116835,12.4999754 L5.50165119,12.4999983 C5.77688164,12.4999983 6,12.7231166 6,12.9983471 Z M7.0002749,6 L11.1467215,1.85355339 C11.3419837,1.65829124 11.6585661,1.65829124 11.8538283,1.85355339 C11.9475965,1.94732158 12.0002749,2.07449854 12.0002749,2.20710678 L12.0002749,9.79289322 C12.0002749,10.0690356 11.7764173,10.2928932 11.5002749,10.2928932 C11.3676667,10.2928932 11.2404897,10.2402148 11.1467215,10.1464466 L7.0002749,6 Z" id="path-1"></path></mask><g id="Colors/heavy-primary" mask="url(#mask-2)" fill="currentColor"><rect id="heavy-primary" x="0" y="0" width="24" height="24"></rect></g></svg></span>
  )
}

export {
  IconRestart,
  IconTypeyType
};

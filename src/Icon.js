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
  const iconFill = props.iconFill || '#7109AA';
  const iconTitle = props.iconTitle || 'Typey type for stenographers';
  const classes = props.className || '';
  const role = props.role || 'img';
  const ariaHidden = props.ariaHidden || 'false';
  return (
    <div className={classes}>
      <svg aria-hidden={ariaHidden} role={role} width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" aria-labelledby="iconTypeyTypeTitle"><title id="iconTypeyTypeTitle">{iconTitle}</title><g fill={iconFill} fillRule="evenodd"><rect x="21" y="61" width="11" height="21" rx="4"/><rect x="36" y="61" width="11" height="21" rx="4"/><rect x="51" y="61" width="11" height="21" rx="4"/><rect x="75" y="61" width="16" height="21" rx="4"/><rect x="5" y="44" width="170" height="11" rx="4"/><rect x="104" y="61" width="11" height="21" rx="4"/><rect x="119" y="61" width="11" height="21" rx="4"/><rect x="134" y="61" width="11" height="21" rx="4"/><rect x="149" y="61" width="11" height="21" rx="4"/><rect x="5" y="61" width="11" height="48" rx="4"/><rect x="21" y="88" width="11" height="21" rx="4"/><rect x="36" y="88" width="11" height="21" rx="4"/><rect x="51" y="88" width="11" height="21" rx="4"/><rect x="75" y="88" width="16" height="21" rx="4"/><rect x="104" y="88" width="11" height="21" rx="4"/><rect x="119" y="88" width="11" height="21" rx="4"/><rect x="47" y="114" width="11" height="21" rx="4"/><rect x="62" y="114" width="11" height="21" rx="4"/><rect x="93" y="114" width="11" height="21" rx="4"/><rect x="108" y="114" width="11" height="21" rx="4"/><rect x="134" y="88" width="11" height="21" rx="4"/><rect x="149" y="88" width="11" height="21" rx="4"/><rect x="164" y="61" width="11" height="21" rx="4"/><rect x="164" y="88" width="11" height="21" rx="4"/></g></svg>
    </div>
  )
}

export { IconTypeyType };

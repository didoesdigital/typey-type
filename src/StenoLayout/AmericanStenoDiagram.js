import React, { Component } from 'react';
import * as stroke from '../utils/stroke';

let hidden = true;

const strokeColor = '#7109AA';
const onTextColor = '#fff';
const offTextColor = '#fff';

let rightZOnColor = '#7109AA';
let rightDOnColor = '#7109AA';
let rightSOnColor = '#7109AA';
let rightTOnColor = '#7109AA';
let rightGOnColor = '#7109AA';
let rightLOnColor = '#7109AA';
let rightBOnColor = '#7109AA';
let rightPOnColor = '#7109AA';
let rightROnColor = '#7109AA';
let rightFOnColor = '#7109AA';
let rightUOnColor = '#7109AA';
let rightEOnColor = '#7109AA';
let starOnColor = '#7109AA';
let leftOOnColor = '#7109AA';
let leftAOnColor = '#7109AA';
let leftROnColor = '#7109AA';
let leftHOnColor = '#7109AA';
let leftWOnColor = '#7109AA';
let leftPOnColor = '#7109AA';
let leftKOnColor = '#7109AA';
let leftTOnColor = '#7109AA';
let leftSLowerOnColor = '#7109AA';
let leftSUpperOnColor = '#7109AA';
let numberBarOnColor = '#7109AA';

let rightZOffColor = '#e9d9f2';
let rightDOffColor = '#e9d9f2';
let rightSOffColor = '#e9d9f2';
let rightTOffColor = '#e9d9f2';
let rightGOffColor = '#e9d9f2';
let rightLOffColor = '#e9d9f2';
let rightBOffColor = '#e9d9f2';
let rightPOffColor = '#e9d9f2';
let rightROffColor = '#e9d9f2';
let rightFOffColor = '#e9d9f2';
let rightUOffColor = '#e9d9f2';
let rightEOffColor = '#e9d9f2';
let starOffColor = '#e9d9f2';
let leftOOffColor = '#e9d9f2';
let leftAOffColor = '#e9d9f2';
let leftROffColor = '#e9d9f2';
let leftHOffColor = '#e9d9f2';
let leftWOffColor = '#e9d9f2';
let leftPOffColor = '#e9d9f2';
let leftKOffColor = '#e9d9f2';
let leftTOffColor = '#e9d9f2';
let leftSLowerOffColor = '#e9d9f2';
let leftSUpperOffColor = '#e9d9f2';
let numberBarOffColor = '#e9d9f2';

let idKeyLookup = {
  "rightZ": stroke.Z,
  "rightD": stroke.D,
  "rightS": stroke.RS,
  "rightT": stroke.RT,
  "rightG": stroke.G,
  "rightL": stroke.L,
  "rightB": stroke.B,
  "rightP": stroke.RP,
  "rightR": stroke.RR,
  "rightF": stroke.F,
  "rightU": stroke.U,
  "rightE": stroke.E,
  "star": stroke.STAR,
  "leftO": stroke.O,
  "leftA": stroke.A,
  "leftR": stroke.R,
  "leftH": stroke.H,
  "leftW": stroke.W,
  "leftP": stroke.P,
  "leftK": stroke.K,
  "leftT": stroke.T,
  "leftSLower": stroke.S,
  "leftSUpper": stroke.S,
  "numberBar": stroke.HASH,
  "Z": stroke.Z,
  "D": stroke.D,
  "SRight": stroke.RS,
  "TRight": stroke.RT,
  "G": stroke.G,
  "L": stroke.L,
  "B": stroke.B,
  "PRight": stroke.RP,
  "RRight": stroke.RR,
  "F": stroke.F,
  "U": stroke.U,
  "E": stroke.E,
  "O": stroke.O,
  "A": stroke.A,
  "starLetter": stroke.STAR,
  "RLeft": stroke.R,
  "H": stroke.H,
  "W": stroke.W,
  "PLeft": stroke.P,
  "K": stroke.K,
  "TLeft": stroke.T,
  "SLower": stroke.S,
  "SUpper": stroke.S,
  "hashLetter": stroke.HASH
}

class AmericanStenoDiagram extends Component {

  handleClick(event) {
    if (this.props.handleOnClick) {
      let key = "";
      let clickedKeyID = event.target["id"];
      if (idKeyLookup[clickedKeyID]) {
        key = idKeyLookup[clickedKeyID];
      }

      this.props.handleOnClick(key);
    }
  }

  render() {
    // const strokeColor = '#321E3E';
    // const strokeColor = '#6c6076';
    // const offTextColor = '#CAC7CC';
    // const strokeColor = 'hsla(277, 10%, 60%, 1)';
    // const strokeColor = '#321E3E';

    let diagramWidth = this.props.diagramWidth || 140;
    let svgDiagramID = this.props.id || 'stenoDiagram';

    return (
      <svg id={svgDiagramID} viewBox="0 0 215 101" width={diagramWidth} xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden} onClick={this.handleClick.bind(this)}>
        <g id={"stenoboard-" + this.props.brief } transform="translate(1 1)" fill="none" fillRule="evenodd">
          <rect id="rightZ" stroke={strokeColor} fill={this.props.rightZ ? rightZOnColor : rightZOffColor} x="195" y="48" width="18" height="23" rx="4"/>
          <rect id="rightD" stroke={strokeColor} fill={this.props.rightD ? rightDOnColor : rightDOffColor} x="195" y="20" width="18" height="23" rx="4"/>
          <rect id="rightS" stroke={strokeColor} fill={this.props.rightS ? rightSOnColor : rightSOffColor} x="174" y="48" width="18" height="23" rx="4"/>
          <rect id="rightT" stroke={strokeColor} fill={this.props.rightT ? rightTOnColor : rightTOffColor} x="174" y="20" width="18" height="23" rx="4"/>
          <rect id="rightG" stroke={strokeColor} fill={this.props.rightG ? rightGOnColor : rightGOffColor} x="153" y="48" width="18" height="23" rx="4"/>
          <rect id="rightL" stroke={strokeColor} fill={this.props.rightL ? rightLOnColor : rightLOffColor} x="153" y="20" width="18" height="23" rx="4"/>
          <rect id="rightB" stroke={strokeColor} fill={this.props.rightB ? rightBOnColor : rightBOffColor} x="132" y="48" width="18" height="23" rx="4"/>
          <rect id="rightP" stroke={strokeColor} fill={this.props.rightP ? rightPOnColor : rightPOffColor} x="132" y="20" width="18" height="23" rx="4"/>
          <rect id="rightR" stroke={strokeColor} fill={this.props.rightR ? rightROnColor : rightROffColor} x="111" y="48" width="18" height="23" rx="4"/>
          <rect id="rightF" stroke={strokeColor} fill={this.props.rightF ? rightFOnColor : rightFOffColor} x="111" y="20" width="18" height="23" rx="4"/>
          <rect id="rightU" stroke={strokeColor} fill={this.props.rightU ? rightUOnColor : rightUOffColor} x="122" y="76" width="18" height="23" rx="4"/>
          <rect id="rightE" stroke={strokeColor} fill={this.props.rightE ? rightEOnColor : rightEOffColor} x="101" y="76" width="18" height="23" rx="4"/>
          <rect id="star" stroke={strokeColor} fill={this.props.star ? starOnColor : starOffColor} x="86" y="20" width="20" height="51" rx="4"/>
          <rect id="leftO" stroke={strokeColor} fill={this.props.leftO ? leftOOnColor : leftOOffColor} x="73" y="76" width="18" height="23" rx="4"/>
          <rect id="leftA" stroke={strokeColor} fill={this.props.leftA ? leftAOnColor : leftAOffColor} x="52" y="76" width="18" height="23" rx="4"/>
          <rect id="leftR" stroke={strokeColor} fill={this.props.leftR ? leftROnColor : leftROffColor} x="63" y="48" width="18" height="23" rx="4"/>
          <rect id="leftH" stroke={strokeColor} fill={this.props.leftH ? leftHOnColor : leftHOffColor} x="63" y="20" width="18" height="23" rx="4"/>
          <rect id="leftW" stroke={strokeColor} fill={this.props.leftW ? leftWOnColor : leftWOffColor} x="42" y="48" width="18" height="23" rx="4"/>
          <rect id="leftP" stroke={strokeColor} fill={this.props.leftP ? leftPOnColor : leftPOffColor} x="42" y="20" width="18" height="23" rx="4"/>
          <rect id="leftK" stroke={strokeColor} fill={this.props.leftK ? leftKOnColor : leftKOffColor} x="21" y="48" width="18" height="23" rx="4"/>
          <rect id="leftT" stroke={strokeColor} fill={this.props.leftT ? leftTOnColor : leftTOffColor} x="21" y="20" width="18" height="23" rx="4"/>
          <rect id="leftSLower" stroke={strokeColor} fill={this.props.leftSLower ? leftSLowerOnColor : leftSLowerOffColor} y="48" width="18" height="23" rx="4"/>
          <rect id="leftSUpper" stroke={strokeColor} fill={this.props.leftSUpper ? leftSUpperOnColor : leftSUpperOffColor} y="20" width="18" height="23" rx="4"/>
          <rect id="numberBar" stroke={strokeColor} fill={this.props.numberBar ? numberBarOnColor : numberBarOffColor} width="213" height="15" rx="4"/>
          <g id="Outlines" transform="translate(5 2)" fill="#FFF" visibility={this.props.hideLetters ? 'hidden' : 'initial'}>
            <path d="M202.568 51v1.44l-5.104 7.952h5.088V62.2H195v-1.44l5.072-7.968h-4.72V51z" id="Z" fill={this.props.leftZ ? onTextColor : offTextColor}/>
            <path d="M195 34.2V23h2.816c3.744 0 5.152 2.816 5.152 5.6 0 2.56-1.28 5.6-5.216 5.6H195zm1.904-1.792h1.04c2.288 0 3.04-2.032 3.04-3.808 0-1.888-.832-3.808-2.864-3.808h-1.216v7.616z" id="D" fill={this.props.leftD ? onTextColor : offTextColor}/>
            <path d="M177.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032-1.424-.624-3.072-1.408-3.072-3.312 0-1.616 1.344-2.96 3.456-2.96 1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SRight" fill={this.props.rightS ? onTextColor : offTextColor}/>
            <path d="M177.248 34.2v-9.376H174V23h8.416v1.824h-3.264V34.2z" id="TRight" fill={this.props.rightT ? onTextColor : offTextColor}/>
            <path d="M157.416 62.584c-3.04 0-4.416-2.864-4.416-5.792 0-2.8 1.456-5.792 4.416-5.792 1.904 0 2.816 1.104 3.456 2.256l-1.68.96c-.4-.752-.928-1.408-1.776-1.408-1.792 0-2.432 2.208-2.432 3.984 0 2.032.768 3.984 2.432 3.984 1.184 0 1.776-.896 1.776-2.08v-.24h-1.952v-1.792h3.904v1.552c0 2.832-1.616 4.368-3.728 4.368z" id="G" fill={this.props.leftG ? onTextColor : offTextColor}/>
            <path d="M153 34.2V23h1.904v9.376h5.168V34.2z" id="L" fill={this.props.rightL ? onTextColor : offTextColor}/>
            <path d="M132 62.2V51h3.776c2.72 0 3.584 1.488 3.584 2.992 0 .992-.464 1.856-1.456 2.304 1.248.416 1.84 1.504 1.84 2.624 0 1.568-.944 3.28-3.728 3.28H132zm1.904-6.672h1.616c1.312 0 1.936-.56 1.936-1.408 0-.656-.272-1.36-1.632-1.36h-1.92v2.768zm0 4.912h2.24c1.328 0 1.696-.8 1.696-1.504 0-.832-.4-1.664-2.16-1.664h-1.776v3.168z" id="B" fill={this.props.leftB ? onTextColor : offTextColor}/>
            <path d="M132 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H132zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PRight" fill={this.props.rightP ? onTextColor : offTextColor}/>
            <path d="M118.536 54.392c0 1.376-.752 2.704-2.272 3.216l2.256 4.592h-2.112l-2.176-4.384h-1.328V62.2H111V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RRight" fill={this.props.rightR ? onTextColor : offTextColor}/>
            <path d="M111 34.2V23h7.552v1.808h-5.648v2.704h4.112v1.808h-4.112v4.88z" id="F" fill={this.props.leftF ? onTextColor : offTextColor}/>
            <path d="M125.928 90.5919996c-2.016 0-3.776-1.136-3.776-4.464v-6.928h1.888v6.928c0 2.064.8 2.656 1.888 2.656 1.072 0 1.888-.592 1.888-2.656v-6.928h1.904v6.928c0 3.28-1.744 4.464-3.792 4.464z" id="U" fill={this.props.rightU ? onTextColor : offTextColor}/>
            <path d="M101.216 90.3999996v-11.2h7.184v1.808h-5.28v2.704h3.44v1.808h-3.44v3.072h5.616v1.808z" id="E" fill={this.props.rightE ? onTextColor : offTextColor}/>
            <path d="M89.52 46.6239996l-1.392-.976 1.008-1.456.832-.672-1.088.256H87.2v-1.728h1.68l1.088.256-.832-.672-1.008-1.456 1.392-.976 1.184 1.664.224.976.224-.976 1.184-1.664 1.392.976-1.008 1.456-.832.672 1.088-.256h1.696v1.728h-1.696l-1.088-.256.832.672 1.008 1.456-1.392.976-1.184-1.664-.224-.976-.224.976z" id="starLetter" fill={this.props.leftO ? onTextColor : offTextColor}/>
            <path d="M76.928 90.5919996c-3.008 0-4.24-2.784-4.24-5.792s1.232-5.792 4.24-5.792 4.256 2.784 4.256 5.792-1.248 5.792-4.256 5.792zm0-1.808c1.584 0 2.272-1.984 2.272-3.984 0-2.128-.672-3.984-2.272-3.984-1.6 0-2.272 1.968-2.272 3.984 0 2.112.672 3.984 2.272 3.984z" id="O" fill={this.props.leftA ? onTextColor : offTextColor}/>
            <path d="M58.44 90.3999996l-.736-2.464h-3.552l-.736 2.464h-2.048l3.664-11.2h1.792l3.664 11.2H58.44zm-3.776-4.192h2.528l-.992-3.328c-.08-.256-.208-.832-.272-1.248-.08.416-.192.992-.272 1.248l-.992 3.328z" id="A" fill={this.props.star ? onTextColor : offTextColor}/>
            <path d="M70.536 54.392c0 1.376-.752 2.704-2.272 3.216L70.52 62.2h-2.112l-2.176-4.384h-1.328V62.2H63V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RLeft" fill={this.props.leftRLeft ? onTextColor : offTextColor}/>
            <path d="M63 34.2V23h1.904v4.528h3.616V23h1.904v11.2H68.52v-4.88h-3.616v4.88z" id="H" fill={this.props.leftH ? onTextColor : offTextColor}/>
            <path d="M42.648 62.2L41 51h1.712l.88 6.672c.032.224.08.496.112.784.032-.24.096-.512.16-.8L45.208 51h1.024l1.36 6.624c.064.304.128.56.16.784.032-.272.08-.544.112-.768l.768-6.64h1.808l-1.664 11.2h-1.504l-1.424-6.848c-.064-.304-.112-.56-.144-.816-.032.256-.096.512-.144.8L44.152 62.2h-1.504z" id="W" fill={this.props.leftW ? onTextColor : offTextColor}/>
            <path d="M42 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H42zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PLeft" fill={this.props.leftPLeft ? onTextColor : offTextColor}/>
            <path d="M26.952 62.2l-2.992-5.616-1.056 1.312V62.2H21V51h1.904v4.224L26.232 51h2.224l-3.216 3.984 3.936 7.216z" id="K" fill={this.props.leftK ? onTextColor : offTextColor}/>
            <path d="M24.248 34.2v-9.376H21V23h8.416v1.824h-3.264V34.2z" id="TLeft" fill={this.props.leftTLeft ? onTextColor : offTextColor}/>
            <path d="M3.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032C2.048 56.648.4 55.864.4 53.96.4 52.344 1.744 51 3.856 51c1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SLower" fill={this.props.leftSLower ? onTextColor : offTextColor}/>
            <path d="M3.984 34.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032C2.048 28.648.4 27.864.4 25.96.4 24.344 1.744 23 3.856 23c1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SUpper" fill={this.props.leftSUpper ? onTextColor : offTextColor}/>
            <path d="M89.1264 9.92000008l.3584-2.34240004h-1.408l.192-1.28000002h1.408l.2816-1.92000003H88.576l.192-1.26720002h1.3952l.32-2.15040003h1.3056001l-.32 2.15040003h1.6128l.3456-2.15040003h1.2928l-.32 2.15040003h1.408l-.1792 1.26720002h-1.4208l-.2944 1.92000003h1.3952l-.192 1.28000002h-1.3952l-.3584 2.34240004h-1.3056l.3584-2.34240004H90.7904l-.3584 2.34240004h-1.3056zm1.856-3.62240006h1.6256001l.2816-1.92000003H91.2768l-.2944 1.92000003z" id="hashLetter" fill={this.props.numberBar ? onTextColor : offTextColor}/>
          </g>
        </g>
      </svg>
    );
  }
}

export default AmericanStenoDiagram;

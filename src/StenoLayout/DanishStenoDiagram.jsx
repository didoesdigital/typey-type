import React, { Component } from "react";

let hidden = true;

const strokeColor = "#7109AA";
const onTextColor = "#fff";
const offTextColor = "#fff";

let rightDLowerOnColor = "#7109AA";
let rightDUpperOnColor = "#7109AA";
let rightSOnColor = "#7109AA";
let rightTOnColor = "#7109AA";
let rightKOnColor = "#7109AA";
let rightLOnColor = "#7109AA";
let rightEOnColor = "#7109AA";
let rightPOnColor = "#7109AA";
let rightROnColor = "#7109AA";
let rightFOnColor = "#7109AA";
let rightÅOnColor = "#7109AA";
let rightÆOnColor = "#7109AA";
let starOnColor = "#7109AA";
let leftOOnColor = "#7109AA";
let leftAOnColor = "#7109AA";
let leftROnColor = "#7109AA";
let leftHOnColor = "#7109AA";
let leftVOnColor = "#7109AA";
let leftPOnColor = "#7109AA";
let leftKOnColor = "#7109AA";
let leftTOnColor = "#7109AA";
let leftSLowerOnColor = "#7109AA";
let leftNOnColor = "#7109AA";
let numberBarOnColor = "#7109AA";

let rightDLowerOffColor = "#e9d9f2";
let rightDUpperOffColor = "#e9d9f2";
let rightSOffColor = "#e9d9f2";
let rightTOffColor = "#e9d9f2";
let rightKOffColor = "#e9d9f2";
let rightLOffColor = "#e9d9f2";
let rightEOffColor = "#e9d9f2";
let rightPOffColor = "#e9d9f2";
let rightROffColor = "#e9d9f2";
let rightFOffColor = "#e9d9f2";
let rightÅOffColor = "#e9d9f2";
let rightÆOffColor = "#e9d9f2";
let starOffColor = "#e9d9f2";
let leftOOffColor = "#e9d9f2";
let leftAOffColor = "#e9d9f2";
let leftROffColor = "#e9d9f2";
let leftHOffColor = "#e9d9f2";
let leftVOffColor = "#e9d9f2";
let leftPOffColor = "#e9d9f2";
let leftKOffColor = "#e9d9f2";
let leftTOffColor = "#e9d9f2";
let leftSLowerOffColor = "#e9d9f2";
let leftNOffColor = "#e9d9f2";
let numberBarOffColor = "#e9d9f2";

class DanishStenoDiagram extends Component {

  render() {
    // const strokeColor = "#321E3E";
    // const strokeColor = "#6c6076";
    // const offTextColor = "#CAC7CC";
    // const strokeColor = "hsla(277, 10%, 60%, 1)";
    // const strokeColor = "#321E3E";
    let diagramWidth = this.props.diagramWidth || 140;
    let svgDiagramID = this.props.id || "stenoDiagram";

    return (
      <svg id={svgDiagramID} viewBox="0 0 215 101" width={diagramWidth} xmlns="http://www.w3.org/2000/svg" aria-hidden={hidden} className={this.props.classes}>
        <g id={"stenoboard-" + this.props.brief } transform="translate(1 1)" fill="none" fillRule="evenodd">
          <rect id="rightDLower" stroke={strokeColor} fill={this.props.rightDLower ? rightDLowerOnColor : rightDLowerOffColor} x="195" y="48" width="18" height="23" rx="4"/>
          <rect id="rightDUpper" stroke={strokeColor} fill={this.props.rightDUpper ? rightDUpperOnColor : rightDUpperOffColor} x="195" y="20" width="18" height="23" rx="4"/>
          <rect id="rightS" stroke={strokeColor} fill={this.props.rightS ? rightSOnColor : rightSOffColor} x="174" y="48" width="18" height="23" rx="4"/>
          <rect id="rightT" stroke={strokeColor} fill={this.props.rightT ? rightTOnColor : rightTOffColor} x="174" y="20" width="18" height="23" rx="4"/>
          <rect id="rightK" stroke={strokeColor} fill={this.props.rightK ? rightKOnColor : rightKOffColor} x="153" y="48" width="18" height="23" rx="4"/>
          <rect id="rightL" stroke={strokeColor} fill={this.props.rightL ? rightLOnColor : rightLOffColor} x="153" y="20" width="18" height="23" rx="4"/>
          <rect id="rightE" stroke={strokeColor} fill={this.props.rightE ? rightEOnColor : rightEOffColor} x="132" y="48" width="18" height="23" rx="4"/>
          <rect id="rightP" stroke={strokeColor} fill={this.props.rightP ? rightPOnColor : rightPOffColor} x="132" y="20" width="18" height="23" rx="4"/>
          <rect id="rightR" stroke={strokeColor} fill={this.props.rightR ? rightROnColor : rightROffColor} x="111" y="48" width="18" height="23" rx="4"/>
          <rect id="rightF" stroke={strokeColor} fill={this.props.rightF ? rightFOnColor : rightFOffColor} x="111" y="20" width="18" height="23" rx="4"/>
          <rect id="rightÅ" stroke={strokeColor} fill={this.props.rightÅ ? rightÅOnColor : rightÅOffColor} x="122" y="76" width="18" height="23" rx="4"/>
          <rect id="rightÆ" stroke={strokeColor} fill={this.props.rightÆ ? rightÆOnColor : rightÆOffColor} x="101" y="76" width="18" height="23" rx="4"/>
          <rect id="star" stroke={strokeColor} fill={this.props.star ? starOnColor : starOffColor} x="86" y="20" width="20" height="51" rx="4"/>
          <rect id="leftO" stroke={strokeColor} fill={this.props.leftO ? leftOOnColor : leftOOffColor} x="73" y="76" width="18" height="23" rx="4"/>
          <rect id="leftA" stroke={strokeColor} fill={this.props.leftA ? leftAOnColor : leftAOffColor} x="52" y="76" width="18" height="23" rx="4"/>
          <rect id="leftR" stroke={strokeColor} fill={this.props.leftR ? leftROnColor : leftROffColor} x="63" y="48" width="18" height="23" rx="4"/>
          <rect id="leftH" stroke={strokeColor} fill={this.props.leftH ? leftHOnColor : leftHOffColor} x="63" y="20" width="18" height="23" rx="4"/>
          <rect id="leftV" stroke={strokeColor} fill={this.props.leftV ? leftVOnColor : leftVOffColor} x="42" y="48" width="18" height="23" rx="4"/>
          <rect id="leftP" stroke={strokeColor} fill={this.props.leftP ? leftPOnColor : leftPOffColor} x="42" y="20" width="18" height="23" rx="4"/>
          <rect id="leftK" stroke={strokeColor} fill={this.props.leftK ? leftKOnColor : leftKOffColor} x="21" y="48" width="18" height="23" rx="4"/>
          <rect id="leftT" stroke={strokeColor} fill={this.props.leftT ? leftTOnColor : leftTOffColor} x="21" y="20" width="18" height="23" rx="4"/>
          <rect id="leftSLower" stroke={strokeColor} fill={this.props.leftSLower ? leftSLowerOnColor : leftSLowerOffColor} y="48" width="18" height="23" rx="4"/>
          <rect id="leftN" stroke={strokeColor} fill={this.props.leftN ? leftNOnColor : leftNOffColor} y="20" width="18" height="23" rx="4"/>
          <rect id="numberBar" stroke={strokeColor} fill={this.props.numberBar ? numberBarOnColor : numberBarOffColor} width="213" height="15" rx="4"/>
          <g id="Outlines" transform="translate(5 2)" fill="#FFF">
            <path d="M195 62.2V51h2.816c3.744 0 5.152 2.816 5.152 5.6 0 2.56-1.28 5.6-5.216 5.6H195zm1.904-1.792h1.04c2.288 0 3.04-2.032 3.04-3.808 0-1.888-.832-3.808-2.864-3.808h-1.216v7.616z" id="DLower" fill={this.props.leftDLower ? onTextColor : offTextColor}/>
            <path d="M195 34.2V23h2.816c3.744 0 5.152 2.816 5.152 5.6 0 2.56-1.28 5.6-5.216 5.6H195zm1.904-1.792h1.04c2.288 0 3.04-2.032 3.04-3.808 0-1.888-.832-3.808-2.864-3.808h-1.216v7.616z" id="DUpper" fill={this.props.leftDUpper ? onTextColor : offTextColor}/>
            <path d="M177.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032-1.424-.624-3.072-1.408-3.072-3.312 0-1.616 1.344-2.96 3.456-2.96 1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SRight" fill={this.props.rightS ? onTextColor : offTextColor}/>
            <path d="M177.248 34.2v-9.376H174V23h8.416v1.824h-3.264V34.2z" id="TRight" fill={this.props.rightT ? onTextColor : offTextColor}/>
            <path d="M159.168 62.2l-2.992-5.616-1.056 1.312V62.2h-1.904V51h1.904v4.224L158.448 51h2.224l-3.216 3.984 3.936 7.216z" id="KRight" fill={this.props.rightK ? onTextColor : offTextColor}/>
            <path d="M153 34.2V23h1.904v9.376h5.168V34.2z" id="L" fill={this.props.rightL ? onTextColor : offTextColor}/>
            <path d="M132 62.2V51h7.184v1.808h-5.28v2.704h3.44v1.808h-3.44v3.072h5.616V62.2z" id="E" fill={this.props.leftE ? onTextColor : offTextColor}/>
            <path d="M132 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H132zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PRight" fill={this.props.rightP ? onTextColor : offTextColor}/>
            <path d="M118.536 54.392c0 1.376-.752 2.704-2.272 3.216l2.256 4.592h-2.112l-2.176-4.384h-1.328V62.2H111V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RRight" fill={this.props.rightR ? onTextColor : offTextColor}/>
            <path d="M111 34.2V23h7.552v1.808h-5.648v2.704h4.112v1.808h-4.112v4.88z" id="F" fill={this.props.leftF ? onTextColor : offTextColor}/>
            <path d="M128.44 91.4l-.736-2.464h-3.552l-.736 2.464h-2.048l3.392-10.368c-.512-.368-.848-.96-.848-1.632 0-1.12.912-1.984 2.016-1.984 1.12 0 2.016.864 2.016 1.984 0 .672-.336 1.264-.848 1.632l3.392 10.368h-2.048zm-2.512-12.72c-.4 0-.688.304-.688.72s.288.72.688.72c.368 0 .688-.304.688-.72s-.32-.72-.688-.72zm-1.264 8.528h2.528l-.992-3.328c-.08-.256-.208-.832-.272-1.248-.08.416-.192.992-.272 1.248l-.992 3.328z" id="Å" fill={this.props.rightÅ ? onTextColor : offTextColor}/>
            <path d="M107.12 89.624h2.672V91.4h-4.448v-2.464h-2.336l-.976 2.464H100l4.672-11.2h4.784v1.76h-2.336v2.784h1.696v1.744h-1.696v3.136zm-3.424-2.416l1.648-.016v-4.32c-.08.24-.24.752-.336 1.008l-1.312 3.328z" id="Æ" fill={this.props.rightÆ ? onTextColor : offTextColor}/>
            <path d="M89.52 46.6239996l-1.392-.976 1.008-1.456.832-.672-1.088.256H87.2v-1.728h1.68l1.088.256-.832-.672-1.008-1.456 1.392-.976 1.184 1.664.224.976.224-.976 1.184-1.664 1.392.976-1.008 1.456-.832.672 1.088-.256h1.696v1.728h-1.696l-1.088-.256.832.672 1.008 1.456-1.392.976-1.184-1.664-.224-.976-.224.976z" id="*" fill={this.props.leftO ? onTextColor : offTextColor}/>
            <path d="M76.928 90.5919996c-3.008 0-4.24-2.784-4.24-5.792s1.232-5.792 4.24-5.792 4.256 2.784 4.256 5.792-1.248 5.792-4.256 5.792zm0-1.808c1.584 0 2.272-1.984 2.272-3.984 0-2.128-.672-3.984-2.272-3.984-1.6 0-2.272 1.968-2.272 3.984 0 2.112.672 3.984 2.272 3.984z" id="O" fill={this.props.leftA ? onTextColor : offTextColor}/>
            <path d="M58.44 90.3999996l-.736-2.464h-3.552l-.736 2.464h-2.048l3.664-11.2h1.792l3.664 11.2H58.44zm-3.776-4.192h2.528l-.992-3.328c-.08-.256-.208-.832-.272-1.248-.08.416-.192.992-.272 1.248l-.992 3.328z" id="A" fill={this.props.star ? onTextColor : offTextColor}/>
            <path d="M70.536 54.392c0 1.376-.752 2.704-2.272 3.216L70.52 62.2h-2.112l-2.176-4.384h-1.328V62.2H63V51h3.872c2.768 0 3.664 1.632 3.664 3.392zm-5.632-1.6v3.232h2c1.28 0 1.68-.784 1.68-1.616 0-.752-.352-1.616-1.68-1.616h-2z" id="RLeft" fill={this.props.leftRLeft ? onTextColor : offTextColor}/>
            <path d="M63 34.2V23h1.904v4.528h3.616V23h1.904v11.2H68.52v-4.88h-3.616v4.88z" id="H" fill={this.props.leftH ? onTextColor : offTextColor}/>
            <path d="M45.016 62l-3.648-11.2h2.112l2.224 7.632c.08.272.16.8.224 1.04.048-.24.128-.752.208-1.024l2.256-7.648h2.096L46.84 62h-1.824z" id="V" fill={this.props.leftV ? onTextColor : offTextColor}/>
            <path d="M42 34.2V23h3.952c2.784 0 3.744 1.76 3.744 3.472 0 1.6-1.056 3.472-3.744 3.472h-2.048V34.2H42zm1.904-6.048h2.144c1.248 0 1.712-.88 1.712-1.68 0-.72-.384-1.68-1.712-1.68h-2.144v3.36z" id="PLeft" fill={this.props.leftPLeft ? onTextColor : offTextColor}/>
            <path d="M26.952 62.2l-2.992-5.616-1.056 1.312V62.2H21V51h1.904v4.224L26.232 51h2.224l-3.216 3.984 3.936 7.216z" id="KLeft" fill={this.props.leftK ? onTextColor : offTextColor}/>
            <path d="M24.248 34.2v-9.376H21V23h8.416v1.824h-3.264V34.2z" id="TLeft" fill={this.props.leftTLeft ? onTextColor : offTextColor}/>
            <path d="M3.984 62.584c-1.824 0-3.392-1.136-3.984-2.88l1.728-.64c.48 1.024 1.408 1.728 2.416 1.728.96 0 1.632-.496 1.632-1.488 0-.88-1.072-1.488-2.304-2.032C2.048 56.648.4 55.864.4 53.96.4 52.344 1.744 51 3.856 51c1.68 0 2.976 1.024 3.376 2.384l-1.712.576c-.32-.656-.928-1.168-1.776-1.168-.8 0-1.424.432-1.424 1.2 0 .784 1.008 1.152 2.144 1.68 1.392.64 3.232 1.584 3.232 3.584 0 2.128-1.728 3.328-3.712 3.328z" id="SLower" fill={this.props.leftSLower ? onTextColor : offTextColor}/>
            <path d="M.216 34.2V23h1.808l3.488 6.912c.112.192.288.496.4.768-.016-.304-.032-.576-.032-.768V23h1.76v11.2H5.912L2.36 27.256c-.112-.192-.304-.528-.416-.768.048.24.048.56.048.768V34.2H.216z" id="N" fill={this.props.leftN ? onTextColor : offTextColor}/>
            <path d="M89.1264 9.92000008l.3584-2.34240004h-1.408l.192-1.28000002h1.408l.2816-1.92000003H88.576l.192-1.26720002h1.3952l.32-2.15040003h1.3056001l-.32 2.15040003h1.6128l.3456-2.15040003h1.2928l-.32 2.15040003h1.408l-.1792 1.26720002h-1.4208l-.2944 1.92000003h1.3952l-.192 1.28000002h-1.3952l-.3584 2.34240004h-1.3056l.3584-2.34240004H90.7904l-.3584 2.34240004h-1.3056zm1.856-3.62240006h1.6256001l.2816-1.92000003H91.2768l-.2944 1.92000003z" id="#" fill={this.props.numberBar ? onTextColor : offTextColor}/>
          </g>
        </g>
      </svg>
    );
  }
}

export default DanishStenoDiagram;

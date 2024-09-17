import React, { Component } from "react";

const strokeColor = "#7109AA";
const onTextColor = "#fff";
const offTextColor = "#fff";

const rightZKeyOnColor = "#7109AA";
const rightZKeyOffColor = "#E9D9F2";
const rightDKeyOnColor = "#7109AA";
const rightDKeyOffColor = "#E9D9F2";
const rightSKeyOnColor = "#7109AA";
const rightSKeyOffColor = "#E9D9F2";
const rightTKeyOnColor = "#7109AA";
const rightTKeyOffColor = "#E9D9F2";
const rightHKeyOnColor = "#7109AA";
const rightHKeyOffColor = "#E9D9F2";
const rightGKeyOnColor = "#7109AA";
const rightGKeyOffColor = "#E9D9F2";
const rightPKeyOnColor = "#7109AA";
const rightPKeyOffColor = "#E9D9F2";
const rightBKeyOnColor = "#7109AA";
const rightBKeyOffColor = "#E9D9F2";
const rightWKeyOnColor = "#7109AA";
const rightWKeyOffColor = "#E9D9F2";
const rightRKeyOnColor = "#7109AA";
const rightRKeyOffColor = "#E9D9F2";
const rightUKeyOnColor = "#7109AA";
const rightUKeyOffColor = "#E9D9F2";
const rightEKeyOnColor = "#7109AA";
const rightEKeyOffColor = "#E9D9F2";
const starKeyOnColor = "#7109AA";
const starKeyOffColor = "#E9D9F2";
const leftOKeyOnColor = "#7109AA";
const leftOKeyOffColor = "#E9D9F2";
const leftAKeyOnColor = "#7109AA";
const leftAKeyOffColor = "#E9D9F2";
const leftRKeyOnColor = "#7109AA";
const leftRKeyOffColor = "#E9D9F2";
const leftLKeyOnColor = "#7109AA";
const leftLKeyOffColor = "#E9D9F2";
const leftPKeyOnColor = "#7109AA";
const leftPKeyOffColor = "#E9D9F2";
const leftFKeyOnColor = "#7109AA";
const leftFKeyOffColor = "#E9D9F2";
const leftTKeyOnColor = "#7109AA";
const leftTKeyOffColor = "#E9D9F2";
const leftKKeyOnColor = "#7109AA";
const leftKKeyOffColor = "#E9D9F2";
const leftSKeyOnColor = "#7109AA";
const leftSKeyOffColor = "#E9D9F2";

class BrazilianPortugueseStenoDiagram extends Component {
  render() {
    const diagramWidth = this.props.diagramWidth || 140;
    const svgDiagramID = this.props.id || "stenoDiagram";

    return (
      <svg
        id={svgDiagramID}
        width={diagramWidth}
        fill="none"
        viewBox="0 0 215 101"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={true}
        className={this.props.classes}
      >
        <g id={"stenoboard-" + this.props.brief}>
          <rect
            height="23"
            id="rightZKey"
            width="17"
            fill={this.props.rightZKey ? rightZKeyOnColor : rightZKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="186.5"
            y="38.5"
          />
          <rect
            height="23"
            id="rightDKey"
            width="17"
            fill={this.props.rightDKey ? rightDKeyOnColor : rightDKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="186.5"
            y="10.5"
          />
          <rect
            height="23"
            id="rightSKey"
            width="17"
            fill={this.props.rightSKey ? rightSKeyOnColor : rightSKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="166.5"
            y="38.5"
          />
          <rect
            height="23"
            id="rightTKey"
            width="17"
            fill={this.props.rightTKey ? rightTKeyOnColor : rightTKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="166.5"
            y="10.5"
          />
          <rect
            height="23"
            id="rightHKey"
            width="17"
            fill={this.props.rightHKey ? rightHKeyOnColor : rightHKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="146.5"
            y="38.5"
          />
          <rect
            height="23"
            id="rightGKey"
            width="17"
            fill={this.props.rightGKey ? rightGKeyOnColor : rightGKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="146.5"
            y="10.5"
          />
          <rect
            height="23"
            id="rightPKey"
            width="17"
            fill={this.props.rightPKey ? rightPKeyOnColor : rightPKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="126.5"
            y="38.5"
          />
          <rect
            height="23"
            id="rightBKey"
            width="17"
            fill={this.props.rightBKey ? rightBKeyOnColor : rightBKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="126.5"
            y="10.5"
          />
          <rect
            height="23"
            id="rightWKey"
            width="17"
            fill={this.props.rightWKey ? rightWKeyOnColor : rightWKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="106.5"
            y="38.5"
          />
          <rect
            height="23"
            id="rightRKey"
            width="17"
            fill={this.props.rightRKey ? rightRKeyOnColor : rightRKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="106.5"
            y="10.5"
          />
          <rect
            height="23"
            id="rightUKey"
            width="17"
            fill={this.props.rightUKey ? rightUKeyOnColor : rightUKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="120.5"
            y="66.5"
          />
          <rect
            height="23"
            id="rightEKey"
            width="17"
            fill={this.props.rightEKey ? rightEKeyOnColor : rightEKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="100.5"
            y="66.5"
          />
          <rect
            height="51"
            id="starKey"
            width="19"
            fill={this.props.starKey ? starKeyOnColor : starKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="82.5"
            y="10.5"
          />
          <rect
            height="23"
            id="leftOKey"
            width="17"
            fill={this.props.leftOKey ? leftOKeyOnColor : leftOKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="66.5"
            y="66.5"
          />
          <rect
            height="23"
            id="leftAKey"
            width="17"
            fill={this.props.leftAKey ? leftAKeyOnColor : leftAKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="46.5"
            y="66.5"
          />
          <rect
            height="23"
            id="leftRKey"
            width="17"
            fill={this.props.leftRKey ? leftRKeyOnColor : leftRKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="60.5"
            y="38.5"
          />
          <rect
            height="23"
            id="leftLKey"
            width="17"
            fill={this.props.leftLKey ? leftLKeyOnColor : leftLKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="60.5"
            y="10.5"
          />
          <rect
            height="23"
            id="leftPKey"
            width="17"
            fill={this.props.leftPKey ? leftPKeyOnColor : leftPKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="40.5"
            y="38.5"
          />
          <rect
            height="23"
            id="leftFKey"
            width="17"
            fill={this.props.leftFKey ? leftFKeyOnColor : leftFKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="40.5"
            y="10.5"
          />
          <rect
            height="23"
            id="leftTKey"
            width="17"
            fill={this.props.leftTKey ? leftTKeyOnColor : leftTKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="20.5"
            y="38.5"
          />
          <rect
            height="23"
            id="leftKKey"
            width="17"
            fill={this.props.leftKKey ? leftKKeyOnColor : leftKKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x="20.5"
            y="10.5"
          />
          <rect
            height="51"
            id="leftSKey"
            width="17"
            fill={this.props.leftSKey ? leftSKeyOnColor : leftSKeyOffColor}
            rx="3.5"
            stroke={strokeColor}
            x=".5"
            y="10.5"
          />
          <path
            id="rightZ"
            d="M198.64 43.8v1.232l-5.296 8.416h5.264V55h-7.376v-1.216l5.264-8.432H191.6V43.8z"
            fill={this.props.rightZ ? onTextColor : offTextColor}
          />
          <path
            id="rightD"
            d="M191.376 27V15.8h2.72q1.04 0 1.872.32t1.376.848q.56.528.928 1.264.368.72.528 1.52.16.784.16 1.648 0 .816-.144 1.568a6 6 0 0 1-.512 1.504 4.5 4.5 0 0 1-.896 1.296q-.544.544-1.424.896-.864.336-1.952.336zm1.632-1.536h1.152q.848 0 1.472-.352.624-.367.96-.976.352-.608.512-1.28.16-.688.16-1.456 0-1.695-.736-2.88-.736-1.2-2.192-1.2h-1.328z"
            fill={this.props.rightD ? onTextColor : offTextColor}
          />
          <path
            id="rightS"
            d="M175.04 55.192q-1.327 0-2.352-.736a4 4 0 0 1-1.44-1.936l1.52-.56q.336.768.96 1.232.64.464 1.424.464.816 0 1.28-.432.48-.432.48-1.248 0-.72-.608-1.232-.608-.528-1.664-.992a11 11 0 0 1-1.088-.528 8 8 0 0 1-.928-.64 2.64 2.64 0 0 1-.768-.928 2.9 2.9 0 0 1-.24-1.2q0-1.2.896-2.016.912-.832 2.4-.832 1.184 0 2.032.608.864.608 1.136 1.568l-1.488.496a1.96 1.96 0 0 0-.688-.816q-.448-.336-1.072-.336-.688 0-1.12.368-.432.352-.432.96 0 .32.144.576.16.255.496.496.336.224.608.368.272.128.8.368.032.015.048.032a.1.1 0 0 1 .048.016q.032 0 .048.016.64.305 1.088.576.449.255.96.688.512.432.784 1.024t.272 1.312q0 1.504-1.008 2.384t-2.528.88"
            fill={this.props.rightS ? onTextColor : offTextColor}
          />
          <path
            id="rightT"
            d="M174.112 27v-9.632h-3.248V15.8h8.128v1.568h-3.248V27z"
            fill={this.props.rightT ? onTextColor : offTextColor}
          />
          <path
            id="rightH"
            d="M151.376 55V43.8h1.648v4.624h3.824V43.8h1.632V55h-1.632v-5.024h-3.824V55z"
            fill={this.props.rightH ? onTextColor : offTextColor}
          />
          <path
            id="rightG"
            d="M155.152 27.192q-1.409 0-2.4-.848a4.9 4.9 0 0 1-1.408-2.128q-.416-1.28-.416-2.816 0-1.504.432-2.784a4.85 4.85 0 0 1 1.44-2.144q.991-.864 2.352-.864 1.248 0 2 .56t1.28 1.536l-1.456.832q-.752-1.392-1.824-1.392-.88 0-1.472.688a3.8 3.8 0 0 0-.832 1.6 8.3 8.3 0 0 0-.224 1.968q0 1.776.64 3.008.656 1.232 1.888 1.232.912 0 1.408-.624.496-.64.496-1.68v-.384h-1.984v-1.52h3.68v1.44q0 2.032-1.008 3.184-1.008 1.136-2.592 1.136"
            fill={this.props.rightG ? onTextColor : offTextColor}
          />
          <path
            id="rightP"
            d="M131.376 55V43.8h3.712q1.904 0 2.784.992.896.976.896 2.416 0 1.344-.928 2.384-.912 1.024-2.752 1.024h-2.064V55zm1.648-5.904h2.16q.977 0 1.44-.56.48-.56.48-1.328 0-.736-.448-1.312t-1.472-.576h-2.16z"
            fill={this.props.rightP ? onTextColor : offTextColor}
          />
          <path
            id="rightB"
            d="M131.376 27V15.8h3.504q1.856 0 2.688.848t.832 2.112q0 1.665-1.552 2.336.912.288 1.424 1.008.528.704.528 1.664 0 1.344-.896 2.288-.88.944-2.784.944zm1.648-6.56h1.584q1.072 0 1.616-.416.56-.432.56-1.184 0-1.536-1.84-1.536h-1.92zm0 5.04h2.24q1.04 0 1.472-.48.448-.48.448-1.184 0-1.872-2.4-1.872h-1.76z"
            fill={this.props.rightB ? onTextColor : offTextColor}
          />
          <path
            id="rightW"
            d="m112.128 55-1.712-11.2h1.504l.976 7.024.096.752a6 6 0 0 1 .144-.752l1.296-7.024h1.008l1.312 6.976q.096.4.144.704.016-.144.048-.368.032-.24.032-.32l.896-6.992h1.568L117.728 55h-1.312l-1.36-7.104q-.048-.224-.128-.768-.032.24-.128.752L113.44 55z"
            fill={this.props.rightW ? onTextColor : offTextColor}
          />
          <path
            id="rightR"
            d="M118.624 19.08q0 1.087-.592 1.968-.592.864-1.76 1.2l2.32 4.752h-1.824l-2.24-4.592h-1.504V27h-1.648V15.8h3.648q1.904 0 2.752.928t.848 2.352m-5.6-1.76v3.552h2.032q1.008 0 1.456-.496.464-.512.464-1.264 0-.72-.448-1.248-.432-.544-1.472-.544z"
            fill={this.props.rightR ? onTextColor : offTextColor}
          />
          <path
            id="rightU"
            d="M128.928 83.192q-1.68 0-2.688-1.056-1.008-1.072-1.008-3.392V71.8h1.648v6.944q0 2.896 2.048 2.896 2.064 0 2.064-2.896V71.8h1.632v6.944q0 2.304-1.008 3.376-.992 1.072-2.688 1.072"
            fill={this.props.rightU ? onTextColor : offTextColor}
          />
          <path
            id="rightE"
            d="M105.376 83V71.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V83z"
            fill={this.props.rightE ? onTextColor : offTextColor}
          />
          <path
            id="star"
            d="m90.52 38.16-1.248-.832.992-1.52.864-.8-1.168.272h-1.744v-1.52h1.744l1.168.256-.848-.784-.992-1.52 1.248-.832 1.104 1.664.288 1.072.304-1.072 1.104-1.664 1.248.832-.992 1.52-.864.784 1.168-.256h1.744v1.52h-1.744l-1.168-.272.864.8.992 1.52-1.248.832-1.104-1.664-.304-1.088-.304 1.088z"
            fill={this.props.star ? onTextColor : offTextColor}
          />
          <path
            id="leftO"
            d="M74.928 83.192q-1.04 0-1.84-.48a3.6 3.6 0 0 1-1.264-1.328 7.2 7.2 0 0 1-.704-1.84 10 10 0 0 1-.224-2.144q0-1.136.224-2.144.24-1.008.704-1.84t1.264-1.312q.8-.495 1.84-.496 1.056 0 1.856.496.8.48 1.264 1.312a6.8 6.8 0 0 1 .688 1.84q.225 1.008.224 2.144 0 1.136-.224 2.144a6.8 6.8 0 0 1-.688 1.84q-.464.832-1.264 1.328-.8.48-1.856.48m0-1.552q.784 0 1.328-.64.56-.64.784-1.568.225-.928.224-2.032 0-1.84-.576-3.04-.576-1.216-1.76-1.216-.784 0-1.328.656-.544.64-.768 1.568a8.7 8.7 0 0 0-.224 2.032q0 1.825.576 3.04.576 1.2 1.744 1.2"
            fill={this.props.leftO ? onTextColor : offTextColor}
          />
          <path
            id="leftA"
            d="m57.616 83-.8-2.608h-3.76L52.272 83h-1.76l3.664-11.2h1.488L59.36 83zm-4.096-4.096h2.832l-1.136-3.712a11 11 0 0 1-.288-1.168q-.112.592-.288 1.168z"
            fill={this.props.leftA ? onTextColor : offTextColor}
          />
          <path
            id="leftR"
            d="M72.624 47.08q0 1.087-.592 1.968-.592.864-1.76 1.2L72.592 55h-1.824l-2.24-4.592h-1.504V55h-1.648V43.8h3.648q1.905 0 2.752.928.848.928.848 2.352m-5.6-1.76v3.552h2.032q1.008 0 1.456-.496.465-.512.464-1.264 0-.72-.448-1.248-.432-.544-1.472-.544z"
            fill={this.props.leftR ? onTextColor : offTextColor}
          />
          <path
            id="leftL"
            d="M65.376 27V15.8h1.648v9.616h5.248V27z"
            fill={this.props.leftL ? onTextColor : offTextColor}
          />
          <path
            id="leftP"
            d="M45.376 55V43.8h3.712q1.904 0 2.784.992.896.976.896 2.416 0 1.344-.928 2.384-.912 1.024-2.752 1.024h-2.064V55zm1.648-5.904h2.16q.975 0 1.44-.56.48-.56.48-1.328 0-.736-.448-1.312-.449-.576-1.472-.576h-2.16z"
            fill={this.props.leftP ? onTextColor : offTextColor}
          />
          <path
            id="leftF"
            d="M45.376 27V15.8h7.296v1.552h-5.648v3.088h4.032v1.552h-4.032V27z"
            fill={this.props.leftF ? onTextColor : offTextColor}
          />
          <path
            id="leftT"
            d="M28.112 55v-9.632h-3.248V43.8h8.128v1.568h-3.248V55z"
            fill={this.props.leftT ? onTextColor : offTextColor}
          />
          <path
            id="leftK"
            d="m31.296 27-3.104-5.856-1.168 1.456V27h-1.648V15.8h1.648v4.512L30.56 15.8h1.904l-3.168 3.952L33.184 27z"
            fill={this.props.leftK ? onTextColor : offTextColor}
          />
          <path
            id="leftS"
            d="M9.04 40.192q-1.328 0-2.352-.736a4 4 0 0 1-1.44-1.936l1.52-.56q.336.768.96 1.232.64.464 1.424.464.816 0 1.28-.432.48-.432.48-1.248 0-.72-.608-1.232-.608-.528-1.664-.992-.672-.288-1.088-.528a8 8 0 0 1-.928-.64 2.6 2.6 0 0 1-.768-.928 2.9 2.9 0 0 1-.24-1.2q0-1.2.896-2.016.912-.832 2.4-.832 1.185 0 2.032.608.864.608 1.136 1.568l-1.488.496a1.95 1.95 0 0 0-.688-.816q-.448-.336-1.072-.336-.688 0-1.12.368-.432.352-.432.96 0 .32.144.576.16.255.496.496.336.224.608.368.272.128.8.368.032.015.048.032.016 0 .048.016.031 0 .048.016.64.305 1.088.576.448.255.96.688t.784 1.024.272 1.312q0 1.504-1.008 2.384t-2.528.88"
            fill={this.props.leftS ? onTextColor : offTextColor}
          />
        </g>
      </svg>
    );
  }
}

export default BrazilianPortugueseStenoDiagram;

import React, { Component } from "react";

const numberBarKeyStrokeColor = "#7109AA";
const numberBarKeyOnColor = "#7109AA";
const numberBarKeyOffColor = "#E9D9F2";
const leftSUpperKeyStrokeColor = "#7109AA";
const leftSUpperKeyOnColor = "#7109AA";
const leftSUpperKeyOffColor = "#E9D9F2";
const leftSLowerKeyStrokeColor = "#7109AA";
const leftSLowerKeyOnColor = "#7109AA";
const leftSLowerKeyOffColor = "#E9D9F2";
const leftTKeyStrokeColor = "#7109AA";
const leftTKeyOnColor = "#7109AA";
const leftTKeyOffColor = "#E9D9F2";
const leftKKeyStrokeColor = "#7109AA";
const leftKKeyOnColor = "#7109AA";
const leftKKeyOffColor = "#E9D9F2";
const leftPKeyStrokeColor = "#7109AA";
const leftPKeyOnColor = "#7109AA";
const leftPKeyOffColor = "#E9D9F2";
const leftWKeyStrokeColor = "#7109AA";
const leftWKeyOnColor = "#7109AA";
const leftWKeyOffColor = "#E9D9F2";
const leftHKeyStrokeColor = "#7109AA";
const leftHKeyOnColor = "#7109AA";
const leftHKeyOffColor = "#E9D9F2";
const leftRKeyStrokeColor = "#7109AA";
const leftRKeyOnColor = "#7109AA";
const leftRKeyOffColor = "#E9D9F2";
const leftAKeyStrokeColor = "#7109AA";
const leftAKeyOnColor = "#7109AA";
const leftAKeyOffColor = "#E9D9F2";
const leftOKeyStrokeColor = "#7109AA";
const leftOKeyOnColor = "#7109AA";
const leftOKeyOffColor = "#E9D9F2";
const starUpperKeyStrokeColor = "#7109AA";
const starUpperKeyOnColor = "#7109AA";
const starUpperKeyOffColor = "#E9D9F2";
const starLowerKeyStrokeColor = "#7109AA";
const starLowerKeyOnColor = "#7109AA";
const starLowerKeyOffColor = "#E9D9F2";
const rightEKeyStrokeColor = "#7109AA";
const rightEKeyOnColor = "#7109AA";
const rightEKeyOffColor = "#E9D9F2";
const rightUKeyStrokeColor = "#7109AA";
const rightUKeyOnColor = "#7109AA";
const rightUKeyOffColor = "#E9D9F2";
const rightFKeyStrokeColor = "#7109AA";
const rightFKeyOnColor = "#7109AA";
const rightFKeyOffColor = "#E9D9F2";
const rightRKeyStrokeColor = "#7109AA";
const rightRKeyOnColor = "#7109AA";
const rightRKeyOffColor = "#E9D9F2";
const rightPKeyStrokeColor = "#7109AA";
const rightPKeyOnColor = "#7109AA";
const rightPKeyOffColor = "#E9D9F2";
const rightBKeyStrokeColor = "#7109AA";
const rightBKeyOnColor = "#7109AA";
const rightBKeyOffColor = "#E9D9F2";
const rightLKeyStrokeColor = "#7109AA";
const rightLKeyOnColor = "#7109AA";
const rightLKeyOffColor = "#E9D9F2";
const rightGKeyStrokeColor = "#7109AA";
const rightGKeyOnColor = "#7109AA";
const rightGKeyOffColor = "#E9D9F2";
const rightTKeyStrokeColor = "#7109AA";
const rightTKeyOnColor = "#7109AA";
const rightTKeyOffColor = "#E9D9F2";
const rightSKeyStrokeColor = "#7109AA";
const rightSKeyOnColor = "#7109AA";
const rightSKeyOffColor = "#E9D9F2";
const rightDKeyStrokeColor = "#7109AA";
const rightDKeyOnColor = "#7109AA";
const rightDKeyOffColor = "#E9D9F2";
const rightZKeyStrokeColor = "#7109AA";
const rightZKeyOnColor = "#7109AA";
const rightZKeyOffColor = "#E9D9F2";
const numberBarOnColor = "#FFFFFF";
const numberBarOffColor = "#FFFFFF";
const leftSUpperOnColor = "#FFFFFF";
const leftSUpperOffColor = "#FFFFFF";
const leftSLowerOnColor = "#FFFFFF";
const leftSLowerOffColor = "#FFFFFF";
const leftTOnColor = "#FFFFFF";
const leftTOffColor = "#FFFFFF";
const leftKOnColor = "#FFFFFF";
const leftKOffColor = "#FFFFFF";
const leftPOnColor = "#FFFFFF";
const leftPOffColor = "#FFFFFF";
const leftWOnColor = "#FFFFFF";
const leftWOffColor = "#FFFFFF";
const leftHOnColor = "#FFFFFF";
const leftHOffColor = "#FFFFFF";
const leftROnColor = "#FFFFFF";
const leftROffColor = "#FFFFFF";
const leftAOnColor = "#FFFFFF";
const leftAOffColor = "#FFFFFF";
const leftOOnColor = "#FFFFFF";
const leftOOffColor = "#FFFFFF";
const starUpperOnColor = "#FFFFFF";
const starUpperOffColor = "#FFFFFF";
const starLowerOnColor = "#FFFFFF";
const starLowerOffColor = "#FFFFFF";
const rightEOnColor = "#FFFFFF";
const rightEOffColor = "#FFFFFF";
const rightUOnColor = "#FFFFFF";
const rightUOffColor = "#FFFFFF";
const rightFOnColor = "#FFFFFF";
const rightFOffColor = "#FFFFFF";
const rightROnColor = "#FFFFFF";
const rightROffColor = "#FFFFFF";
const rightPOnColor = "#FFFFFF";
const rightPOffColor = "#FFFFFF";
const rightBOnColor = "#FFFFFF";
const rightBOffColor = "#FFFFFF";
const rightLOnColor = "#FFFFFF";
const rightLOffColor = "#FFFFFF";
const rightGOnColor = "#FFFFFF";
const rightGOffColor = "#FFFFFF";
const rightTOnColor = "#FFFFFF";
const rightTOffColor = "#FFFFFF";
const rightSOnColor = "#FFFFFF";
const rightSOffColor = "#FFFFFF";
const rightDOnColor = "#FFFFFF";
const rightDOffColor = "#FFFFFF";
const rightZOnColor = "#FFFFFF";
const rightZOffColor = "#FFFFFF";

class NoNumberBarInnerThumbNumbersStenoDiagram extends Component {
  render() {
    const diagramWidth = this.props.diagramWidth || 140;
    const svgDiagramID = this.props.id || "stenoDiagram";

    return (
      <svg
        id={svgDiagramID}
        width={diagramWidth}
        fill="none"
        viewBox="0 0 204 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={true}
      >
        <g id={"stenoboard-" + this.props.brief}>
          <rect
            height="19"
            id="numberBarKey"
            width="17"
            fill={
              this.props.numberBarKey
                ? numberBarKeyOnColor
                : numberBarKeyOffColor
            }
            rx="3.5"
            stroke={numberBarKeyStrokeColor}
            x="83.5"
            y="63.5"
          />
          <rect
            height="19"
            id="leftSUpperKey"
            width="17"
            fill={
              this.props.leftSUpperKey
                ? leftSUpperKeyOnColor
                : leftSUpperKeyOffColor
            }
            rx="3.5"
            stroke={leftSUpperKeyStrokeColor}
            x="3.5"
            y="13.5"
          />
          <rect
            height="19"
            id="leftSLowerKey"
            width="17"
            fill={
              this.props.leftSLowerKey
                ? leftSLowerKeyOnColor
                : leftSLowerKeyOffColor
            }
            rx="3.5"
            stroke={leftSLowerKeyStrokeColor}
            x="3.5"
            y="37.5"
          />
          <rect
            height="19"
            id="leftTKey"
            width="17"
            fill={this.props.leftTKey ? leftTKeyOnColor : leftTKeyOffColor}
            rx="3.5"
            stroke={leftTKeyStrokeColor}
            x="23.5"
            y="13.5"
          />
          <rect
            height="19"
            id="leftKKey"
            width="17"
            fill={this.props.leftKKey ? leftKKeyOnColor : leftKKeyOffColor}
            rx="3.5"
            stroke={leftKKeyStrokeColor}
            x="23.5"
            y="37.5"
          />
          <rect
            height="19"
            id="leftPKey"
            width="17"
            fill={this.props.leftPKey ? leftPKeyOnColor : leftPKeyOffColor}
            rx="3.5"
            stroke={leftPKeyStrokeColor}
            x="43.5"
            y="13.5"
          />
          <rect
            height="19"
            id="leftWKey"
            width="17"
            fill={this.props.leftWKey ? leftWKeyOnColor : leftWKeyOffColor}
            rx="3.5"
            stroke={leftWKeyStrokeColor}
            x="43.5"
            y="37.5"
          />
          <rect
            height="19"
            id="leftHKey"
            width="17"
            fill={this.props.leftHKey ? leftHKeyOnColor : leftHKeyOffColor}
            rx="3.5"
            stroke={leftHKeyStrokeColor}
            x="63.5"
            y="13.5"
          />
          <rect
            height="19"
            id="leftRKey"
            width="17"
            fill={this.props.leftRKey ? leftRKeyOnColor : leftRKeyOffColor}
            rx="3.5"
            stroke={leftRKeyStrokeColor}
            x="63.5"
            y="37.5"
          />
          <rect
            height="19"
            id="leftAKey"
            width="17"
            fill={this.props.leftAKey ? leftAKeyOnColor : leftAKeyOffColor}
            rx="3.5"
            stroke={leftAKeyStrokeColor}
            x="43.5"
            y="63.5"
          />
          <rect
            height="19"
            id="leftOKey"
            width="17"
            fill={this.props.leftOKey ? leftOKeyOnColor : leftOKeyOffColor}
            rx="3.5"
            stroke={leftOKeyStrokeColor}
            x="63.5"
            y="63.5"
          />
          <rect
            height="19"
            id="starUpperKey"
            width="17"
            fill={
              this.props.starUpperKey
                ? starUpperKeyOnColor
                : starUpperKeyOffColor
            }
            rx="3.5"
            stroke={starUpperKeyStrokeColor}
            x="83.5"
            y="13.5"
          />
          <rect
            height="19"
            id="starLowerKey"
            width="17"
            fill={
              this.props.starLowerKey
                ? starLowerKeyOnColor
                : starLowerKeyOffColor
            }
            rx="3.5"
            stroke={starLowerKeyStrokeColor}
            x="83.5"
            y="37.5"
          />
          <rect
            height="19"
            id="rightEKey"
            width="17"
            fill={this.props.rightEKey ? rightEKeyOnColor : rightEKeyOffColor}
            rx="3.5"
            stroke={rightEKeyStrokeColor}
            x="103.5"
            y="63.5"
          />
          <rect
            height="19"
            id="rightUKey"
            width="17"
            fill={this.props.rightUKey ? rightUKeyOnColor : rightUKeyOffColor}
            rx="3.5"
            stroke={rightUKeyStrokeColor}
            x="123.5"
            y="63.5"
          />
          <rect
            height="19"
            id="rightFKey"
            width="17"
            fill={this.props.rightFKey ? rightFKeyOnColor : rightFKeyOffColor}
            rx="3.5"
            stroke={rightFKeyStrokeColor}
            x="103.5"
            y="13.5"
          />
          <rect
            height="19"
            id="rightRKey"
            width="17"
            fill={this.props.rightRKey ? rightRKeyOnColor : rightRKeyOffColor}
            rx="3.5"
            stroke={rightRKeyStrokeColor}
            x="103.5"
            y="37.5"
          />
          <rect
            height="19"
            id="rightPKey"
            width="17"
            fill={this.props.rightPKey ? rightPKeyOnColor : rightPKeyOffColor}
            rx="3.5"
            stroke={rightPKeyStrokeColor}
            x="123.5"
            y="13.5"
          />
          <rect
            height="19"
            id="rightBKey"
            width="17"
            fill={this.props.rightBKey ? rightBKeyOnColor : rightBKeyOffColor}
            rx="3.5"
            stroke={rightBKeyStrokeColor}
            x="123.5"
            y="37.5"
          />
          <rect
            height="19"
            id="rightLKey"
            width="17"
            fill={this.props.rightLKey ? rightLKeyOnColor : rightLKeyOffColor}
            rx="3.5"
            stroke={rightLKeyStrokeColor}
            x="143.5"
            y="13.5"
          />
          <rect
            height="19"
            id="rightGKey"
            width="17"
            fill={this.props.rightGKey ? rightGKeyOnColor : rightGKeyOffColor}
            rx="3.5"
            stroke={rightGKeyStrokeColor}
            x="143.5"
            y="37.5"
          />
          <rect
            height="19"
            id="rightTKey"
            width="17"
            fill={this.props.rightTKey ? rightTKeyOnColor : rightTKeyOffColor}
            rx="3.5"
            stroke={rightTKeyStrokeColor}
            x="163.5"
            y="13.5"
          />
          <rect
            height="19"
            id="rightSKey"
            width="17"
            fill={this.props.rightSKey ? rightSKeyOnColor : rightSKeyOffColor}
            rx="3.5"
            stroke={rightSKeyStrokeColor}
            x="163.5"
            y="37.5"
          />
          <rect
            height="19"
            id="rightDKey"
            width="17"
            fill={this.props.rightDKey ? rightDKeyOnColor : rightDKeyOffColor}
            rx="3.5"
            stroke={rightDKeyStrokeColor}
            x="183.5"
            y="13.5"
          />
          <rect
            height="19"
            id="rightZKey"
            width="17"
            fill={this.props.rightZKey ? rightZKeyOnColor : rightZKeyOffColor}
            rx="3.5"
            stroke={rightZKeyStrokeColor}
            x="183.5"
            y="37.5"
          />
          <path
            id="numberBar"
            d="M88.552 78l.464-3.04h-1.84l.224-1.408h1.824l.384-2.544h-1.776l.208-1.392h1.776l.432-2.816h1.456l-.432 2.816h2.112l.432-2.816h1.456l-.432 2.816h1.84l-.208 1.392h-1.84l-.4 2.544h1.792L95.8 74.96h-1.776L93.56 78h-1.456l.464-3.04h-2.096L90.008 78h-1.456zm2.128-4.448h2.096l.4-2.544h-2.112l-.384 2.544z"
            fill={this.props.numberBar ? numberBarOnColor : numberBarOffColor}
          />
          <path
            id="leftSUpper"
            d="M12.04 28.192c-.885 0-1.67-.245-2.352-.736a3.997 3.997 0 01-1.44-1.936l1.52-.56c.224.512.544.923.96 1.232.427.31.901.464 1.424.464.544 0 .97-.144 1.28-.432.32-.288.48-.704.48-1.248 0-.48-.203-.89-.608-1.232-.405-.352-.96-.683-1.664-.992-.448-.192-.81-.368-1.088-.528a8.19 8.19 0 01-.928-.64 2.635 2.635 0 01-.768-.928 2.87 2.87 0 01-.24-1.2c0-.8.299-1.472.896-2.016.608-.555 1.408-.832 2.4-.832.79 0 1.467.203 2.032.608.576.405.955.928 1.136 1.568l-1.488.496a1.954 1.954 0 00-.688-.816c-.299-.224-.656-.336-1.072-.336-.459 0-.832.123-1.12.368-.288.235-.432.555-.432.96 0 .213.048.405.144.576.107.17.272.336.496.496.224.15.427.272.608.368.181.085.448.208.8.368.021.01.037.021.048.032.01 0 .027.005.048.016.021 0 .037.005.048.016.427.203.79.395 1.088.576.299.17.619.4.96.688.341.288.603.63.784 1.024.181.395.272.832.272 1.312 0 1.003-.336 1.797-1.008 2.384-.672.587-1.515.88-2.528.88z"
            fill={
              this.props.leftSUpper ? leftSUpperOnColor : leftSUpperOffColor
            }
          />
          <path
            id="leftSLower"
            d="M12.04 52.192c-.885 0-1.67-.245-2.352-.736a3.997 3.997 0 01-1.44-1.936l1.52-.56c.224.512.544.923.96 1.232.427.31.901.464 1.424.464.544 0 .97-.144 1.28-.432.32-.288.48-.704.48-1.248 0-.48-.203-.89-.608-1.232-.405-.352-.96-.683-1.664-.992-.448-.192-.81-.368-1.088-.528a8.19 8.19 0 01-.928-.64 2.635 2.635 0 01-.768-.928 2.87 2.87 0 01-.24-1.2c0-.8.299-1.472.896-2.016.608-.555 1.408-.832 2.4-.832.79 0 1.467.203 2.032.608.576.405.955.928 1.136 1.568l-1.488.496a1.954 1.954 0 00-.688-.816c-.299-.224-.656-.336-1.072-.336-.459 0-.832.123-1.12.368-.288.235-.432.555-.432.96 0 .213.048.405.144.576.107.17.272.336.496.496.224.15.427.272.608.368.181.085.448.208.8.368.021.01.037.021.048.032.01 0 .027.005.048.016.021 0 .037.005.048.016.427.203.79.395 1.088.576.299.17.619.4.96.688.341.288.603.63.784 1.024.181.395.272.832.272 1.312 0 1.003-.336 1.797-1.008 2.384-.672.587-1.515.88-2.528.88z"
            fill={
              this.props.leftSLower ? leftSLowerOnColor : leftSLowerOffColor
            }
          />
          <path
            id="leftT"
            d="M31.112 28v-9.632h-3.248V16.8h8.128v1.568h-3.248V28h-1.632z"
            fill={this.props.leftT ? leftTOnColor : leftTOffColor}
          />
          <path
            id="leftK"
            d="M34.296 52l-3.104-5.856-1.168 1.456V52h-1.648V40.8h1.648v4.512L33.56 40.8h1.904l-3.168 3.952L36.184 52h-1.888z"
            fill={this.props.leftK ? leftKOnColor : leftKOffColor}
          />
          <path
            id="leftP"
            d="M48.376 28V16.8h3.712c1.27 0 2.197.33 2.784.992.597.65.896 1.456.896 2.416 0 .896-.31 1.69-.928 2.384-.608.683-1.525 1.024-2.752 1.024h-2.064V28h-1.648zm1.648-5.904h2.16c.65 0 1.13-.187 1.44-.56.32-.373.48-.816.48-1.328 0-.49-.15-.928-.448-1.312-.299-.384-.79-.576-1.472-.576h-2.16v3.776z"
            fill={this.props.leftP ? leftPOnColor : leftPOffColor}
          />
          <path
            id="leftW"
            d="M49.128 52l-1.712-11.2h1.504l.976 7.024.096.752a5.85 5.85 0 01.144-.752l1.296-7.024h1.008l1.312 6.976c.064.267.112.501.144.704.01-.096.027-.219.048-.368.021-.16.032-.267.032-.32l.896-6.992h1.568L54.728 52h-1.312l-1.36-7.104c-.032-.15-.075-.405-.128-.768-.021.16-.064.41-.128.752L50.44 52h-1.312z"
            fill={this.props.leftW ? leftWOnColor : leftWOffColor}
          />
          <path
            id="leftH"
            d="M68.376 28V16.8h1.648v4.624h3.824V16.8h1.632V28h-1.632v-5.024h-3.824V28h-1.648z"
            fill={this.props.leftH ? leftHOnColor : leftHOffColor}
          />
          <path
            id="leftR"
            d="M75.624 44.08c0 .725-.197 1.381-.592 1.968-.395.576-.981.976-1.76 1.2L75.592 52h-1.824l-2.24-4.592h-1.504V52h-1.648V40.8h3.648c1.27 0 2.187.31 2.752.928.565.619.848 1.403.848 2.352zm-5.6-1.76v3.552h2.032c.672 0 1.157-.165 1.456-.496.31-.341.464-.763.464-1.264 0-.48-.15-.896-.448-1.248-.288-.363-.779-.544-1.472-.544h-2.032z"
            fill={this.props.leftR ? leftROnColor : leftROffColor}
          />
          <path
            id="leftA"
            d="M54.616 78l-.8-2.608h-3.76L49.272 78h-1.76l3.664-11.2h1.488L56.36 78h-1.744zm-4.096-4.096h2.832l-1.136-3.712a10.943 10.943 0 01-.288-1.168c-.075.395-.17.784-.288 1.168l-1.12 3.712z"
            fill={this.props.leftA ? leftAOnColor : leftAOffColor}
          />
          <path
            id="leftO"
            d="M71.928 78.192c-.693 0-1.307-.16-1.84-.48a3.597 3.597 0 01-1.264-1.328 7.164 7.164 0 01-.704-1.84 9.868 9.868 0 01-.224-2.144c0-.757.075-1.472.224-2.144.16-.672.395-1.285.704-1.84.31-.555.73-.992 1.264-1.312.533-.33 1.147-.496 1.84-.496.704 0 1.323.165 1.856.496.533.32.955.757 1.264 1.312a6.77 6.77 0 01.688 1.84c.15.672.224 1.387.224 2.144 0 .757-.075 1.472-.224 2.144a6.77 6.77 0 01-.688 1.84c-.31.555-.73.997-1.264 1.328-.533.32-1.152.48-1.856.48zm0-1.552c.523 0 .965-.213 1.328-.64.373-.427.635-.95.784-1.568.15-.619.224-1.296.224-2.032 0-1.227-.192-2.24-.576-3.04-.384-.81-.97-1.216-1.76-1.216-.523 0-.965.219-1.328.656-.363.427-.619.95-.768 1.568a8.658 8.658 0 00-.224 2.032c0 1.216.192 2.23.576 3.04.384.8.965 1.2 1.744 1.2z"
            fill={this.props.leftO ? leftOOnColor : leftOOffColor}
          />
          <path
            id="starUpper"
            d="M90.52 26.16l-1.248-.832.992-1.52.864-.8-1.168.272h-1.744v-1.52h1.744l1.168.256-.848-.784-.992-1.52 1.248-.832 1.104 1.664.288 1.072.304-1.072 1.104-1.664 1.248.832-.992 1.52-.864.784 1.168-.256h1.744v1.52h-1.744l-1.168-.272.864.8.992 1.52-1.248.832-1.104-1.664-.304-1.088-.304 1.088-1.104 1.664z"
            fill={this.props.starUpper ? starUpperOnColor : starUpperOffColor}
          />
          <path
            id="starLower"
            d="M90.52 50.16l-1.248-.832.992-1.52.864-.8-1.168.272h-1.744v-1.52h1.744l1.168.256-.848-.784-.992-1.52 1.248-.832 1.104 1.664.288 1.072.304-1.072 1.104-1.664 1.248.832-.992 1.52-.864.784 1.168-.256h1.744v1.52h-1.744l-1.168-.272.864.8.992 1.52-1.248.832-1.104-1.664-.304-1.088-.304 1.088-1.104 1.664z"
            fill={this.props.starLower ? starLowerOnColor : starLowerOffColor}
          />
          <path
            id="rightE"
            d="M108.376 78V66.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V78h-7.216z"
            fill={this.props.rightE ? rightEOnColor : rightEOffColor}
          />
          <path
            id="rightU"
            d="M131.928 78.192c-1.12 0-2.016-.352-2.688-1.056-.672-.715-1.008-1.845-1.008-3.392V66.8h1.648v6.944c0 1.93.683 2.896 2.048 2.896 1.376 0 2.064-.965 2.064-2.896V66.8h1.632v6.944c0 1.536-.336 2.661-1.008 3.376-.661.715-1.557 1.072-2.688 1.072z"
            fill={this.props.rightU ? rightUOnColor : rightUOffColor}
          />
          <path
            id="rightF"
            d="M108.376 28V16.8h7.296v1.552h-5.648v3.088h4.032v1.552h-4.032V28h-1.648z"
            fill={this.props.rightF ? rightFOnColor : rightFOffColor}
          />
          <path
            id="rightR"
            d="M115.624 44.08c0 .725-.197 1.381-.592 1.968-.395.576-.981.976-1.76 1.2l2.32 4.752h-1.824l-2.24-4.592h-1.504V52h-1.648V40.8h3.648c1.269 0 2.187.31 2.752.928.565.619.848 1.403.848 2.352zm-5.6-1.76v3.552h2.032c.672 0 1.157-.165 1.456-.496.309-.341.464-.763.464-1.264 0-.48-.149-.896-.448-1.248-.288-.363-.779-.544-1.472-.544h-2.032z"
            fill={this.props.rightR ? rightROnColor : rightROffColor}
          />
          <path
            id="rightP"
            d="M128.376 28V16.8h3.712c1.269 0 2.197.33 2.784.992.597.65.896 1.456.896 2.416 0 .896-.309 1.69-.928 2.384-.608.683-1.525 1.024-2.752 1.024h-2.064V28h-1.648zm1.648-5.904h2.16c.651 0 1.131-.187 1.44-.56.32-.373.48-.816.48-1.328 0-.49-.149-.928-.448-1.312-.299-.384-.789-.576-1.472-.576h-2.16v3.776z"
            fill={this.props.rightP ? rightPOnColor : rightPOffColor}
          />
          <path
            id="rightB"
            d="M128.376 52V40.8h3.504c1.237 0 2.133.283 2.688.848.555.565.832 1.27.832 2.112 0 1.11-.517 1.888-1.552 2.336.608.192 1.083.528 1.424 1.008.352.47.528 1.024.528 1.664 0 .896-.299 1.659-.896 2.288-.587.63-1.515.944-2.784.944h-3.744zm1.648-6.56h1.584c.715 0 1.253-.139 1.616-.416.373-.288.56-.683.56-1.184 0-1.024-.613-1.536-1.84-1.536h-1.92v3.136zm0 5.04h2.24c.693 0 1.184-.16 1.472-.48.299-.32.448-.715.448-1.184 0-1.248-.8-1.872-2.4-1.872h-1.76v3.536z"
            fill={this.props.rightB ? rightBOnColor : rightBOffColor}
          />
          <path
            id="rightL"
            d="M148.376 28V16.8h1.648v9.616h5.248V28h-6.896z"
            fill={this.props.rightL ? rightLOnColor : rightLOffColor}
          />
          <path
            id="rightG"
            d="M152.152 52.192c-.938 0-1.738-.283-2.4-.848a4.917 4.917 0 01-1.408-2.128c-.277-.853-.416-1.792-.416-2.816 0-1.003.144-1.93.432-2.784a4.847 4.847 0 011.44-2.144c.662-.576 1.446-.864 2.352-.864.832 0 1.499.187 2 .56.502.373.928.885 1.28 1.536l-1.456.832c-.501-.928-1.109-1.392-1.824-1.392-.586 0-1.077.23-1.472.688a3.838 3.838 0 00-.832 1.6 8.252 8.252 0 00-.224 1.968c0 1.184.214 2.187.64 3.008.438.821 1.067 1.232 1.888 1.232.608 0 1.078-.208 1.408-.624.331-.427.496-.987.496-1.68v-.384h-1.984v-1.52h3.68v1.44c0 1.355-.336 2.416-1.008 3.184-.672.757-1.536 1.136-2.592 1.136z"
            fill={this.props.rightG ? rightGOnColor : rightGOffColor}
          />
          <path
            id="rightT"
            d="M171.112 28v-9.632h-3.248V16.8h8.128v1.568h-3.248V28h-1.632z"
            fill={this.props.rightT ? rightTOnColor : rightTOffColor}
          />
          <path
            id="rightS"
            d="M172.04 52.192c-.885 0-1.669-.245-2.352-.736a3.993 3.993 0 01-1.44-1.936l1.52-.56c.224.512.544.923.96 1.232.427.31.901.464 1.424.464.544 0 .971-.144 1.28-.432.32-.288.48-.704.48-1.248 0-.48-.203-.89-.608-1.232-.405-.352-.96-.683-1.664-.992a10.522 10.522 0 01-1.088-.528 8.188 8.188 0 01-.928-.64 2.642 2.642 0 01-.768-.928 2.87 2.87 0 01-.24-1.2c0-.8.299-1.472.896-2.016.608-.555 1.408-.832 2.4-.832.789 0 1.467.203 2.032.608.576.405.955.928 1.136 1.568l-1.488.496a1.955 1.955 0 00-.688-.816c-.299-.224-.656-.336-1.072-.336-.459 0-.832.123-1.12.368-.288.235-.432.555-.432.96 0 .213.048.405.144.576.107.17.272.336.496.496.224.15.427.272.608.368.181.085.448.208.8.368.021.01.037.021.048.032a.12.12 0 01.048.016c.021 0 .037.005.048.016.427.203.789.395 1.088.576.299.17.619.4.96.688.341.288.603.63.784 1.024.181.395.272.832.272 1.312 0 1.003-.336 1.797-1.008 2.384-.672.587-1.515.88-2.528.88z"
            fill={this.props.rightS ? rightSOnColor : rightSOffColor}
          />
          <path
            id="rightD"
            d="M188.376 28V16.8h2.72c.693 0 1.317.107 1.872.32.555.213 1.013.496 1.376.848.373.352.683.773.928 1.264.245.48.421.987.528 1.52.107.523.16 1.072.16 1.648 0 .544-.048 1.067-.144 1.568a5.989 5.989 0 01-.512 1.504 4.527 4.527 0 01-.896 1.296c-.363.363-.837.661-1.424.896-.576.224-1.227.336-1.952.336h-2.656zm1.632-1.536h1.152c.565 0 1.056-.117 1.472-.352.416-.245.736-.57.96-.976.235-.405.405-.832.512-1.28.107-.459.16-.944.16-1.456 0-1.13-.245-2.09-.736-2.88-.491-.8-1.221-1.2-2.192-1.2h-1.328v8.144z"
            fill={this.props.rightD ? rightDOnColor : rightDOffColor}
          />
          <path
            id="rightZ"
            d="M195.64 40.8v1.232l-5.296 8.416h5.264V52h-7.376v-1.216l5.264-8.432H188.6V40.8h7.04z"
            fill={this.props.rightZ ? rightZOnColor : rightZOffColor}
          />
        </g>
      </svg>
    );
  }
}

export default NoNumberBarInnerThumbNumbersStenoDiagram;

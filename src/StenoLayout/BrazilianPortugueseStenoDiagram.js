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
            x="0.5"
            y="10.5"
          />
          <g id="Outlines" fill="#FFF">
            <path
              id="rightZ"
              d="M198.64 43.8v1.232l-5.296 8.416h5.264V55h-7.376v-1.216l5.264-8.432H191.6V43.8h7.04z"
              fill={this.props.rightZ ? onTextColor : offTextColor}
            />
            <path
              id="rightD"
              d="M191.376 27V15.8h2.72c.693 0 1.317.107 1.872.32.555.213 1.013.496 1.376.848.373.352.683.773.928 1.264.245.48.421.987.528 1.52.107.523.16 1.072.16 1.648 0 .544-.048 1.067-.144 1.568a5.989 5.989 0 01-.512 1.504 4.527 4.527 0 01-.896 1.296c-.363.363-.837.661-1.424.896-.576.224-1.227.336-1.952.336h-2.656zm1.632-1.536h1.152c.565 0 1.056-.117 1.472-.352.416-.245.736-.57.96-.976.235-.405.405-.832.512-1.28.107-.459.16-.944.16-1.456 0-1.13-.245-2.09-.736-2.88-.491-.8-1.221-1.2-2.192-1.2h-1.328v8.144z"
              fill={this.props.rightD ? onTextColor : offTextColor}
            />
            <path
              id="rightS"
              d="M175.04 55.192c-.885 0-1.669-.245-2.352-.736a3.993 3.993 0 01-1.44-1.936l1.52-.56c.224.512.544.923.96 1.232.427.31.901.464 1.424.464.544 0 .971-.144 1.28-.432.32-.288.48-.704.48-1.248 0-.48-.203-.89-.608-1.232-.405-.352-.96-.683-1.664-.992a10.522 10.522 0 01-1.088-.528 8.188 8.188 0 01-.928-.64 2.642 2.642 0 01-.768-.928 2.87 2.87 0 01-.24-1.2c0-.8.299-1.472.896-2.016.608-.555 1.408-.832 2.4-.832.789 0 1.467.203 2.032.608.576.405.955.928 1.136 1.568l-1.488.496a1.955 1.955 0 00-.688-.816c-.299-.224-.656-.336-1.072-.336-.459 0-.832.123-1.12.368-.288.235-.432.555-.432.96 0 .213.048.405.144.576.107.17.272.336.496.496.224.15.427.272.608.368.181.085.448.208.8.368.021.01.037.021.048.032a.12.12 0 01.048.016c.021 0 .037.005.048.016.427.203.789.395 1.088.576.299.17.619.4.96.688.341.288.603.63.784 1.024.181.395.272.832.272 1.312 0 1.003-.336 1.797-1.008 2.384-.672.587-1.515.88-2.528.88z"
              fill={this.props.rightS ? onTextColor : offTextColor}
            />
            <path
              id="rightT"
              d="M174.112 27v-9.632h-3.248V15.8h8.128v1.568h-3.248V27h-1.632z"
              fill={this.props.rightT ? onTextColor : offTextColor}
            />
            <path
              id="rightH"
              d="M151.376 55V43.8h1.648v4.624h3.824V43.8h1.632V55h-1.632v-5.024h-3.824V55h-1.648z"
              fill={this.props.rightH ? onTextColor : offTextColor}
            />
            <path
              id="rightG"
              d="M155.152 27.192c-.939 0-1.739-.283-2.4-.848a4.908 4.908 0 01-1.408-2.128c-.277-.853-.416-1.792-.416-2.816 0-1.003.144-1.93.432-2.784a4.847 4.847 0 011.44-2.144c.661-.576 1.445-.864 2.352-.864.832 0 1.499.187 2 .56.501.373.928.885 1.28 1.536l-1.456.832c-.501-.928-1.109-1.392-1.824-1.392-.587 0-1.077.23-1.472.688a3.827 3.827 0 00-.832 1.6 8.252 8.252 0 00-.224 1.968c0 1.184.213 2.187.64 3.008.437.821 1.067 1.232 1.888 1.232.608 0 1.077-.208 1.408-.624.331-.427.496-.987.496-1.68v-.384h-1.984v-1.52h3.68v1.44c0 1.355-.336 2.416-1.008 3.184-.672.757-1.536 1.136-2.592 1.136z"
              fill={this.props.rightG ? onTextColor : offTextColor}
            />
            <path
              id="rightP"
              d="M131.376 55V43.8h3.712c1.269 0 2.197.33 2.784.992.597.65.896 1.456.896 2.416 0 .896-.309 1.69-.928 2.384-.608.683-1.525 1.024-2.752 1.024h-2.064V55h-1.648zm1.648-5.904h2.16c.651 0 1.131-.187 1.44-.56.32-.373.48-.816.48-1.328 0-.49-.149-.928-.448-1.312-.299-.384-.789-.576-1.472-.576h-2.16v3.776z"
              fill={this.props.rightP ? onTextColor : offTextColor}
            />
            <path
              id="rightB"
              d="M131.376 27V15.8h3.504c1.237 0 2.133.283 2.688.848.555.565.832 1.27.832 2.112 0 1.11-.517 1.888-1.552 2.336.608.192 1.083.528 1.424 1.008.352.47.528 1.024.528 1.664 0 .896-.299 1.659-.896 2.288-.587.63-1.515.944-2.784.944h-3.744zm1.648-6.56h1.584c.715 0 1.253-.139 1.616-.416.373-.288.56-.683.56-1.184 0-1.024-.613-1.536-1.84-1.536h-1.92v3.136zm0 5.04h2.24c.693 0 1.184-.16 1.472-.48.299-.32.448-.715.448-1.184 0-1.248-.8-1.872-2.4-1.872h-1.76v3.536z"
              fill={this.props.rightB ? onTextColor : offTextColor}
            />
            <path
              id="rightW"
              d="M112.128 55l-1.712-11.2h1.504l.976 7.024.096.752a5.85 5.85 0 01.144-.752l1.296-7.024h1.008l1.312 6.976c.064.267.112.501.144.704.011-.096.027-.219.048-.368.021-.16.032-.267.032-.32l.896-6.992h1.568L117.728 55h-1.312l-1.36-7.104c-.032-.15-.075-.405-.128-.768-.021.16-.064.41-.128.752L113.44 55h-1.312z"
              fill={this.props.rightW ? onTextColor : offTextColor}
            />
            <path
              id="rightR"
              d="M118.624 19.08c0 .725-.197 1.381-.592 1.968-.395.576-.981.976-1.76 1.2l2.32 4.752h-1.824l-2.24-4.592h-1.504V27h-1.648V15.8h3.648c1.269 0 2.187.31 2.752.928.565.619.848 1.403.848 2.352zm-5.6-1.76v3.552h2.032c.672 0 1.157-.165 1.456-.496.309-.341.464-.763.464-1.264 0-.48-.149-.896-.448-1.248-.288-.363-.779-.544-1.472-.544h-2.032z"
              fill={this.props.rightR ? onTextColor : offTextColor}
            />
            <path
              id="rightU"
              d="M128.928 83.192c-1.12 0-2.016-.352-2.688-1.056-.672-.715-1.008-1.845-1.008-3.392V71.8h1.648v6.944c0 1.93.683 2.896 2.048 2.896 1.376 0 2.064-.965 2.064-2.896V71.8h1.632v6.944c0 1.536-.336 2.661-1.008 3.376-.661.715-1.557 1.072-2.688 1.072z"
              fill={this.props.rightU ? onTextColor : offTextColor}
            />
            <path
              id="rightE"
              d="M105.376 83V71.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V83h-7.216z"
              fill={this.props.rightE ? onTextColor : offTextColor}
            />
            <path
              id="star"
              d="M90.52 38.16l-1.248-.832.992-1.52.864-.8-1.168.272h-1.744v-1.52h1.744l1.168.256-.848-.784-.992-1.52 1.248-.832 1.104 1.664.288 1.072.304-1.072 1.104-1.664 1.248.832-.992 1.52-.864.784 1.168-.256h1.744v1.52h-1.744l-1.168-.272.864.8.992 1.52-1.248.832-1.104-1.664-.304-1.088-.304 1.088-1.104 1.664z"
              fill={this.props.star ? onTextColor : offTextColor}
            />
            <path
              id="leftO"
              d="M74.928 83.192c-.693 0-1.307-.16-1.84-.48a3.597 3.597 0 01-1.264-1.328 7.164 7.164 0 01-.704-1.84 9.868 9.868 0 01-.224-2.144c0-.757.075-1.472.224-2.144.16-.672.395-1.285.704-1.84.31-.555.73-.992 1.264-1.312.533-.33 1.147-.496 1.84-.496.704 0 1.323.165 1.856.496.533.32.955.757 1.264 1.312a6.77 6.77 0 01.688 1.84c.15.672.224 1.387.224 2.144 0 .757-.075 1.472-.224 2.144a6.77 6.77 0 01-.688 1.84c-.31.555-.73.997-1.264 1.328-.533.32-1.152.48-1.856.48zm0-1.552c.523 0 .965-.213 1.328-.64.373-.427.635-.95.784-1.568.15-.619.224-1.296.224-2.032 0-1.227-.192-2.24-.576-3.04-.384-.81-.97-1.216-1.76-1.216-.523 0-.965.219-1.328.656-.363.427-.619.95-.768 1.568a8.658 8.658 0 00-.224 2.032c0 1.216.192 2.23.576 3.04.384.8.965 1.2 1.744 1.2z"
              fill={this.props.leftO ? onTextColor : offTextColor}
            />
            <path
              id="leftA"
              d="M57.616 83l-.8-2.608h-3.76L52.272 83h-1.76l3.664-11.2h1.488L59.36 83h-1.744zm-4.096-4.096h2.832l-1.136-3.712a10.943 10.943 0 01-.288-1.168c-.075.395-.17.784-.288 1.168l-1.12 3.712z"
              fill={this.props.leftA ? onTextColor : offTextColor}
            />
            <path
              id="leftR"
              d="M72.624 47.08c0 .725-.197 1.381-.592 1.968-.395.576-.981.976-1.76 1.2L72.592 55h-1.824l-2.24-4.592h-1.504V55h-1.648V43.8h3.648c1.27 0 2.187.31 2.752.928.565.619.848 1.403.848 2.352zm-5.6-1.76v3.552h2.032c.672 0 1.157-.165 1.456-.496.31-.341.464-.763.464-1.264 0-.48-.15-.896-.448-1.248-.288-.363-.779-.544-1.472-.544h-2.032z"
              fill={this.props.leftR ? onTextColor : offTextColor}
            />
            <path
              id="leftL"
              d="M65.376 27V15.8h1.648v9.616h5.248V27h-6.896z"
              fill={this.props.leftL ? onTextColor : offTextColor}
            />
            <path
              id="leftP"
              d="M45.376 55V43.8h3.712c1.27 0 2.197.33 2.784.992.597.65.896 1.456.896 2.416 0 .896-.31 1.69-.928 2.384-.608.683-1.525 1.024-2.752 1.024h-2.064V55h-1.648zm1.648-5.904h2.16c.65 0 1.13-.187 1.44-.56.32-.373.48-.816.48-1.328 0-.49-.15-.928-.448-1.312-.299-.384-.79-.576-1.472-.576h-2.16v3.776z"
              fill={this.props.leftP ? onTextColor : offTextColor}
            />
            <path
              id="leftF"
              d="M45.376 27V15.8h7.296v1.552h-5.648v3.088h4.032v1.552h-4.032V27h-1.648z"
              fill={this.props.leftF ? onTextColor : offTextColor}
            />
            <path
              id="leftT"
              d="M28.112 55v-9.632h-3.248V43.8h8.128v1.568h-3.248V55h-1.632z"
              fill={this.props.leftT ? onTextColor : offTextColor}
            />
            <path
              id="leftK"
              d="M31.296 27l-3.104-5.856-1.168 1.456V27h-1.648V15.8h1.648v4.512L30.56 15.8h1.904l-3.168 3.952L33.184 27h-1.888z"
              fill={this.props.leftK ? onTextColor : offTextColor}
            />
            <path
              id="leftS"
              d="M9.04 40.192c-.885 0-1.67-.245-2.352-.736a3.997 3.997 0 01-1.44-1.936l1.52-.56c.224.512.544.923.96 1.232.427.31.901.464 1.424.464.544 0 .97-.144 1.28-.432.32-.288.48-.704.48-1.248 0-.48-.203-.89-.608-1.232-.405-.352-.96-.683-1.664-.992-.448-.192-.81-.368-1.088-.528a8.187 8.187 0 01-.928-.64 2.635 2.635 0 01-.768-.928 2.87 2.87 0 01-.24-1.2c0-.8.299-1.472.896-2.016.608-.555 1.408-.832 2.4-.832.79 0 1.467.203 2.032.608.576.405.955.928 1.136 1.568l-1.488.496a1.954 1.954 0 00-.688-.816c-.299-.224-.656-.336-1.072-.336-.459 0-.832.123-1.12.368-.288.235-.432.555-.432.96 0 .213.048.405.144.576.107.17.272.336.496.496.224.15.427.272.608.368.181.085.448.208.8.368.021.01.037.021.048.032.01 0 .027.005.048.016.021 0 .037.005.048.016.427.203.79.395 1.088.576.299.17.619.4.96.688.341.288.603.63.784 1.024.181.395.272.832.272 1.312 0 1.003-.336 1.797-1.008 2.384-.672.587-1.515.88-2.528.88z"
              fill={this.props.leftS ? onTextColor : offTextColor}
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default BrazilianPortugueseStenoDiagram;

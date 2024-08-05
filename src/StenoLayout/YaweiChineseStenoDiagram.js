import React, { Component } from "react";

const RightHashKeyStrokeColor = "#7109AA";
const RightHashKeyOnColor = "#7109AA";
const RightHashKeyOffColor = "#E9D9F2";
const RightOKeyStrokeColor = "#7109AA";
const RightOKeyOnColor = "#7109AA";
const RightOKeyOffColor = "#E9D9F2";
const RightAKeyStrokeColor = "#7109AA";
const RightAKeyOnColor = "#7109AA";
const RightAKeyOffColor = "#E9D9F2";
const RightEKeyStrokeColor = "#7109AA";
const RightEKeyOnColor = "#7109AA";
const RightEKeyOffColor = "#E9D9F2";
const RightNKeyStrokeColor = "#7109AA";
const RightNKeyOnColor = "#7109AA";
const RightNKeyOffColor = "#E9D9F2";
const RightUKeyStrokeColor = "#7109AA";
const RightUKeyOnColor = "#7109AA";
const RightUKeyOffColor = "#E9D9F2";
const RightIKeyStrokeColor = "#7109AA";
const RightIKeyOnColor = "#7109AA";
const RightIKeyOffColor = "#E9D9F2";
const RightWKeyStrokeColor = "#7109AA";
const RightWKeyOnColor = "#7109AA";
const RightWKeyOffColor = "#E9D9F2";
const RightGKeyStrokeColor = "#7109AA";
const RightGKeyOnColor = "#7109AA";
const RightGKeyOffColor = "#E9D9F2";
const RightZKeyStrokeColor = "#7109AA";
const RightZKeyOnColor = "#7109AA";
const RightZKeyOffColor = "#E9D9F2";
const RightDKeyStrokeColor = "#7109AA";
const RightDKeyOnColor = "#7109AA";
const RightDKeyOffColor = "#E9D9F2";
const RightBKeyStrokeColor = "#7109AA";
const RightBKeyOnColor = "#7109AA";
const RightBKeyOffColor = "#E9D9F2";
const RightXKeyStrokeColor = "#7109AA";
const RightXKeyOnColor = "#7109AA";
const RightXKeyOffColor = "#E9D9F2";
const LeftHashKeyStrokeColor = "#7109AA";
const LeftHashKeyOnColor = "#7109AA";
const LeftHashKeyOffColor = "#E9D9F2";
const LeftXKeyStrokeColor = "#7109AA";
const LeftXKeyOnColor = "#7109AA";
const LeftXKeyOffColor = "#E9D9F2";
const LeftBKeyStrokeColor = "#7109AA";
const LeftBKeyOnColor = "#7109AA";
const LeftBKeyOffColor = "#E9D9F2";
const LeftDKeyStrokeColor = "#7109AA";
const LeftDKeyOnColor = "#7109AA";
const LeftDKeyOffColor = "#E9D9F2";
const LeftZKeyStrokeColor = "#7109AA";
const LeftZKeyOnColor = "#7109AA";
const LeftZKeyOffColor = "#E9D9F2";
const LeftGKeyStrokeColor = "#7109AA";
const LeftGKeyOnColor = "#7109AA";
const LeftGKeyOffColor = "#E9D9F2";
const LeftWKeyStrokeColor = "#7109AA";
const LeftWKeyOnColor = "#7109AA";
const LeftWKeyOffColor = "#E9D9F2";
const LeftIKeyStrokeColor = "#7109AA";
const LeftIKeyOnColor = "#7109AA";
const LeftIKeyOffColor = "#E9D9F2";
const LeftUKeyStrokeColor = "#7109AA";
const LeftUKeyOnColor = "#7109AA";
const LeftUKeyOffColor = "#E9D9F2";
const LeftNKeyStrokeColor = "#7109AA";
const LeftNKeyOnColor = "#7109AA";
const LeftNKeyOffColor = "#E9D9F2";
const LeftEKeyStrokeColor = "#7109AA";
const LeftEKeyOnColor = "#7109AA";
const LeftEKeyOffColor = "#E9D9F2";
const LeftAKeyStrokeColor = "#7109AA";
const LeftAKeyOnColor = "#7109AA";
const LeftAKeyOffColor = "#E9D9F2";
const LeftOKeyStrokeColor = "#7109AA";
const LeftOKeyOnColor = "#7109AA";
const LeftOKeyOffColor = "#E9D9F2";
const LeftHashOnColor = "#FFFFFF";
const LeftHashOffColor = "#FFFFFF";
const LeftOOnColor = "#FFFFFF";
const LeftOOffColor = "#FFFFFF";
const LeftAOnColor = "#FFFFFF";
const LeftAOffColor = "#FFFFFF";
const LeftEOnColor = "#FFFFFF";
const LeftEOffColor = "#FFFFFF";
const LeftNOnColor = "#FFFFFF";
const LeftNOffColor = "#FFFFFF";
const LeftUOnColor = "#FFFFFF";
const LeftUOffColor = "#FFFFFF";
const LeftIOnColor = "#FFFFFF";
const LeftIOffColor = "#FFFFFF";
const LeftWOnColor = "#FFFFFF";
const LeftWOffColor = "#FFFFFF";
const LeftGOnColor = "#FFFFFF";
const LeftGOffColor = "#FFFFFF";
const LeftZOnColor = "#FFFFFF";
const LeftZOffColor = "#FFFFFF";
const LeftDOnColor = "#FFFFFF";
const LeftDOffColor = "#FFFFFF";
const LeftBOnColor = "#FFFFFF";
const LeftBOffColor = "#FFFFFF";
const LeftXOnColor = "#FFFFFF";
const LeftXOffColor = "#FFFFFF";
const RightHashOnColor = "#FFFFFF";
const RightHashOffColor = "#FFFFFF";
const RightXOnColor = "#FFFFFF";
const RightXOffColor = "#FFFFFF";
const RightBOnColor = "#FFFFFF";
const RightBOffColor = "#FFFFFF";
const RightDOnColor = "#FFFFFF";
const RightDOffColor = "#FFFFFF";
const RightZOnColor = "#FFFFFF";
const RightZOffColor = "#FFFFFF";
const RightGOnColor = "#FFFFFF";
const RightGOffColor = "#FFFFFF";
const RightWOnColor = "#FFFFFF";
const RightWOffColor = "#FFFFFF";
const RightIOnColor = "#FFFFFF";
const RightIOffColor = "#FFFFFF";
const RightUOnColor = "#FFFFFF";
const RightUOffColor = "#FFFFFF";
const RightNOnColor = "#FFFFFF";
const RightNOffColor = "#FFFFFF";
const RightEOnColor = "#FFFFFF";
const RightEOffColor = "#FFFFFF";
const RightAOnColor = "#FFFFFF";
const RightAOffColor = "#FFFFFF";
const RightOOnColor = "#FFFFFF";
const RightOOffColor = "#FFFFFF";

class YaweiChineseStenoDiagram extends Component {
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
        className={this.props.classes}
      >
        <g id={"stenoboard-" + this.props.brief}>
          <rect
            height="15"
            id="RightHashKey"
            width="90"
            fill={
              this.props.RightHashKey
                ? RightHashKeyOnColor
                : RightHashKeyOffColor
            }
            rx="3.5"
            stroke={RightHashKeyStrokeColor}
            x="113"
            y="1"
          />
          <rect
            height="21"
            id="RightOKey"
            width="14"
            fill={this.props.RightOKey ? RightOKeyOnColor : RightOKeyOffColor}
            rx="3.5"
            stroke={RightOKeyStrokeColor}
            x="189"
            y="46"
          />
          <rect
            height="21"
            id="RightAKey"
            width="14"
            fill={this.props.RightAKey ? RightAKeyOnColor : RightAKeyOffColor}
            rx="3.5"
            stroke={RightAKeyStrokeColor}
            x="189"
            y="20"
          />
          <rect
            height="21"
            id="RightEKey"
            width="14"
            fill={this.props.RightEKey ? RightEKeyOnColor : RightEKeyOffColor}
            rx="3.5"
            stroke={RightEKeyStrokeColor}
            x="170"
            y="46"
          />
          <rect
            height="21"
            id="RightNKey"
            width="14"
            fill={this.props.RightNKey ? RightNKeyOnColor : RightNKeyOffColor}
            rx="3.5"
            stroke={RightNKeyStrokeColor}
            x="170"
            y="20"
          />
          <rect
            height="21"
            id="RightUKey"
            width="14"
            fill={this.props.RightUKey ? RightUKeyOnColor : RightUKeyOffColor}
            rx="3.5"
            stroke={RightUKeyStrokeColor}
            x="151"
            y="46"
          />
          <rect
            height="21"
            id="RightIKey"
            width="14"
            fill={this.props.RightIKey ? RightIKeyOnColor : RightIKeyOffColor}
            rx="3.5"
            stroke={RightIKeyStrokeColor}
            x="151"
            y="20"
          />
          <rect
            height="21"
            id="RightWKey"
            width="14"
            fill={this.props.RightWKey ? RightWKeyOnColor : RightWKeyOffColor}
            rx="3.5"
            stroke={RightWKeyStrokeColor}
            x="132"
            y="46"
          />
          <rect
            height="21"
            id="RightGKey"
            width="14"
            fill={this.props.RightGKey ? RightGKeyOnColor : RightGKeyOffColor}
            rx="3.5"
            stroke={RightGKeyStrokeColor}
            x="132"
            y="20"
          />
          <rect
            height="21"
            id="RightZKey"
            width="14"
            fill={this.props.RightZKey ? RightZKeyOnColor : RightZKeyOffColor}
            rx="3.5"
            stroke={RightZKeyStrokeColor}
            x="113"
            y="46"
          />
          <rect
            height="21"
            id="RightDKey"
            width="14"
            fill={this.props.RightDKey ? RightDKeyOnColor : RightDKeyOffColor}
            rx="3.5"
            stroke={RightDKeyStrokeColor}
            x="113"
            y="20"
          />
          <rect
            height="21"
            id="RightBKey"
            width="14"
            fill={this.props.RightBKey ? RightBKeyOnColor : RightBKeyOffColor}
            rx="3.5"
            stroke={RightBKeyStrokeColor}
            x="127"
            y="78"
          />
          <rect
            height="21"
            id="RightXKey"
            width="14"
            fill={this.props.RightXKey ? RightXKeyOnColor : RightXKeyOffColor}
            rx="3.5"
            stroke={RightXKeyStrokeColor}
            x="108"
            y="78"
          />
          <rect
            height="15"
            id="LeftHashKey"
            width="90"
            fill={
              this.props.LeftHashKey ? LeftHashKeyOnColor : LeftHashKeyOffColor
            }
            rx="3.5"
            stroke={LeftHashKeyStrokeColor}
            x="1"
            y="1"
          />
          <rect
            height="21"
            id="LeftXKey"
            width="14"
            fill={this.props.LeftXKey ? LeftXKeyOnColor : LeftXKeyOffColor}
            rx="3.5"
            stroke={LeftXKeyStrokeColor}
            x="82"
            y="78"
          />
          <rect
            height="21"
            id="LeftBKey"
            width="14"
            fill={this.props.LeftBKey ? LeftBKeyOnColor : LeftBKeyOffColor}
            rx="3.5"
            stroke={LeftBKeyStrokeColor}
            x="63"
            y="78"
          />
          <rect
            height="21"
            id="LeftDKey"
            width="14"
            fill={this.props.LeftDKey ? LeftDKeyOnColor : LeftDKeyOffColor}
            rx="3.5"
            stroke={LeftDKeyStrokeColor}
            x="77"
            y="20"
          />
          <rect
            height="21"
            id="LeftZKey"
            width="14"
            fill={this.props.LeftZKey ? LeftZKeyOnColor : LeftZKeyOffColor}
            rx="3.5"
            stroke={LeftZKeyStrokeColor}
            x="77"
            y="46"
          />
          <rect
            height="21"
            id="LeftGKey"
            width="14"
            fill={this.props.LeftGKey ? LeftGKeyOnColor : LeftGKeyOffColor}
            rx="3.5"
            stroke={LeftGKeyStrokeColor}
            x="58"
            y="20"
          />
          <rect
            height="21"
            id="LeftWKey"
            width="14"
            fill={this.props.LeftWKey ? LeftWKeyOnColor : LeftWKeyOffColor}
            rx="3.5"
            stroke={LeftWKeyStrokeColor}
            x="58"
            y="46"
          />
          <rect
            height="21"
            id="LeftIKey"
            width="14"
            fill={this.props.LeftIKey ? LeftIKeyOnColor : LeftIKeyOffColor}
            rx="3.5"
            stroke={LeftIKeyStrokeColor}
            x="39"
            y="20"
          />
          <rect
            height="21"
            id="LeftUKey"
            width="14"
            fill={this.props.LeftUKey ? LeftUKeyOnColor : LeftUKeyOffColor}
            rx="3.5"
            stroke={LeftUKeyStrokeColor}
            x="39"
            y="46"
          />
          <rect
            height="21"
            id="LeftNKey"
            width="14"
            fill={this.props.LeftNKey ? LeftNKeyOnColor : LeftNKeyOffColor}
            rx="3.5"
            stroke={LeftNKeyStrokeColor}
            x="20"
            y="20"
          />
          <rect
            height="21"
            id="LeftEKey"
            width="14"
            fill={this.props.LeftEKey ? LeftEKeyOnColor : LeftEKeyOffColor}
            rx="3.5"
            stroke={LeftEKeyStrokeColor}
            x="20"
            y="46"
          />
          <rect
            height="21"
            id="LeftAKey"
            width="14"
            fill={this.props.LeftAKey ? LeftAKeyOnColor : LeftAKeyOffColor}
            rx="3.5"
            stroke={LeftAKeyStrokeColor}
            x="1"
            y="20"
          />
          <rect
            height="21"
            id="LeftOKey"
            width="14"
            fill={this.props.LeftOKey ? LeftOKeyOnColor : LeftOKeyOffColor}
            rx="3.5"
            stroke={LeftOKeyStrokeColor}
            x="1"
            y="46"
          />
          <path
            id="LeftHash"
            d="M42.552 14.02l.464-3.04h-1.84l.224-1.408h1.824l.384-2.544h-1.776l.208-1.392h1.776l.432-2.816h1.456l-.432 2.816h2.112l.432-2.816h1.456l-.432 2.816h1.84l-.208 1.392h-1.84l-.4 2.544h1.792L49.8 10.98h-1.776l-.464 3.04h-1.456l.464-3.04h-2.096l-.464 3.04h-1.456zm2.128-4.448h2.096l.4-2.544h-2.112l-.384 2.544z"
            fill={this.props.LeftHash ? LeftHashOnColor : LeftHashOffColor}
          />
          <path
            id="LeftO"
            d="M7.998 62.192c-.693 0-1.306-.16-1.84-.48a3.597 3.597 0 01-1.264-1.328 7.162 7.162 0 01-.704-1.84 9.865 9.865 0 01-.224-2.144c0-.757.075-1.472.224-2.144.16-.672.395-1.285.704-1.84.31-.555.731-.992 1.264-1.312.534-.33 1.147-.496 1.84-.496.704 0 1.323.165 1.856.496.534.32.955.757 1.264 1.312a6.77 6.77 0 01.688 1.84c.15.672.224 1.387.224 2.144 0 .757-.074 1.472-.224 2.144a6.768 6.768 0 01-.688 1.84c-.309.555-.73.997-1.264 1.328-.533.32-1.152.48-1.856.48zm0-1.552c.523 0 .966-.213 1.328-.64.374-.427.635-.95.784-1.568.15-.619.224-1.296.224-2.032 0-1.227-.192-2.24-.576-3.04-.384-.81-.97-1.216-1.76-1.216-.522 0-.965.219-1.328.656-.362.427-.618.95-.768 1.568a8.656 8.656 0 00-.224 2.032c0 1.216.192 2.23.576 3.04.384.8.966 1.2 1.744 1.2z"
            fill={this.props.LeftO ? LeftOOnColor : LeftOOffColor}
          />
          <path
            id="LeftA"
            d="M10.687 36l-.8-2.608h-3.76L5.343 36h-1.76l3.664-11.2h1.488L12.43 36h-1.744zM6.59 31.904h2.832l-1.136-3.712a10.976 10.976 0 01-.288-1.168c-.075.395-.171.784-.288 1.168l-1.12 3.712z"
            fill={this.props.LeftA ? LeftAOnColor : LeftAOffColor}
          />
          <path
            id="LeftE"
            d="M23.446 62V50.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V62h-7.216z"
            fill={this.props.LeftE ? LeftEOnColor : LeftEOffColor}
          />
          <path
            id="LeftN"
            d="M23.446 36V24.8h1.584l3.664 7.376c.15.277.262.507.336.688a27.387 27.387 0 01-.032-.688V24.8h1.552V36h-1.52l-3.712-7.344a6.154 6.154 0 00-.112-.208 6.609 6.609 0 00-.128-.272l-.112-.224c.022.17.032.4.032.688V36h-1.552z"
            fill={this.props.LeftN ? LeftNOnColor : LeftNOffColor}
          />
          <path
            id="LeftU"
            d="M45.998 62.192c-1.12 0-2.016-.352-2.688-1.056-.672-.715-1.008-1.845-1.008-3.392V50.8h1.648v6.944c0 1.93.683 2.896 2.048 2.896 1.376 0 2.064-.965 2.064-2.896V50.8h1.632v6.944c0 1.536-.336 2.661-1.008 3.376-.661.715-1.557 1.072-2.688 1.072z"
            fill={this.props.LeftU ? LeftUOnColor : LeftUOffColor}
          />
          <path
            id="LeftI"
            d="M49.278 26.272h-2.464v8.256h2.464V36h-6.544v-1.472h2.448v-8.256h-2.448V24.8h6.544v1.472z"
            fill={this.props.LeftI ? LeftIOnColor : LeftIOffColor}
          />
          <path
            id="LeftW"
            d="M62.198 62l-1.712-11.2h1.504l.976 7.024.096.752a5.85 5.85 0 01.144-.752l1.296-7.024h1.008l1.312 6.976c.064.267.112.501.144.704.011-.096.027-.219.048-.368.022-.16.032-.267.032-.32l.896-6.992h1.568L67.798 62h-1.312l-1.36-7.104c-.032-.15-.074-.405-.128-.768-.021.16-.064.41-.128.752L63.51 62h-1.312z"
            fill={this.props.LeftW ? LeftWOnColor : LeftWOffColor}
          />
          <path
            id="LeftG"
            d="M65.222 36.192c-.938 0-1.738-.283-2.4-.848a4.912 4.912 0 01-1.408-2.128c-.277-.853-.416-1.792-.416-2.816 0-1.003.145-1.93.433-2.784a4.842 4.842 0 011.44-2.144c.66-.576 1.445-.864 2.351-.864.833 0 1.5.187 2 .56.502.373.928.885 1.28 1.536l-1.456.832c-.5-.928-1.109-1.392-1.824-1.392-.586 0-1.077.23-1.471.688a3.831 3.831 0 00-.832 1.6 8.237 8.237 0 00-.224 1.968c0 1.184.213 2.187.64 3.008.437.821 1.066 1.232 1.887 1.232.609 0 1.078-.208 1.409-.624.33-.427.495-.987.495-1.68v-.384h-1.984v-1.52h3.68v1.44c0 1.355-.335 2.416-1.008 3.184-.671.757-1.535 1.136-2.591 1.136z"
            fill={this.props.LeftG ? LeftGOnColor : LeftGOffColor}
          />
          <path
            id="LeftZ"
            d="M87.71 50.8v1.232l-5.296 8.416h5.264V62h-7.376v-1.216l5.264-8.432H80.67V50.8h7.04z"
            fill={this.props.LeftZ ? LeftZOnColor : LeftZOffColor}
          />
          <path
            id="LeftD"
            d="M80.446 36V24.8h2.72c.694 0 1.318.107 1.872.32.555.213 1.014.496 1.376.848.374.352.683.773.928 1.264.246.48.422.987.528 1.52.107.523.16 1.072.16 1.648 0 .544-.048 1.067-.144 1.568a5.977 5.977 0 01-.512 1.504 4.527 4.527 0 01-.896 1.296c-.362.363-.837.661-1.424.896-.576.224-1.226.336-1.952.336h-2.656zm1.632-1.536h1.152c.566 0 1.056-.117 1.472-.352.416-.245.736-.57.96-.976.235-.405.406-.832.512-1.28a6.41 6.41 0 00.16-1.456c0-1.13-.245-2.09-.736-2.88-.49-.8-1.221-1.2-2.192-1.2h-1.328v8.144z"
            fill={this.props.LeftD ? LeftDOnColor : LeftDOffColor}
          />
          <path
            id="LeftB"
            d="M66.446 94V82.8h3.504c1.238 0 2.134.283 2.688.848.555.565.832 1.27.832 2.112 0 1.11-.517 1.888-1.552 2.336.608.192 1.083.528 1.424 1.008.352.47.528 1.024.528 1.664 0 .896-.298 1.659-.896 2.288-.586.63-1.514.944-2.784.944h-3.744zm1.648-6.56h1.584c.715 0 1.254-.139 1.616-.416.374-.288.56-.683.56-1.184 0-1.024-.613-1.536-1.84-1.536h-1.92v3.136zm0 5.04h2.24c.694 0 1.184-.16 1.472-.48.299-.32.448-.715.448-1.184 0-1.248-.8-1.872-2.4-1.872h-1.76v3.536z"
            fill={this.props.LeftB ? LeftBOnColor : LeftBOffColor}
          />
          <path
            id="LeftX"
            d="M93.174 94h-1.872l-2.336-4.288L86.678 94h-1.856l3.312-5.792-3.072-5.408h1.872l2.064 3.824 2.048-3.824h1.856l-3.056 5.328L93.174 94z"
            fill={this.props.LeftX ? LeftXOnColor : LeftXOffColor}
          />
          <path
            id="RightHash"
            d="M154.552 14.02l.464-3.04h-1.84l.224-1.408h1.824l.384-2.544h-1.776l.208-1.392h1.776l.432-2.816h1.456l-.432 2.816h2.112l.432-2.816h1.456l-.432 2.816h1.84l-.208 1.392h-1.84l-.4 2.544h1.792l-.224 1.408h-1.776l-.464 3.04h-1.456l.464-3.04h-2.096l-.464 3.04h-1.456zm2.128-4.448h2.096l.4-2.544h-2.112l-.384 2.544z"
            fill={this.props.RightHash ? RightHashOnColor : RightHashOffColor}
          />
          <path
            id="RightX"
            d="M119.174 94h-1.872l-2.336-4.288L112.678 94h-1.856l3.312-5.792-3.072-5.408h1.872l2.064 3.824 2.048-3.824h1.856l-3.056 5.328L119.174 94z"
            fill={this.props.RightX ? RightXOnColor : RightXOffColor}
          />
          <path
            id="RightB"
            d="M130.446 94V82.8h3.504c1.238 0 2.134.283 2.688.848.555.565.832 1.27.832 2.112 0 1.11-.517 1.888-1.552 2.336.608.192 1.083.528 1.424 1.008.352.47.528 1.024.528 1.664 0 .896-.298 1.659-.896 2.288-.586.63-1.514.944-2.784.944h-3.744zm1.648-6.56h1.584c.715 0 1.254-.139 1.616-.416.374-.288.56-.683.56-1.184 0-1.024-.613-1.536-1.84-1.536h-1.92v3.136zm0 5.04h2.24c.694 0 1.184-.16 1.472-.48.299-.32.448-.715.448-1.184 0-1.248-.8-1.872-2.4-1.872h-1.76v3.536z"
            fill={this.props.RightB ? RightBOnColor : RightBOffColor}
          />
          <path
            id="RightD"
            d="M116.446 36V24.8h2.72c.694 0 1.318.107 1.872.32.555.213 1.014.496 1.376.848.374.352.683.773.928 1.264.246.48.422.987.528 1.52.107.523.16 1.072.16 1.648 0 .544-.048 1.067-.144 1.568a5.949 5.949 0 01-.512 1.504 4.508 4.508 0 01-.896 1.296c-.362.363-.837.661-1.424.896-.576.224-1.226.336-1.952.336h-2.656zm1.632-1.536h1.152c.566 0 1.056-.117 1.472-.352.416-.245.736-.57.96-.976.235-.405.406-.832.512-1.28.107-.459.16-.944.16-1.456 0-1.13-.245-2.09-.736-2.88-.49-.8-1.221-1.2-2.192-1.2h-1.328v8.144z"
            fill={this.props.RightD ? RightDOnColor : RightDOffColor}
          />
          <path
            id="RightZ"
            d="M123.71 50.8v1.232l-5.296 8.416h5.264V62h-7.376v-1.216l5.264-8.432h-4.896V50.8h7.04z"
            fill={this.props.RightZ ? RightZOnColor : RightZOffColor}
          />
          <path
            id="RightG"
            d="M139.223 36.192c-.939 0-1.739-.283-2.4-.848a4.909 4.909 0 01-1.408-2.128c-.278-.853-.416-1.792-.416-2.816 0-1.003.144-1.93.432-2.784a4.83 4.83 0 011.44-2.144c.661-.576 1.445-.864 2.352-.864.832 0 1.498.187 2 .56.501.373.928.885 1.28 1.536l-1.456.832c-.502-.928-1.11-1.392-1.824-1.392-.587 0-1.078.23-1.472.688a3.827 3.827 0 00-.832 1.6 8.202 8.202 0 00-.224 1.968c0 1.184.213 2.187.64 3.008.437.821 1.066 1.232 1.888 1.232.608 0 1.077-.208 1.408-.624.33-.427.496-.987.496-1.68v-.384h-1.984v-1.52h3.68v1.44c0 1.355-.336 2.416-1.008 3.184-.672.757-1.536 1.136-2.592 1.136z"
            fill={this.props.RightG ? RightGOnColor : RightGOffColor}
          />
          <path
            id="RightW"
            d="M136.198 62l-1.712-11.2h1.504l.976 7.024.096.752a5.85 5.85 0 01.144-.752l1.296-7.024h1.008l1.312 6.976c.064.267.112.501.144.704.011-.096.027-.219.048-.368.022-.16.032-.267.032-.32l.896-6.992h1.568L141.798 62h-1.312l-1.36-7.104a14.46 14.46 0 01-.128-.768c-.021.16-.064.41-.128.752L137.51 62h-1.312z"
            fill={this.props.RightW ? RightWOnColor : RightWOffColor}
          />
          <path
            id="RightI"
            d="M161.278 26.272h-2.464v8.256h2.464V36h-6.544v-1.472h2.448v-8.256h-2.448V24.8h6.544v1.472z"
            fill={this.props.RightI ? RightIOnColor : RightIOffColor}
          />
          <path
            id="RightU"
            d="M157.998 62.192c-1.12 0-2.016-.352-2.688-1.056-.672-.715-1.008-1.845-1.008-3.392V50.8h1.648v6.944c0 1.93.683 2.896 2.048 2.896 1.376 0 2.064-.965 2.064-2.896V50.8h1.632v6.944c0 1.536-.336 2.661-1.008 3.376-.661.715-1.557 1.072-2.688 1.072z"
            fill={this.props.RightU ? RightUOnColor : RightUOffColor}
          />
          <path
            id="RightN"
            d="M173.446 36V24.8h1.584l3.664 7.376c.15.277.262.507.336.688a29.163 29.163 0 01-.032-.688V24.8h1.552V36h-1.52l-3.712-7.344a4.72 4.72 0 00-.112-.208 5.514 5.514 0 00-.128-.272l-.112-.224c.022.17.032.4.032.688V36h-1.552z"
            fill={this.props.RightN ? RightNOnColor : RightNOffColor}
          />
          <path
            id="RightE"
            d="M173.446 62V50.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V62h-7.216z"
            fill={this.props.RightE ? RightEOnColor : RightEOffColor}
          />
          <path
            id="RightA"
            d="M198.687 36l-.8-2.608h-3.76L193.343 36h-1.76l3.664-11.2h1.488l3.696 11.2h-1.744zm-4.096-4.096h2.832l-1.136-3.712a10.661 10.661 0 01-.288-1.168c-.075.395-.171.784-.288 1.168l-1.12 3.712z"
            fill={this.props.RightA ? RightAOnColor : RightAOffColor}
          />
          <path
            id="RightO"
            d="M195.998 62.192c-.693 0-1.306-.16-1.84-.48a3.605 3.605 0 01-1.264-1.328 7.174 7.174 0 01-.704-1.84 9.886 9.886 0 01-.224-2.144c0-.757.075-1.472.224-2.144.16-.672.395-1.285.704-1.84.31-.555.731-.992 1.264-1.312.534-.33 1.147-.496 1.84-.496.704 0 1.323.165 1.856.496.534.32.955.757 1.264 1.312.31.555.539 1.168.688 1.84.15.672.224 1.387.224 2.144 0 .757-.074 1.472-.224 2.144a6.736 6.736 0 01-.688 1.84c-.309.555-.73.997-1.264 1.328-.533.32-1.152.48-1.856.48zm0-1.552c.523 0 .966-.213 1.328-.64.374-.427.635-.95.784-1.568a8.62 8.62 0 00.224-2.032c0-1.227-.192-2.24-.576-3.04-.384-.81-.97-1.216-1.76-1.216-.522 0-.965.219-1.328.656-.362.427-.618.95-.768 1.568a8.674 8.674 0 00-.224 2.032c0 1.216.192 2.23.576 3.04.384.8.966 1.2 1.744 1.2z"
            fill={this.props.RightO ? RightOOnColor : RightOOffColor}
          />
        </g>
      </svg>
    );
  }
}

export default YaweiChineseStenoDiagram;

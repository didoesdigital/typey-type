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
            d="m42.552 14.02.464-3.04h-1.84l.224-1.408h1.824l.384-2.544h-1.776l.208-1.392h1.776l.432-2.816h1.456l-.432 2.816h2.112l.432-2.816h1.456l-.432 2.816h1.84l-.208 1.392h-1.84l-.4 2.544h1.792L49.8 10.98h-1.776l-.464 3.04h-1.456l.464-3.04h-2.096l-.464 3.04zm2.128-4.448h2.096l.4-2.544h-2.112z"
            fill={this.props.LeftHash ? LeftHashOnColor : LeftHashOffColor}
          />
          <path
            id="LeftO"
            d="M7.998 62.192q-1.04 0-1.84-.48a3.6 3.6 0 0 1-1.264-1.328 7.2 7.2 0 0 1-.704-1.84 10 10 0 0 1-.224-2.144q0-1.136.224-2.144.24-1.008.704-1.84.465-.832 1.264-1.312.8-.496 1.84-.496 1.056 0 1.856.496.8.48 1.264 1.312a6.8 6.8 0 0 1 .688 1.84q.225 1.008.224 2.144 0 1.136-.224 2.144a6.8 6.8 0 0 1-.688 1.84q-.463.832-1.264 1.328-.8.48-1.856.48m0-1.552q.785 0 1.328-.64.56-.64.784-1.568.225-.928.224-2.032 0-1.84-.576-3.04-.576-1.216-1.76-1.216-.783 0-1.328.656-.543.64-.768 1.568a8.7 8.7 0 0 0-.224 2.032q0 1.825.576 3.04.577 1.2 1.744 1.2"
            fill={this.props.LeftO ? LeftOOnColor : LeftOOffColor}
          />
          <path
            id="LeftA"
            d="m10.687 36-.8-2.608h-3.76L5.343 36h-1.76l3.664-11.2h1.488L12.43 36zM6.59 31.904h2.832l-1.136-3.712a11 11 0 0 1-.288-1.168q-.112.592-.288 1.168z"
            fill={this.props.LeftA ? LeftAOnColor : LeftAOffColor}
          />
          <path
            id="LeftE"
            d="M23.446 62V50.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V62z"
            fill={this.props.LeftE ? LeftEOnColor : LeftEOffColor}
          />
          <path
            id="LeftN"
            d="M23.446 36V24.8h1.584l3.664 7.376q.225.416.336.688a27 27 0 0 1-.032-.688V24.8h1.552V36h-1.52l-3.712-7.344a6 6 0 0 0-.112-.208 7 7 0 0 0-.128-.272l-.112-.224q.032.256.032.688V36z"
            fill={this.props.LeftN ? LeftNOnColor : LeftNOffColor}
          />
          <path
            id="LeftU"
            d="M45.998 62.192q-1.68 0-2.688-1.056-1.008-1.072-1.008-3.392V50.8h1.648v6.944q0 2.895 2.048 2.896 2.064 0 2.064-2.896V50.8h1.632v6.944q0 2.304-1.008 3.376-.992 1.072-2.688 1.072"
            fill={this.props.LeftU ? LeftUOnColor : LeftUOffColor}
          />
          <path
            id="LeftI"
            d="M49.278 26.272h-2.464v8.256h2.464V36h-6.544v-1.472h2.448v-8.256h-2.448V24.8h6.544z"
            fill={this.props.LeftI ? LeftIOnColor : LeftIOffColor}
          />
          <path
            id="LeftW"
            d="m62.198 62-1.712-11.2h1.504l.976 7.024.096.752a6 6 0 0 1 .144-.752l1.296-7.024h1.008l1.312 6.976q.096.4.144.704.016-.144.048-.368.032-.24.032-.32l.896-6.992h1.568L67.798 62h-1.312l-1.36-7.104q-.047-.224-.128-.768-.032.24-.128.752L63.51 62z"
            fill={this.props.LeftW ? LeftWOnColor : LeftWOffColor}
          />
          <path
            id="LeftG"
            d="M65.223 36.192q-1.41 0-2.4-.848a4.9 4.9 0 0 1-1.409-2.128q-.416-1.28-.416-2.816 0-1.504.433-2.784a4.84 4.84 0 0 1 1.44-2.144q.991-.864 2.351-.864 1.25 0 2 .56.752.56 1.28 1.536l-1.456.832q-.75-1.392-1.824-1.392-.88 0-1.471.688a3.8 3.8 0 0 0-.832 1.6 8.2 8.2 0 0 0-.224 1.968q0 1.776.64 3.008.655 1.232 1.887 1.232.913 0 1.409-.624.495-.64.495-1.68v-.384h-1.984v-1.52h3.68v1.44q0 2.032-1.008 3.184-1.007 1.136-2.591 1.136"
            fill={this.props.LeftG ? LeftGOnColor : LeftGOffColor}
          />
          <path
            id="LeftZ"
            d="M87.71 50.8v1.232l-5.296 8.416h5.264V62h-7.376v-1.216l5.264-8.432H80.67V50.8z"
            fill={this.props.LeftZ ? LeftZOnColor : LeftZOffColor}
          />
          <path
            id="LeftD"
            d="M80.446 36V24.8h2.72q1.041 0 1.872.32.833.32 1.376.848.56.528.928 1.264.369.72.528 1.52.16.784.16 1.648 0 .816-.144 1.568a6 6 0 0 1-.512 1.504 4.5 4.5 0 0 1-.896 1.296q-.543.544-1.424.896-.864.336-1.952.336zm1.632-1.536h1.152q.849 0 1.472-.352.624-.367.96-.976.353-.608.512-1.28a6.4 6.4 0 0 0 .16-1.456q0-1.695-.736-2.88-.735-1.2-2.192-1.2h-1.328z"
            fill={this.props.LeftD ? LeftDOnColor : LeftDOffColor}
          />
          <path
            id="LeftB"
            d="M66.446 94V82.8h3.504q1.857 0 2.688.848t.832 2.112q0 1.665-1.552 2.336.912.288 1.424 1.008.528.705.528 1.664 0 1.344-.896 2.288-.879.945-2.784.944zm1.648-6.56h1.584q1.073 0 1.616-.416.56-.432.56-1.184 0-1.536-1.84-1.536h-1.92zm0 5.04h2.24q1.04 0 1.472-.48.448-.48.448-1.184 0-1.872-2.4-1.872h-1.76z"
            fill={this.props.LeftB ? LeftBOnColor : LeftBOffColor}
          />
          <path
            id="LeftX"
            d="M93.174 94h-1.872l-2.336-4.288L86.678 94h-1.856l3.312-5.792-3.072-5.408h1.872l2.064 3.824 2.048-3.824h1.856l-3.056 5.328z"
            fill={this.props.LeftX ? LeftXOnColor : LeftXOffColor}
          />
          <path
            id="RightHash"
            d="m154.552 14.02.464-3.04h-1.84l.224-1.408h1.824l.384-2.544h-1.776l.208-1.392h1.776l.432-2.816h1.456l-.432 2.816h2.112l.432-2.816h1.456l-.432 2.816h1.84l-.208 1.392h-1.84l-.4 2.544h1.792l-.224 1.408h-1.776l-.464 3.04h-1.456l.464-3.04h-2.096l-.464 3.04zm2.128-4.448h2.096l.4-2.544h-2.112z"
            fill={this.props.RightHash ? RightHashOnColor : RightHashOffColor}
          />
          <path
            id="RightX"
            d="M119.174 94h-1.872l-2.336-4.288L112.678 94h-1.856l3.312-5.792-3.072-5.408h1.872l2.064 3.824 2.048-3.824h1.856l-3.056 5.328z"
            fill={this.props.RightX ? RightXOnColor : RightXOffColor}
          />
          <path
            id="RightB"
            d="M130.446 94V82.8h3.504q1.857 0 2.688.848t.832 2.112q0 1.665-1.552 2.336.912.288 1.424 1.008.528.705.528 1.664 0 1.344-.896 2.288-.879.945-2.784.944zm1.648-6.56h1.584q1.073 0 1.616-.416.56-.432.56-1.184 0-1.536-1.84-1.536h-1.92zm0 5.04h2.24q1.04 0 1.472-.48.448-.48.448-1.184 0-1.872-2.4-1.872h-1.76z"
            fill={this.props.RightB ? RightBOnColor : RightBOffColor}
          />
          <path
            id="RightD"
            d="M116.446 36V24.8h2.72q1.041 0 1.872.32.833.32 1.376.848.56.528.928 1.264.369.72.528 1.52.16.784.16 1.648 0 .816-.144 1.568a6 6 0 0 1-.512 1.504 4.5 4.5 0 0 1-.896 1.296q-.543.544-1.424.896-.863.336-1.952.336zm1.632-1.536h1.152q.849 0 1.472-.352.624-.367.96-.976.353-.608.512-1.28.16-.688.16-1.456 0-1.695-.736-2.88-.735-1.2-2.192-1.2h-1.328z"
            fill={this.props.RightD ? RightDOnColor : RightDOffColor}
          />
          <path
            id="RightZ"
            d="M123.71 50.8v1.232l-5.296 8.416h5.264V62h-7.376v-1.216l5.264-8.432h-4.896V50.8z"
            fill={this.props.RightZ ? RightZOnColor : RightZOffColor}
          />
          <path
            id="RightG"
            d="M139.223 36.192q-1.409 0-2.4-.848a4.9 4.9 0 0 1-1.408-2.128q-.417-1.28-.416-2.816 0-1.504.432-2.784a4.83 4.83 0 0 1 1.44-2.144q.992-.864 2.352-.864 1.248 0 2 .56t1.28 1.536l-1.456.832q-.753-1.392-1.824-1.392-.88 0-1.472.688a3.8 3.8 0 0 0-.832 1.6 8.2 8.2 0 0 0-.224 1.968q0 1.776.64 3.008.655 1.232 1.888 1.232.912 0 1.408-.624.496-.64.496-1.68v-.384h-1.984v-1.52h3.68v1.44q0 2.032-1.008 3.184-1.008 1.136-2.592 1.136"
            fill={this.props.RightG ? RightGOnColor : RightGOffColor}
          />
          <path
            id="RightW"
            d="m136.198 62-1.712-11.2h1.504l.976 7.024.096.752a6 6 0 0 1 .144-.752l1.296-7.024h1.008l1.312 6.976q.096.4.144.704.017-.144.048-.368.032-.24.032-.32l.896-6.992h1.568L141.798 62h-1.312l-1.36-7.104a15 15 0 0 1-.128-.768q-.032.24-.128.752L137.51 62z"
            fill={this.props.RightW ? RightWOnColor : RightWOffColor}
          />
          <path
            id="RightI"
            d="M161.278 26.272h-2.464v8.256h2.464V36h-6.544v-1.472h2.448v-8.256h-2.448V24.8h6.544z"
            fill={this.props.RightI ? RightIOnColor : RightIOffColor}
          />
          <path
            id="RightU"
            d="M157.998 62.192q-1.68 0-2.688-1.056-1.008-1.072-1.008-3.392V50.8h1.648v6.944q0 2.895 2.048 2.896 2.064 0 2.064-2.896V50.8h1.632v6.944q0 2.304-1.008 3.376-.992 1.072-2.688 1.072"
            fill={this.props.RightU ? RightUOnColor : RightUOffColor}
          />
          <path
            id="RightN"
            d="M173.446 36V24.8h1.584l3.664 7.376q.225.416.336.688a29 29 0 0 1-.032-.688V24.8h1.552V36h-1.52l-3.712-7.344a5 5 0 0 0-.112-.208 6 6 0 0 0-.128-.272l-.112-.224q.032.256.032.688V36z"
            fill={this.props.RightN ? RightNOnColor : RightNOffColor}
          />
          <path
            id="RightE"
            d="M173.446 62V50.8h6.864v1.552h-5.216v3.088h3.472v1.552h-3.472v3.44h5.568V62z"
            fill={this.props.RightE ? RightEOnColor : RightEOffColor}
          />
          <path
            id="RightA"
            d="m198.687 36-.8-2.608h-3.76L193.343 36h-1.76l3.664-11.2h1.488l3.696 11.2zm-4.096-4.096h2.832l-1.136-3.712a11 11 0 0 1-.288-1.168q-.112.592-.288 1.168z"
            fill={this.props.RightA ? RightAOnColor : RightAOffColor}
          />
          <path
            id="RightO"
            d="M195.998 62.192q-1.04 0-1.84-.48a3.6 3.6 0 0 1-1.264-1.328 7.2 7.2 0 0 1-.704-1.84 10 10 0 0 1-.224-2.144q0-1.136.224-2.144.24-1.008.704-1.84.465-.832 1.264-1.312.8-.496 1.84-.496 1.056 0 1.856.496.8.48 1.264 1.312.465.832.688 1.84.225 1.008.224 2.144 0 1.136-.224 2.144a6.7 6.7 0 0 1-.688 1.84q-.463.832-1.264 1.328-.8.48-1.856.48m0-1.552q.785 0 1.328-.64.56-.64.784-1.568a8.6 8.6 0 0 0 .224-2.032q0-1.84-.576-3.04-.576-1.216-1.76-1.216-.783 0-1.328.656-.543.64-.768 1.568a8.7 8.7 0 0 0-.224 2.032q0 1.825.576 3.04.576 1.2 1.744 1.2"
            fill={this.props.RightO ? RightOOnColor : RightOOffColor}
          />
        </g>
      </svg>
    );
  }
}

export default YaweiChineseStenoDiagram;

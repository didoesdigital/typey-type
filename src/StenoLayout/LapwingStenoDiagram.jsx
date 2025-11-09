import { Component } from "react";

const numberBarKeyStrokeColor = "#7109aa";
const numberBarKeyOnColor = "#7109AA";
const numberBarKeyOffColor = "#E9D9F2";
const leftSKeyStrokeColor = "#7109aa";
const leftSKeyOnColor = "#7109AA";
const leftSKeyOffColor = "#E9D9F2";
const leftTKeyStrokeColor = "#7109aa";
const leftTKeyOnColor = "#7109AA";
const leftTKeyOffColor = "#E9D9F2";
const leftKKeyStrokeColor = "#7109aa";
const leftKKeyOnColor = "#7109AA";
const leftKKeyOffColor = "#E9D9F2";
const leftPKeyStrokeColor = "#7109aa";
const leftPKeyOnColor = "#7109AA";
const leftPKeyOffColor = "#E9D9F2";
const leftWKeyStrokeColor = "#7109aa";
const leftWKeyOnColor = "#7109AA";
const leftWKeyOffColor = "#E9D9F2";
const leftHKeyStrokeColor = "#7109aa";
const leftHKeyOnColor = "#7109AA";
const leftHKeyOffColor = "#E9D9F2";
const leftRKeyStrokeColor = "#7109aa";
const leftRKeyOnColor = "#7109AA";
const leftRKeyOffColor = "#E9D9F2";
const leftAKeyStrokeColor = "#7109aa";
const leftAKeyOnColor = "#7109AA";
const leftAKeyOffColor = "#E9D9F2";
const leftOKeyStrokeColor = "#7109aa";
const leftOKeyOnColor = "#7109AA";
const leftOKeyOffColor = "#E9D9F2";
const starKeyStrokeColor = "#7109aa";
const starKeyOnColor = "#7109AA";
const starKeyOffColor = "#E9D9F2";
const rightEKeyStrokeColor = "#7109aa";
const rightEKeyOnColor = "#7109AA";
const rightEKeyOffColor = "#E9D9F2";
const rightUKeyStrokeColor = "#7109aa";
const rightUKeyOnColor = "#7109AA";
const rightUKeyOffColor = "#E9D9F2";
const rightFKeyStrokeColor = "#7109aa";
const rightFKeyOnColor = "#7109AA";
const rightFKeyOffColor = "#E9D9F2";
const rightRKeyStrokeColor = "#7109aa";
const rightRKeyOnColor = "#7109AA";
const rightRKeyOffColor = "#E9D9F2";
const rightPKeyStrokeColor = "#7109aa";
const rightPKeyOnColor = "#7109AA";
const rightPKeyOffColor = "#E9D9F2";
const rightBKeyStrokeColor = "#7109aa";
const rightBKeyOnColor = "#7109AA";
const rightBKeyOffColor = "#E9D9F2";
const rightLKeyStrokeColor = "#7109aa";
const rightLKeyOnColor = "#7109AA";
const rightLKeyOffColor = "#E9D9F2";
const rightGKeyStrokeColor = "#7109aa";
const rightGKeyOnColor = "#7109AA";
const rightGKeyOffColor = "#E9D9F2";
const rightTKeyStrokeColor = "#7109aa";
const rightTKeyOnColor = "#7109AA";
const rightTKeyOffColor = "#E9D9F2";
const rightSKeyStrokeColor = "#7109aa";
const rightSKeyOnColor = "#7109AA";
const rightSKeyOffColor = "#E9D9F2";
const rightDKeyStrokeColor = "#7109aa";
const rightDKeyOnColor = "#7109AA";
const rightDKeyOffColor = "#E9D9F2";
const rightZKeyStrokeColor = "#7109aa";
const rightZKeyOnColor = "#7109AA";
const rightZKeyOffColor = "#E9D9F2";
const numberBarOnColor = "#FFFFFF";
const numberBarOffColor = "#FFFFFF";
const leftSOnColor = "#FFFFFF";
const leftSOffColor = "#FFFFFF";
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
const starOnColor = "#FFFFFF";
const starOffColor = "#FFFFFF";
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

class LapwingStenoDiagram extends Component {
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
            x="3.5"
            y="13.5"
          />
          <rect
            height="19"
            id="leftSKey"
            width="17"
            fill={this.props.leftSKey ? leftSKeyOnColor : leftSKeyOffColor}
            rx="3.5"
            stroke={leftSKeyStrokeColor}
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
            height="43"
            id="starKey"
            width="17"
            fill={this.props.starKey ? starKeyOnColor : starKeyOffColor}
            rx="3.5"
            stroke={starKeyStrokeColor}
            x="83.5"
            y="13.5"
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
            d="m8.512 28.084.464-3.016H7.16l.232-1.448h1.8l.368-2.512H7.808l.216-1.432h1.768l.416-2.792h1.496l-.416 2.792h2.08l.448-2.792h1.48l-.416 2.792h1.816l-.208 1.432h-1.824l-.392 2.512h1.776l-.216 1.448h-1.776l-.456 3.016h-1.496l.456-3.016h-2.088l-.464 3.016zm2.176-4.464h2.088l.376-2.512h-2.08z"
            fill={this.props.numberBar ? numberBarOnColor : numberBarOffColor}
          />
          <path
            id="leftS"
            d="M12.04 52.276q-.896 0-1.664-.344-.768-.352-1.336-.96-.56-.616-.832-1.424l1.56-.576q.344.76.984 1.232t1.408.472q.776 0 1.256-.408t.48-1.184q0-.512-.32-.904t-.84-.696q-.52-.312-1.12-.584-.536-.224-1.072-.512-.528-.288-.976-.672-.44-.392-.712-.92t-.272-1.232q0-.784.4-1.432.408-.656 1.152-1.048.752-.392 1.776-.392 1.224 0 2.088.64.872.632 1.144 1.592l-1.544.52q-.224-.488-.672-.824t-1.104-.336-1.088.336q-.424.336-.424.912 0 .424.256.736.264.304.736.568t1.128.568q.528.248 1.088.56t1.04.736q.48.416.768.984.296.568.296 1.32 0 1.048-.488 1.776t-1.304 1.112-1.792.384"
            fill={this.props.leftS ? leftSOnColor : leftSOffColor}
          />
          <path
            id="leftT"
            d="M31.072 28.084v-9.568h-3.24v-1.632h8.192v1.632h-3.248v9.568z"
            fill={this.props.leftT ? leftTOnColor : leftTOffColor}
          />
          <path
            id="leftK"
            d="M29.776 48.044v-2.36l3.752-4.8h1.984zm-1.44 4.04v-11.2h1.712v11.2zm5.92 0-3.208-6.048 1.152-1.44 4.04 7.488z"
            fill={this.props.leftK ? leftKOnColor : leftKOffColor}
          />
          <path
            id="leftP"
            d="M48.336 28.084v-11.2h3.768q1.376 0 2.184.504t1.16 1.296q.352.784.352 1.624 0 .592-.208 1.2-.2.6-.648 1.104-.44.504-1.144.816-.696.304-1.696.304h-2.056v4.352zm1.712-5.944H52.2q.688 0 1.096-.272.416-.28.6-.696.184-.424.184-.864 0-.392-.168-.816-.16-.424-.568-.72t-1.144-.296h-2.152z"
            fill={this.props.leftP ? leftPOnColor : leftPOffColor}
          />
          <path
            id="leftW"
            d="m49.056 52.084-1.688-11.2h1.56l.936 6.944q.016.128.048.36.04.224.056.392.024-.152.064-.376l.08-.392 1.32-6.928h1l1.336 6.88q.04.192.072.376.04.184.064.36l.056-.384.048-.336.832-6.896h1.656l-1.704 11.2h-1.36l-1.376-7.04q-.048-.208-.08-.4t-.056-.384q-.024.192-.056.376t-.072.392l-1.376 7.056z"
            fill={this.props.leftW ? leftWOnColor : leftWOffColor}
          />
          <path
            id="leftH"
            d="M68.336 28.084v-11.2h1.712v4.608h3.768v-4.608h1.704v11.2h-1.704V23.1h-3.768v4.984z"
            fill={this.props.leftH ? leftHOnColor : leftHOffColor}
          />
          <path
            id="leftR"
            d="M68.336 52.084v-11.2h3.712q1.368 0 2.152.472.792.472 1.12 1.232.336.76.336 1.608 0 .6-.2 1.184-.192.576-.608 1.048-.408.472-1.048.768t-1.52.344h-2.232v4.544zm5.4 0-2.344-4.768 1.816-.168 2.424 4.936zm-3.688-6.136h2.032q.704 0 1.104-.248.408-.256.576-.648t.168-.832q0-.392-.16-.792-.16-.408-.56-.68t-1.128-.272h-2.032z"
            fill={this.props.leftR ? leftROnColor : leftROffColor}
          />
          <path
            id="leftA"
            d="m47.472 78.084 3.672-11.2h1.56l3.68 11.2h-1.816l-2.36-7.736q-.032-.112-.088-.32-.056-.216-.112-.448t-.08-.416q-.04.184-.096.416-.048.232-.104.448-.048.208-.08.32l-2.344 7.736zm2.2-2.576.472-1.544h3.568l.472 1.544z"
            fill={this.props.leftA ? leftAOnColor : leftAOffColor}
          />
          <path
            id="leftO"
            d="M71.928 78.276q-1.096 0-1.872-.48-.776-.488-1.264-1.312t-.72-1.856q-.224-1.04-.224-2.144t.224-2.136q.232-1.04.72-1.864t1.264-1.304q.776-.488 1.872-.488t1.872.488q.784.48 1.272 1.304t.72 1.864q.232 1.032.232 2.136t-.232 2.144q-.232 1.032-.72 1.856T73.8 77.796q-.776.48-1.872.48m0-1.608q.616 0 1.056-.36t.712-.96q.28-.6.408-1.344.136-.752.136-1.52 0-.832-.136-1.576-.128-.752-.4-1.336-.272-.592-.712-.928-.44-.344-1.064-.344-.616 0-1.056.36-.44.352-.72.952-.272.6-.408 1.352-.128.744-.128 1.52 0 .824.128 1.576.136.744.408 1.336.28.592.72.936.44.336 1.056.336"
            fill={this.props.leftO ? leftOOnColor : leftOOffColor}
          />
          <path
            id="star"
            d="m90.52 38.66-1.28-.872 1-1.504.848-.76-1.144.256h-1.728v-1.568h1.728l1.144.264-.848-.76-.992-1.512 1.28-.864 1.128 1.664.272 1.056.28-1.056 1.128-1.664 1.28.864-1 1.512-.848.76 1.152-.264h1.736v1.568H93.92l-1.152-.256.848.76 1 1.504-1.28.872-1.128-1.664-.28-1.056-.28 1.056z"
            fill={this.props.star ? starOnColor : starOffColor}
          />
          <path
            id="rightE"
            d="M108.336 78.084v-11.2h6.952v1.624h-5.24v2.976h3.472v1.624h-3.472v3.352h5.576v1.624z"
            fill={this.props.rightE ? rightEOnColor : rightEOffColor}
          />
          <path
            id="rightU"
            d="M131.928 78.276q-1.032 0-1.872-.424-.84-.432-1.344-1.408-.496-.976-.496-2.624v-6.936h1.696v6.936q0 1.12.264 1.736.272.616.728.864t1.024.248q.56 0 1.016-.248.464-.248.728-.864.272-.616.272-1.736v-6.936h1.712v6.936q0 1.632-.496 2.608t-1.344 1.416q-.848.432-1.888.432"
            fill={this.props.rightU ? rightUOnColor : rightUOffColor}
          />
          <path
            id="rightF"
            d="M108.336 28.084v-11.2h7.352v1.624h-5.64v2.976h4.048v1.624h-4.048v4.976z"
            fill={this.props.rightF ? rightFOnColor : rightFOffColor}
          />
          <path
            id="rightR"
            d="M108.336 52.084v-11.2h3.712q1.368 0 2.152.472.792.472 1.12 1.232.336.76.336 1.608 0 .6-.2 1.184-.192.576-.608 1.048-.408.472-1.048.768t-1.52.344h-2.232v4.544zm5.4 0-2.344-4.768 1.816-.168 2.424 4.936zm-3.688-6.136h2.032q.704 0 1.104-.248.408-.256.576-.648t.168-.832q0-.392-.16-.792-.16-.408-.56-.68t-1.128-.272h-2.032z"
            fill={this.props.rightR ? rightROnColor : rightROffColor}
          />
          <path
            id="rightP"
            d="M128.336 28.084v-11.2h3.768q1.376 0 2.184.504t1.16 1.296q.352.784.352 1.624 0 .592-.208 1.2-.2.6-.648 1.104-.44.504-1.144.816-.696.304-1.696.304h-2.056v4.352zm1.712-5.944h2.152q.688 0 1.096-.272.416-.28.6-.696.184-.424.184-.864 0-.392-.168-.816-.16-.424-.568-.72t-1.144-.296h-2.152z"
            fill={this.props.rightP ? rightPOnColor : rightPOffColor}
          />
          <path
            id="rightB"
            d="M128.336 52.084v-11.2h3.568q1.344 0 2.12.432t1.096 1.12q.328.68.328 1.424 0 .768-.392 1.384-.384.608-1.144.936.928.288 1.424 1.016t.496 1.64q0 .584-.192 1.16-.184.576-.616 1.048-.424.472-1.128.76-.704.28-1.752.28zm1.712-1.576h2.24q.728 0 1.128-.24.408-.248.568-.624t.16-.768q0-.464-.192-.88-.184-.416-.696-.68-.504-.264-1.448-.264h-1.76zm0-5.008h1.592q1.072 0 1.592-.424.528-.424.528-1.128 0-.36-.144-.704-.136-.344-.528-.568-.384-.224-1.128-.224h-1.912z"
            fill={this.props.rightB ? rightBOnColor : rightBOffColor}
          />
          <path
            id="rightL"
            d="M148.336 28.084v-11.2h1.712v9.56h5.224v1.64z"
            fill={this.props.rightL ? rightLOnColor : rightLOffColor}
          />
          <path
            id="rightG"
            d="M152.136 52.276q-1.112 0-1.928-.48-.808-.488-1.328-1.312-.512-.832-.768-1.864-.248-1.04-.248-2.136 0-1.072.256-2.104.264-1.032.792-1.864t1.328-1.328q.808-.496 1.896-.496.928 0 1.552.312.632.304 1.048.8.424.488.728 1.032l-1.512.864q-.296-.56-.72-.976-.424-.424-1.096-.424-.688 0-1.168.384-.472.376-.768 1t-.432 1.36q-.128.736-.128 1.44 0 .8.144 1.552.152.744.456 1.344.304.592.776.944.472.344 1.12.344.912 0 1.392-.632.48-.64.48-1.624v-.352h-1.976v-1.592h3.736v1.472q0 1.408-.48 2.376t-1.304 1.464-1.848.496"
            fill={this.props.rightG ? rightGOnColor : rightGOffColor}
          />
          <path
            id="rightT"
            d="M171.072 28.084v-9.568h-3.24v-1.632h8.192v1.632h-3.248v9.568z"
            fill={this.props.rightT ? rightTOnColor : rightTOffColor}
          />
          <path
            id="rightS"
            d="M172.04 52.276q-.896 0-1.664-.344-.768-.352-1.336-.96-.56-.616-.832-1.424l1.56-.576q.344.76.984 1.232t1.408.472q.776 0 1.256-.408t.48-1.184q0-.512-.32-.904t-.84-.696q-.52-.312-1.12-.584-.536-.224-1.072-.512-.528-.288-.976-.672-.44-.392-.712-.92t-.272-1.232q0-.784.4-1.432.408-.656 1.152-1.048.752-.392 1.776-.392 1.224 0 2.088.64.872.632 1.144 1.592l-1.544.52q-.224-.488-.672-.824t-1.104-.336-1.088.336q-.424.336-.424.912 0 .424.256.736.264.304.736.568t1.128.568q.528.248 1.088.56t1.04.736q.48.416.768.984.296.568.296 1.32 0 1.048-.488 1.776t-1.304 1.112-1.792.384"
            fill={this.props.rightS ? rightSOnColor : rightSOffColor}
          />
          <path
            id="rightD"
            d="M188.336 28.084v-11.2h2.744q1.36 0 2.296.48.944.472 1.528 1.28.584.8.848 1.8.272.992.272 2.04 0 .96-.256 1.944-.248.984-.824 1.816t-1.536 1.336-2.392.504zm1.704-1.6h1.12q.872 0 1.464-.352.6-.36.952-.944.352-.592.504-1.296.16-.704.16-1.408 0-.752-.168-1.464-.16-.712-.512-1.288-.344-.576-.896-.912-.552-.344-1.328-.344h-1.296z"
            fill={this.props.rightD ? rightDOnColor : rightDOffColor}
          />
          <path
            id="rightZ"
            d="M188.216 52.084v-1.28l5.656-9.008.376.696h-5.672v-1.608h7.088v1.28l-5.696 8.992-.352-.696h6.016v1.624z"
            fill={this.props.rightZ ? rightZOnColor : rightZOffColor}
          />
        </g>
      </svg>
    );
  }
}

export default LapwingStenoDiagram;

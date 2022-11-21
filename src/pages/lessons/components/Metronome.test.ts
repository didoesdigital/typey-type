import { bpmBracketsSprite, playId } from "./Metronome";

describe("playId", () => {
  it("for 0BPM should round up and return bpm10", () => {
    expect(playId(0)).toEqual("bpm10");
  });
});

describe("playId", () => {
  it("for 0.7BPM should not explode on floating point math", () => {
    expect(playId(0.7)).toEqual("bpm10");
  });
});

describe("playId", () => {
  it("for 9BPM should round up and return bpm10", () => {
    expect(playId(9)).toEqual("bpm10");
  });
});

describe("playId", () => {
  it("for 10BPM should return bpm10", () => {
    expect(playId(10)).toEqual("bpm10");
  });
});

describe("playId", () => {
  it("for 11BPM should round up and return bpm20", () => {
    expect(playId(11)).toEqual("bpm20");
  });
});

describe("playId", () => {
  it("for 360BPM should return bpm360", () => {
    expect(playId(360)).toEqual("bpm360");
  });
});

describe("playId", () => {
  it("over 360BPM should return bpm360", () => {
    expect(playId(760)).toEqual("bpm360");
  });
});

describe("playId", () => {
  it("of any nonsense BPM like -3.5BPM should return bpm10", () => {
    expect(playId(-3.5)).toEqual("bpm10");
  });
});

describe("bpm brackets", () => {
  it("should include a minimum bracket of 10BPM with 6000 milliseconds of audio", () => {
    expect(Object.entries(bpmBracketsSprite())[0]).toEqual([
      "bpm10",
      [0, 6000],
    ]);
  });
  it("should include 36 brackets", () => {
    expect(Object.entries(bpmBracketsSprite()).length).toEqual(36);
  });
  it("should match this object", () => {
    expect(bpmBracketsSprite()).toEqual({
      "bpm10": [0, 6000],
      "bpm20": [0, 3000],
      "bpm30": [0, 2000],
      "bpm40": [0, 1500],
      "bpm50": [0, 1200],
      "bpm60": [0, 1000],
      "bpm70": [0, 857.1428571428571],
      "bpm80": [0, 750],
      "bpm90": [0, 666.6666666666666],
      "bpm100": [0, 600],
      "bpm110": [0, 545.4545454545455],
      "bpm120": [0, 500],
      "bpm130": [0, 461.53846153846155],
      "bpm140": [0, 428.57142857142856],
      "bpm150": [0, 400],
      "bpm160": [0, 375],
      "bpm170": [0, 352.94117647058823],
      "bpm180": [0, 333.3333333333333],
      "bpm190": [0, 315.7894736842105],
      "bpm200": [0, 300],
      "bpm210": [0, 285.7142857142857],
      "bpm220": [0, 272.72727272727275],
      "bpm230": [0, 260.8695652173913],
      "bpm240": [0, 250],
      "bpm250": [0, 240],
      "bpm260": [0, 230.76923076923077],
      "bpm270": [0, 222.22222222222223],
      "bpm280": [0, 214.28571428571428],
      "bpm290": [0, 206.89655172413794],
      "bpm300": [0, 200],
      "bpm310": [0, 193.5483870967742],
      "bpm320": [0, 187.5],
      "bpm330": [0, 181.8181818181818],
      "bpm340": [0, 176.47058823529412],
      "bpm350": [0, 171.42857142857142],
      "bpm360": [0, 166.66666666666666],
    });
  });
});

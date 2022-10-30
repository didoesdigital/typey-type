let SHARED_INSTANCE = { suffixes: [], prefixes: [] };

export class AffixList {
  static getSharedInstance() {
    return SHARED_INSTANCE;
  }

  static setSharedInstance(inst) {
    SHARED_INSTANCE = inst;
  }

  constructor(dict) {
    let suffixes = [];
    let prefixes = [];
    const prefixRegex = /^\{([A-Za-z0-9=<>\\:'"#-])+\^\}$/;
    const suffixRegex = /^\{\^([A-Za-z0-9=<>\\:'"#-])+\}$/;
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(suffixRegex)) {
        suffixes.push([
          "/" + outlinesAndSourceDicts[0][0],
          phrase.replace("{^", "").replace("}", ""),
        ]);
      }

      if (phrase.match(prefixRegex)) {
        prefixes.push([
          outlinesAndSourceDicts[0][0] + "/",
          phrase.replace("{", "").replace("^}", ""),
        ]);
      }
    }
    this.suffixes = suffixes;
    this.prefixes = prefixes;
  }
}

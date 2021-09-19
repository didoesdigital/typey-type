let SHARED_INSTANCE = {suffixes: [], prefixes: []};

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
    const suffixRegex = /^\{([A-Za-z0-9=<>\\:'"#-])+\^\}$/;
    const prefixRegex = /^\{\^([A-Za-z0-9=<>\\:'"#-])+\}$/;
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(prefixRegex)) {
        suffixes.push(['/' + outlinesAndSourceDicts[0][0], phrase.replace('{^','').replace('}','')])
      }

      if (phrase.match(suffixRegex)) {
        prefixes.push([outlinesAndSourceDicts[0][0] + '/', phrase.replace('{','').replace('^}','')])
      }
    }
    this.suffixes = suffixes;
    this.prefixes = prefixes;
  }
}

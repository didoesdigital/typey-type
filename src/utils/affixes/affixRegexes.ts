const prefixRegex = /^\{([A-Za-z0-9.=<>\\:'"#-])+\^\}(\{-\|\})*$/;
const suffixRegex = /^\{\^([A-Za-z0-9.=<>\\:'"#-])+\}$/;

const affixRegexes = {
  prefixRegex,
  suffixRegex,
};

export default affixRegexes;

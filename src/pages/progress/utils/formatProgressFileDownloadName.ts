/** Example: "typey-type-reformatted-progress-" */
type ProgressFileNamePrefix = string;

const dashifiedDate = new Date()
  .toDateString()
  .replace(/ /g, "-")
  .toLowerCase();

const formatProgressFileDownloadName = (prefix: ProgressFileNamePrefix) =>
  `${prefix}${dashifiedDate}.json`;

export default formatProgressFileDownloadName;

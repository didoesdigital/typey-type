function durationFormatter (durationInMilliseconds) {
  // more than 10 hours, return early
  if (durationInMilliseconds >= 36000000) {
    return "10+ hours"
  }

  // less than 1 second, return early
  if (durationInMilliseconds < 1000) {
    return "00:00"
  }

  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  let hours = Math.floor(durationInSeconds / 3600);
  let minutes = Math.floor((durationInSeconds - (hours * 3600)) / 60);
  let seconds = durationInSeconds - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  if (durationInMilliseconds < 3600000) {
    return `${minutes}:${seconds}`;
  }
  else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

function humanDurationFormatter (durationInMilliseconds) {
  // more than 10 hours, return early
  if (durationInMilliseconds >= 36000000) {
    return "10+ hours"
  }

  // less than 1 second, return early
  if (durationInMilliseconds < 1000) {
    return "1 sec"
  }

  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  let hours = Math.floor(durationInSeconds / 3600);
  let minutes = Math.floor((durationInSeconds - (hours * 3600)) / 60);
  let seconds = durationInSeconds - (hours * 3600) - (minutes * 60);

  if (durationInMilliseconds < 3600000) {
    return `${minutes} min ${seconds} sec`;
  }
  else {
    return `${hours} hr ${minutes} min`;
  }
}

export {
  durationFormatter,
  humanDurationFormatter
};

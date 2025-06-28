// @ts-expect-error TS(7006) FIXME: Parameter 'durationInMilliseconds' implicitly has ... Remove this comment to see the full error message
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

  // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
  if (hours < 10) { hours = "0" + hours; }
  // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
  if (minutes < 10) { minutes = "0" + minutes; }
  // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
  if (seconds < 10) { seconds = "0" + seconds; }

  if (durationInMilliseconds < 3600000) {
    return `${minutes}:${seconds}`;
  }
  else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'durationInMinutes' implicitly has an 'a... Remove this comment to see the full error message
function humanDurationFormatter (durationInMinutes) {
  // more than 10 hours, return early
  if (durationInMinutes >= 600) {
    return "10+ hours"
  }

  // less than 1 min, return early
  if (durationInMinutes < 1) {
    return "<1 min"
  }

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.floor(durationInMinutes - (hours * 60));

  if (durationInMinutes < 60) {
    return `~${minutes} min`;
  }
  else {
    return `~${hours} hr ${minutes} min`;
  }
}

export {
  durationFormatter,
  humanDurationFormatter
};

const makeDownloadHref = (json: { [metWord: string]: number }) =>
  Blob !== undefined
    ? URL.createObjectURL(
        new Blob([JSON.stringify(json)], { type: "text/json" })
      )
    : "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json));

export default makeDownloadHref;

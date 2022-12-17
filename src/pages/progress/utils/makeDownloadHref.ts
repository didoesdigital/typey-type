const makeDownloadHref = (json: JSON) => {
  if (Blob !== undefined) {
    return URL.createObjectURL(
      new Blob([JSON.stringify(json)], { type: "text/json" })
    );
  } else {
    return (
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
    );
  }
};

export default makeDownloadHref;

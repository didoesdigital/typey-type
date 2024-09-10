const slugifyTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/[,']/g, "")
    .replace(/[ /']/g, "-")
    .replace(/:-/g, "-")
    .replace(/--/g, "-")
    .replace(/\*/g, "");

export default slugifyTitle;

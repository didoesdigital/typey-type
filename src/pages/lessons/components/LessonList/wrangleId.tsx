export const wrangleId = (id: string) => {
  return id.toLowerCase().replace(/[ ,’()]/g, "-");
};

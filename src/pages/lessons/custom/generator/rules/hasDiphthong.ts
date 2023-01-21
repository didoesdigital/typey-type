// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasDiphthong = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU](AU|OU|OEU)[^AOEU]/);

export default hasDiphthong;

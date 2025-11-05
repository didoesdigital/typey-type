function debounce<T extends (...args: any[]) => any>(cb: T, wait = 20) {
  let h = 0;
  let callable = (...args: Parameters<T>) => {
    clearTimeout(h);
    h = window.setTimeout(() => cb(...args), wait);
  };
  return callable;
}

export default debounce;

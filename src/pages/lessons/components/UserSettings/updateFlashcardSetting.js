export function changeFullscreen(event) {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  this.setState({ fullscreen: value });
  return value;
}

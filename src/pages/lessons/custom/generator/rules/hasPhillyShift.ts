const hasPhillyShift = (outline: string, _translation: string) =>
  !!outline.match(/(TDZ|TSD|TSZ|SDZ)/);
export default hasPhillyShift;

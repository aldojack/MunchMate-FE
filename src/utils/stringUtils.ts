// Make more robust to handle multiple words, handle white spaces
export const stringToTitleCase = (day: string) =>
  day[0].toUpperCase() + day.slice(1);

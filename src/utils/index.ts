export const toCapitalCase = (str: string) => {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
};

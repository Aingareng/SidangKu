export const formatString = (
  text: string,
  formatType: "uppercase" | "lowercase" | "capitalize"
): string => {
  if (!text) return "";

  switch (formatType) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
};

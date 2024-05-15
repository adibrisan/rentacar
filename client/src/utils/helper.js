export function getAuthCardTitle(string) {
  const processedTitle = string.charAt(0).toUpperCase() + string.slice(1);
  return processedTitle.replace("-", " ");
}

export const statusRenderer = (status) => {
  switch (status) {
    case "PENDING":
      return "yellow";
    case "CANCELLED":
      return "red";
    case "ACCEPTED":
      return "green";
    default:
      return "yellow";
  }
};

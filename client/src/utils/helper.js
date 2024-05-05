export function getAuthCardTitle(string) {
  const processedTitle = string.charAt(0).toUpperCase() + string.slice(1);
  return processedTitle.replace("-", " ");
}

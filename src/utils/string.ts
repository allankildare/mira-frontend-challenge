export function capitalizeFirstLetter(text: string) {
  const firstLetter = text.charAt(0).toUpperCase()
  return firstLetter + text.substring(1)
}

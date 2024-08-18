export const customRules = [
  // Example custom rule to handle double hyphens
  (text: string) => text.replace(/--+/g, '-'),
  // Example rule to trim dashes from the beginning or end of the slug
  (text: string) => text.replace(/(^-+)|(-+$)/g, '')
]

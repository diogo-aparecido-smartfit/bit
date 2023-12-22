export function calculateReadingTime(body: string) {
  const wordsPerMinute = 200;
  const wordCount = body.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readingTimeMinutes;
}

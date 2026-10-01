export function isPublished(publishDate: Date, now = new Date()) {
  return publishDate.valueOf() <= now.valueOf();
}
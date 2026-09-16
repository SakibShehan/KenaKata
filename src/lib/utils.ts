export function getSafeImageUrl(url: string | undefined): string {
  const FALLBACK = "https://placehold.co/600x400?text=No+Image";
  if (!url) return FALLBACK;
  const isValid = /^https?:\/\//i.test(url) || url.startsWith("/");
  return isValid ? url : FALLBACK;
}
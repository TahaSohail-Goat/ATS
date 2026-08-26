/**
 * Converts a Google Drive "share" link into its embeddable preview URL.
 * Returns null if the link isn't a recognizable Drive file URL.
 */
export function getDriveEmbedUrl(shareUrl: string): string | null {
  const match = shareUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (!match) return null;
  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

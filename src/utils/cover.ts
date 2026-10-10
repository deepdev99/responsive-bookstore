import type { Book } from '../types';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Splits a title into at most 3 lines of roughly `max` characters. */
function wrap(text: string, max = 14): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

/** Generates a local SVG book cover as a data URI (no network required). */
export function getCoverDataUri(book: Book): string {
  const titleLines = wrap(book.title)
    .map(
      (line, i) =>
        `<text x="100" y="${110 + i * 28}" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#ffffff">${escapeXml(line)}</text>`,
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">
<rect width="200" height="300" fill="${book.coverColor}"/>
<rect x="0" y="0" width="12" height="300" fill="#000000" opacity="0.18"/>
<rect x="24" y="40" width="152" height="2" fill="#ffffff" opacity="0.6"/>
${titleLines}
<rect x="24" y="230" width="152" height="2" fill="#ffffff" opacity="0.6"/>
<text x="100" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#ffffff" opacity="0.9">${escapeXml(book.author)}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

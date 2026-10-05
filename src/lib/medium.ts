// lib/medium.ts
import 'server-only';
import Parser from 'rss-parser';

type MediumItem = {
  title: string;
  link: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  ['content:encoded']?: string;
  categories?: string[];
  creator?: string;
};

export type MediumPost = {
  title: string;
  url: string;
  date: string;
  snippet: string;
  image?: string | null;
  tags: string[];
  author?: string;
};

const parser = new Parser<unknown, MediumItem>();

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isNaN(n) ? match : String.fromCodePoint(n);
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

function stripHtml(html = '') {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Figures carry image captions ("Photo by … on Unsplash") that shouldn't leak into snippets
function stripFigures(html = '') {
  return html.replace(/<figure[\s\S]*?<\/figure>/gi, ' ');
}

function extractImage(html = ''): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return m?.[1] ?? null;
}

export async function getMediumFeed(): Promise<MediumPost[]> {
  const url = "https://medium.com/feed/@rakarasell";
  if (!url) throw new Error('MEDIUM_FEED_URL belum diset di .env.local');

  // Medium kadang lemot, kasih timeout manual via AbortController
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12000);

  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).map((it) => {
      const html = it['content:encoded'] || it.content || '';
      const snippet =
        stripHtml(stripFigures(html)).slice(0, 220) || it.contentSnippet || '';
      const img = extractImage(html);

      return {
        title: it.title || 'Untitled',
        url: it.link || '#',
        date: it.pubDate ? new Date(it.pubDate).toISOString() : '',
        snippet,
        image: img,
        tags: it.categories || [],
        author: it.creator,
      };
    });
  } finally {
    clearTimeout(t);
  }
}

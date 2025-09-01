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

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
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
      const snippet = it.contentSnippet || stripHtml(html).slice(0, 220);
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

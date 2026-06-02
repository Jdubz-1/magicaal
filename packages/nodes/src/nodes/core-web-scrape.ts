import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import * as cheerio from 'cheerio';

interface WebScrapeConfig {
  urlKey: string;
  selector?: string;
  extractLinks?: boolean;
  outputKey: string;
  timeoutMs?: number;
}

export const coreWebScrape: NodeModule<WebScrapeConfig> = {
  type: 'core:web-scrape',
  meta: {
    name: 'Web Scrape',
    description:
      'Fetches a public URL and extracts text content using cheerio. Optionally scoped to a CSS selector. Writes {url, title, text, links?} to outputKey.',
    category: 'integration',
    icon: 'code',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['urlKey', 'outputKey'],
      properties: {
        urlKey: {
          type: 'string',
          description: 'Context key holding the URL to scrape',
        },
        selector: {
          type: 'string',
          description: 'Optional CSS selector to scope text extraction (e.g. "article", "main")',
        },
        extractLinks: {
          type: 'boolean',
          description: 'Include an array of {href, text} links found in the page (default: false)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {url, title, text, links?} to',
        },
        timeoutMs: {
          type: 'number',
          description: 'Fetch timeout in milliseconds (default: 15000)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _scrape_text_length: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: WebScrapeConfig) {
    const url = ctx.get<string>(config.urlKey);
    if (typeof url !== 'string' || !url.startsWith('http')) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SCRAPE_INVALID_URL',
          message: `Context key "${config.urlKey}" is not a valid URL`,
          retryable: false,
        },
      };
    }

    const timeoutMs = config.timeoutMs ?? 15_000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MagiCaal-Scraper/1.0 (+https://magicaal.dev)',
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'SCRAPE_FETCH_FAILED',
            message: `HTTP ${response.status} from ${url}`,
            retryable: response.status >= 500,
          },
        };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract page title
      const title = $('title').first().text().trim();

      // Remove script, style, nav, footer elements for cleaner text
      $('script, style, nav, footer, header, noscript').remove();

      // Extract text from selector or full body
      const scope = config.selector ? $(config.selector) : $('body');
      const text = scope
        .text()
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 50_000); // cap at 50k chars

      // Optionally extract links
      let links: { href: string; text: string }[] | undefined;
      if (config.extractLinks) {
        links = [];
        $('a[href]').each((_, el) => {
          const href = $(el).attr('href') ?? '';
          const linkText = $(el).text().trim();
          if (href && linkText) {
            links!.push({ href, text: linkText });
          }
        });
        links = links.slice(0, 200); // cap at 200 links
      }

      const result = {
        url,
        title,
        text,
        ...(links !== undefined && { links }),
      };

      ctx.set(config.outputKey, result);
      ctx.set('_scrape_text_length', text.length);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: result,
          _scrape_text_length: text.length,
        },
      };
    } catch (err) {
      clearTimeout(timer);

      if (err instanceof Error && err.name === 'AbortError') {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'SCRAPE_TIMEOUT',
            message: `Scrape timed out after ${timeoutMs}ms`,
            retryable: true,
          },
        };
      }

      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SCRAPE_FETCH_FAILED',
          message: err instanceof Error ? err.message : 'Scrape failed',
          retryable: true,
        },
      };
    }
  },
};

# `core:web-scrape` — Web Scrape

**Category:** integration · **Version:** 1.0.0

Fetches a public URL and extracts text content using `cheerio`, optionally scoped to a CSS selector. Writes `{url, title, text, links?}` to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `urlKey` | `string` | Yes | Context key holding the URL to scrape |
| `outputKey` | `string` | Yes | Context key to write `{url, title, text, links?}` to |
| `selector` | `string` | No | CSS selector to scope text extraction (e.g. `"article"`, `"main"`) |
| `extractLinks` | `boolean` | No | Include an array of `{href, text}` links found on the page (default: `false`) |
| `timeoutMs` | `number` | No | Default: 15000 |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `{ url: string; title: string; text: string; links?: {href,text}[] }` |
| `_scrape_text_length` | `number` |

## Behavior Notes

`script`/`style`/`nav`/`footer`/`header`/`noscript` elements are stripped before text extraction. Extracted text is capped at 50,000 characters; extracted links are capped at 200.

## Example

```typescript
this.node('scrape-article', 'core:web-scrape', { urlKey: 'articleUrl', selector: 'article', outputKey: 'page' });
```

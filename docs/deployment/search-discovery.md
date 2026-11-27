# Search discovery and recrawling

## Verified on 27 November 2026

Direct public HTTP requests returned 200 for `/products/mojym`, `/team/noor-fatima`, `/products`, `/sitemap.xml` and `/robots.txt`. Mojym and Noor's co-founder title were present in the served HTML with self-referencing www canonicals. No X-Robots-Tag exclusion was returned. Robots allows public pages and points to the sitemap. This does not establish Google's current index state.

The search-fetch tool could not retrieve the two detail pages and sitemap even though direct requests succeeded. Previous asset SSL failures also remain relevant: review Search Console's live tests and Crawl Stats rather than assuming every crawler receives healthy responses.

## After deploying this update

1. In the verified `hanovadevs.com` Search Console property, inspect `https://www.hanovadevs.com/products/mojym` and run **Test live URL**.
2. Confirm HTTP success, crawl allowed, indexing allowed, canonical and rendered text. Repeat for `/team/noor-fatima`, `/products`, `/about` and `/products/mojym/how-to-use`.
3. Request indexing for the updated URLs after their live tests pass.
4. Submit `https://www.hanovadevs.com/sitemap.xml` under Sitemaps. If already submitted, inspect its latest fetch and processing result; do not repeatedly resubmit an unchanged file.
5. Record Google's last crawl, selected canonical and any exclusion or host availability errors. Diagnose those exact messages if indexing does not progress.

Search Console access is required for these actions; they were not performed by the code changes. Sitemap inclusion, valid structured data and indexing requests do not guarantee indexing or changes to AI Overviews. Do not use Google's restricted Indexing API for ordinary product/profile pages, obsolete sitemap ping endpoints, fabricated ratings or keyword stuffing.

References: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl and https://developers.google.com/search/docs/appearance/ai-features

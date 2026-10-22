# knz.

Portfolio of Kenaz Nepomuceno, a web designer and developer based in the Philippines. Building websites since 2011.

Live at https://knznepo.github.io

## Updating projects

Projects live in two JSON files:

- `js/works-featured.json`: the homepage showcase slider
- `js/works.json`: the "More Works" list

After editing either file, run:

```sh
node tools/build.mjs
```

This renders the projects into `index.html` and `index.html.md`, between the `<!-- build:... -->` markers. Don't edit the content between those markers by hand; it gets overwritten.

Also update by hand when things change:

- `llms.txt`: summary of the site for LLMs
- `sitemap.xml`: `lastmod` date of the homepage

## Structure

- `index.html`: the site (static HTML, no build framework)
- `index.html.md`: Markdown version of the homepage, for LLMs
- `2017-2018/`, `2019-2025/`: archived versions of the portfolio, kept as-is
- `.nojekyll`: tells GitHub Pages to serve files as-is instead of running Jekyll

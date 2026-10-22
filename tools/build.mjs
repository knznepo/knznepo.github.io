// Renders the project lists from js/*.json into index.html and index.html.md,
// so the content is in the static HTML (crawlers, LLMs, no-JS visitors).
//
// Usage: node tools/build.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8');
const readJson = (file) => JSON.parse(read(file));

const featured = readJson('js/works-featured.json');
const works = readJson('js/works.json');

// Icons that aren't in Font Awesome; defined as .icon-* in css/styles.css
const CUSTOM_ICONS = ['photoshop', 'nextjs', 'codeigniter'];

// Thumbnail size, used for width/height to avoid layout shift
const THUMB_WIDTH = 1778;
const THUMB_HEIGHT = 957;

// Smaller copy for phones: images/<name>-800.webp
// Create with: cwebp -q 78 -resize 800 0 <source> -o images/<name>-800.webp
const THUMB_SMALL_WIDTH = 800;
const smallThumb = (file) => file.replace(/\.webp$/, `-${THUMB_SMALL_WIDTH}.webp`);

// Matches .work-thumbnail widths in css/styles.css
const THUMB_SIZES = '(min-width: 1024px) 982px, (min-width: 768px) 69vw, calc(100vw - 40px)';

const escape = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Display names for tech/type keys; anything missing falls back to capitalized
const NAMES = {
    wordpress: 'WordPress',
    vuejs: 'Vue.js',
    nextjs: 'Next.js',
    react: 'React',
    codeigniter: 'CodeIgniter',
    figma: 'Figma',
    behance: 'Behance',
    python: 'Python',
};

const capitalize = (str) => NAMES[str] || str.charAt(0).toUpperCase() + str.slice(1);

const linkLabel = (url) => {
    if (url.includes('figma.com')) return 'Figma prototype';
    if (url.includes('behance.net')) return 'Behance';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

const stripTags = (html) => html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const icon = (name, color, labelled) => {
    const a11y = labelled
        ? `role="img" aria-label="${escape(capitalize(name))}"`
        : 'aria-hidden="true"';

    if (CUSTOM_ICONS.includes(name)) {
        return `<i class="icon-custom icon-${name}" title="${escape(capitalize(name))}" style="background-color: ${color}" ${a11y}></i>`;
    }

    return `<i class="fab fa-${name} fa-lg" title="${escape(capitalize(name))}" ${a11y}></i>`;
};

const techItem = (tech, color) => {
    if (Array.isArray(tech)) {
        const [name, link] = tech;
        return `<li><a href="${escape(link)}" target="_blank" rel="noopener" aria-label="${escape(capitalize(name))} (opens in a new tab)" style="color: ${color}">${icon(name, color, false)}</a></li>`;
    }

    return `<li style="color: ${color}">${icon(tech, color, true)}</li>`;
};

const featuredSlide = (item) => `
                        <div class="swiper-slide">
                            <article class="works">
                                <div class="work-item" style="background-color: ${item.theme.bg}; color: ${item.theme.text};">
                                    <div class="wrapper flex">
                                        <div class="work-details">
                                            <p class="work-tags">${escape(item.title_tag)}</p>
                                            <h3 class="work-title">${escape(item.title)}</h3>

                                            <div class="work-description">${item.description}</div>

                                            <footer class="work-details-footer flex justify-between">
                                                <ul class="work-tech-used" aria-label="Tools used">
                                                    ${item.tech.map((tech) => techItem(tech, item.theme.text)).join('\n                                                    ')}
                                                </ul>

                                                <a href="${escape(item.link)}" target="_blank" rel="noopener" class="visit-link" style="color: ${item.theme.text}"><span>Visit<span class="visually-hidden"> ${escape(item.title)} (opens in a new tab)</span></span> <i class="fa-solid fa-arrow-right-long fa-lg visit-link-icon" aria-hidden="true"></i></a>
                                            </footer>
                                        </div>

                                        <a href="${escape(item.link)}" target="_blank" rel="noopener" class="work-thumbnail" tabindex="-1" aria-hidden="true" style="box-shadow: 0px 5px 20px 0px ${item.theme.shadow}">
                                            <img src="images/${escape(item.thumbnail)}" srcset="images/${escape(smallThumb(item.thumbnail))} ${THUMB_SMALL_WIDTH}w, images/${escape(item.thumbnail)} ${THUMB_WIDTH}w" sizes="${THUMB_SIZES}" alt="${escape(item.title)} website preview" width="${THUMB_WIDTH}" height="${THUMB_HEIGHT}" loading="lazy" decoding="async">
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>`;

const moreWorksItem = (work) => {
    const typeIcon = CUSTOM_ICONS.includes(work.type)
        ? `<i class="icon-custom icon-${work.type}"></i>`
        : `<i class="fab fa-${work.type} fa-2xl"></i>`;

    const status = work.status
        ? `\n                                    <li><b>Status:</b> ${escape(work.status)}</li>`
        : '';

    return `
                        <article class="flex align-center justify-between more-works-item">
                            <div class="more-works-details">
                                <h4>${escape(work.title)}</h4>
                                <div>${work.desc}</div>

                                <ul class="more-works-meta flex gap-xl">
                                    <li><b>Year:</b> ${escape(work.year)}</li>${status}
                                    <li>
                                        <a href="${escape(work.link)}" target="_blank" rel="noopener" class="visit-link align-center"><b>Visit<span class="visually-hidden"> ${escape(work.title)} (opens in a new tab)</span></b> <i class="fa-solid fa-arrow-right-long fa-lg visit-link-icon" aria-hidden="true"></i></a>
                                    </li>
                                </ul>
                            </div>

                            <div class="more-works-icon flex justify-center" aria-hidden="true">
                                ${typeIcon}
                            </div>
                        </article>`;
};

const featuredMarkdown = (item) => {
    const tools = item.tech.map((tech) => capitalize(Array.isArray(tech) ? tech[0] : tech)).join(', ');

    return `### ${item.title}
*${item.title_tag} · ${item.year}${item.status === 'wip' ? ' (in progress)' : ''}* — [${linkLabel(item.link)}](${item.link})

${stripTags(item.description)}

Built with: ${tools}`;
};

const moreWorksMarkdown = () => {
    const rows = works.map((work) => {
        const hasLink = work.link && work.link !== '#' && !['down', 'private'].includes(work.status);
        const title = hasLink ? `[${work.title}](${work.link})` : work.title;
        return `| ${work.year} | ${title} | ${capitalize(work.type)} | ${stripTags(work.desc).replace(/\|/g, '/')} |`;
    });

    return ['| Year | Project | Platform | Description |', '|------|---------|----------|-------------|', ...rows].join('\n');
};

// Replaces everything between <!-- build:name --> and <!-- /build:name -->
const inject = (content, name, generated) => {
    const pattern = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(\\n[ \\t]*<!-- /build:${name} -->)`);

    if (!pattern.test(content)) {
        throw new Error(`Missing <!-- build:${name} --> markers`);
    }

    return content.replace(pattern, (_, start, end) => `${start}${generated}\n${end}`);
};

let html = read('index.html');
html = inject(html, 'featured', featured.map(featuredSlide).join('\n'));
html = inject(html, 'more-works', works.map(moreWorksItem).join('\n'));
writeFileSync(join(root, 'index.html'), html);

let md = read('index.html.md');
md = inject(md, 'featured', '\n' + featured.map(featuredMarkdown).join('\n\n'));
md = inject(md, 'more-works', '\n' + moreWorksMarkdown());
writeFileSync(join(root, 'index.html.md'), md);

console.log(`Built ${featured.length} featured and ${works.length} other works.`);

const {DateTime} = require("luxon");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const {EleventyEdgePlugin} = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootNote = require("markdown-it-footnote");
const markdownItTableOfContents = require("markdown-it-table-of-contents");
const markdownItContainer = require("markdown-it-container");
const packageVersion = require("./package.json").version;
const codeClipboard = require("eleventy-plugin-code-clipboard");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const {getPosts} = require("./11ty/utils.cjs");
const markdownItKatex = require("@traptitech/markdown-it-katex");

const icons = {
  info: '<!-- <%= octicon "info" %> --><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"></path></svg>',
  alert: '<!-- <%= octicon "alert" %> --><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>',
  stop: '<!-- <%= octicon "stop" %> --><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"></path></svg>',
  check: '<!-- <%= octicon "check" %> --><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>',
};

const containerOptions = {
  validate: (params) => (/^(info|alert|stop|check|column)[\s:]*.*$/.test(params.trim())),
  render: (tokens, idx) => {
    const [type, title] = tokens[idx].info.trim().split(":");
    if (tokens[idx].nesting === 1) {
      switch (type) {
        case "info":
          return `<div class="flash"><span class="flash-title">${icons.info} ${title || "Information"}</span>`;
        case "alert":
          return `<div class="flash flash-warn"><span class="flash-title">${icons.alert} ${title || "Caution"}</span>`;
        case "stop":
          return `<div class="flash flash-error"><span class="flash-title">${icons.stop} ${title || "Warning"}</span>`;
        case "check":
          return `<div class="flash flash-success"><span class="flash-title">${icons.check} ${title || "Information"}</span>`;
        case "column":
          return `<div class="flash flash-column"><span class="flash-title">${icons.info} ${title || "Column"}</span>`;
        default:
          return '<div class="flash">'
      }
    } else {
      return '</div>\n';
    }
  }
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin);
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(codeClipboard, {
    buttonClass: "tdbc-copy-button"
  });
  eleventyConfig.addPlugin(pluginMermaid);

  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addWatchTarget("./11ty/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/previews");
  eleventyConfig.addPassthroughCopy({"./node_modules/photoswipe/dist": "photoswipe"});
  eleventyConfig.addPassthroughCopy("./src/admin/config.yml");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);
  eleventyConfig.addShortcode('shortDesc', require("./11ty/short-desc.cjs"));

  eleventyConfig.addFilter("slug", require("./11ty/slug.cjs"));
  eleventyConfig.addFilter('head', require("./11ty/head.cjs"));
  eleventyConfig.addFilter('htmlDateString',
    (dateObj) => dateObj ? DateTime.fromJSDate(dateObj, {zone: 'Asia/Tokyo'}).toFormat('yyyy-LL-dd') : "");

  eleventyConfig.addFilter('readingTime', require("./11ty/reading-time.cjs"));
  eleventyConfig.addFilter('readableDate', (dateObj) =>
    DateTime.fromJSDate(dateObj, {zone: 'Asia/Tokyo'}).toFormat('yyyy-LL-dd'));
  eleventyConfig.addFilter('excerpt', require("./11ty/excerpt.cjs"));
  eleventyConfig.addFilter('pageTags', require("./11ty/page-tags.cjs"));
  eleventyConfig.addFilter('blogPage', require("./11ty/blog-page.cjs"));
  eleventyConfig.addFilter('inputPath', (pages, path) => pages.find((page) => page.inputPath === path));
  eleventyConfig.addFilter('byTag',
    (tagArticles, tag) => tagArticles.filter(tagArticle => tagArticle.tag === tag));
  eleventyConfig.addFilter('tagUrl', (hrefs, tag) => hrefs.filter(href => href.includes(`tags/${tag}`)));
  eleventyConfig.addFilter('limit', (array, limit) => array.slice(0, limit));
  eleventyConfig.addFilter('byAuthor',
    (contributorArticles, author) => contributorArticles.filter(contributor => contributor.name === author));
  eleventyConfig.addFilter('selectAuthor', (hrefs, author) => hrefs.filter(href => href.includes(author)));
  eleventyConfig.addFilter('getDate', require("./11ty/get-date.cjs"));
  eleventyConfig.addCollection('currentMonthPosts', (collection) => getPosts(collection).filter(post => post.date.getMonth() === new Date().getMonth()));
  eleventyConfig.addCollection('articles', getPosts);
  eleventyConfig.addCollection('tagList', require("./11ty/tag-list.cjs"));
  eleventyConfig.addCollection('contributorArticles', require("./11ty/contributor-articles.cjs"));
  eleventyConfig.addCollection('tagArticles', require("./11ty/tag-articles.cjs"));

  // for IsLand Architecture for preact
  eleventyConfig.addWatchTarget('./components/preact');
  eleventyConfig.addPassthroughCopy({
    'node_modules/@11ty/is-land/is-land.js': "vendor/is-land.js",
    'node_modules/preact/dist/preact.mjs': "vendor/preact.mjs",
  });
  eleventyConfig.addFilter('preact', async (filename, args) => {
    try {
      const {toHtml} = await import(filename);
      if (typeof toHtml === "function") {
        return toHtml(args); // server rendered html
      }
      console.log(`[Warning] toHtml function not found. Is this a Illegal Component? ${filename}`)
      return "";
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "tdbc-anchor",
    permalinkSymbol: "#",
    permalinkSpace: false,
    level: [1, 2, 3],
    slugify: (s) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[\s+~\/]/g, "-")
        .replace(/[().`,%·'"!?¿:@*]/g, ""),
  }).use(markdownItFootNote)
    .use(markdownItTableOfContents, {
      containerClass: "post__toc",
      containerHeaderHtml: '<div class="toc-container-header"><p>Contents</p></div>'
    })
    .use(codeClipboard.markdownItCopyButton, {
      buttonClass: "tdbc-copy-button"
    })
    .use(markdownItContainer, "flash", containerOptions)
    .use(markdownItKatex, {"throwOnError": false, "errorColor": " #cc0000"})
    .use((md) => {
      const originalRule = md.renderer.rules.image;
      md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const imageTag = originalRule(tokens, idx, options, env, self);
        const token = tokens[idx];
        return `<a id="image-swipe-${idx}" class="image-swipe" href="${token.attrs[token.attrIndex("src")][1]}" target="_blank" rel="noopener noreferrer">${imageTag}</a>`;
      };
    }).use((md) => {
      function isInternalLink(token) {
        return token.attrIndex("href") === -1 ||
          token.attrGet("href").match(/^([#\/].*$|https:\/\/developer\.mamezou-tech\.com.*$)/);
      }

      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        if (isInternalLink(tokens[idx])) {
          // skip internal link
          return self.renderToken(tokens, idx, options, env, self);
        }
        tokens[idx].attrPush(["target", "_blank"], ["rel", "noopener noreferrer"]);
        tokens[idx].attrJoin("class", "new-tab-link");
        return self.renderToken(tokens, idx, options, env, self);
      };
    });

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};